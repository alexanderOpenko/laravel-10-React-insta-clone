<?php

namespace App\Repositories;

use App\Events\MessageReaded;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatRepository
{
    public function getUserMessages(int $senderId, int $receiverId)
    {
        $this->updateChatMessegesStatus($senderId, $receiverId);

        return Message::whereIn('sender_id', [$senderId, $receiverId])
            ->whereIn('receiver_id', [$senderId, $receiverId])
            ->orderBy('id', 'desc')
            ->paginate(35);
    }

    public function updateChatMessegesStatus($senderId, $receiverId)
    {
        MessageReaded::dispatch($receiverId);

        Message::where('sender_id', $receiverId)
            ->where('receiver_id', $senderId)
            ->update(['status' => 1]);
    }

    public function getRecentUsersWithMessage(int $senderId, int $limit = 0)
    {
        $subquery = Message::select([DB::raw('MAX(id) as max_message_id, 
                                    LEAST(sender_id, receiver_id) as min_id, 
                                    GREATEST(sender_id, receiver_id) as max_id')])
            ->where(function ($query) use ($senderId) {
                $query->where('sender_id', $senderId)
                    ->orWhere('receiver_id', $senderId);
            })
            ->groupBy(DB::raw('LEAST(sender_id, receiver_id)'), DB::raw('GREATEST(sender_id, receiver_id)'));

        $query = Message::select('max_message_id', 'min_id as sender_id', 'max_id as receiver_id')
            ->from(DB::raw("({$subquery->toSql()}) as subquery"))
            ->mergeBindings($subquery->getQuery())
            ->orderBy('max_message_id', 'desc');

        if ($limit === 0) {
            $paginateMessages = $query->paginate(11);
            $paginateCollection = $paginateMessages->getCollection();

            $paginateMessages = $paginateMessages->toArray();
            $paginateMessages['data'] = $this->getFilterRecentMessages($paginateCollection, $senderId);
            return $paginateMessages;
        } else {
            $query = $query->limit($limit)->get();
        }

        return $this->getFilterRecentMessages($query, $senderId);
    }

    public function sendMessage(array $data): Message
    {
        return Message::create($data);
    }

    public static function checkForUnreadedMessages()
    {
        return Message::where('receiver_id', Auth::id())->where('status', '0')->exists();
    }

    public function getUser($id)
    {
        $user = User::where('id', $id)->first()->load('avatar');
        $user['online'] = $user->isOnline();
        return $user;
    }

    public function getFilterRecentMessages(Collection $recentMessages, int $senderId): array
    {
        $recentUsersWithMessage = [];
        foreach ($recentMessages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            $latestMessage = Message::find($message->max_message_id); // Получение самого последнего сообщения из каждой пары
            $recentUsersWithMessage[] = [
                'user' => $this->getUser($userId),
                'message' => $latestMessage,
            ];
        }

        return $recentUsersWithMessage;
    }
}

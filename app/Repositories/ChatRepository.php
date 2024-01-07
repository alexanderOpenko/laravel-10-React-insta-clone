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
            ->get();
    }

    public function updateChatMessegesStatus($senderId, $receiverId) { 
        MessageReaded::dispatch($receiverId);
       
        Message::where('sender_id', $receiverId)
            ->where('receiver_id', $senderId)
            ->update(['status' => 1]);
    }

    public function getRecentUsersWithMessage(int $senderId): array
    {
        DB::statement("SET SESSION sql_mode=''");

        $recentMessages = Message::where(function ($query) use ($senderId) {
            $query->where('sender_id', $senderId)
                ->orWhere('receiver_id', $senderId);
        })
        ->orderBy('id', 'desc')
            ->get();

        return $this->getFilterRecentMessages($recentMessages, $senderId);
    }


    public function sendMessage(array $data): Message
    {
        return Message::create($data);
    }

    public static function checkForUnreadedMessages()
    {
        return Message::where('receiver_id', Auth::id())->where('status', '0')->exists();
    }

    public function getUser($id) {
       $user = User::where('id', $id)->first()->load('avatar');
       $user['online'] = $user->isOnline();
       return $user;
    }

    public function getFilterRecentMessages(Collection $recentMessages, int $senderId): array
    {
        $recentUsersWithMessage = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if (!in_array($userId, $usedUserIds)) {
                $recentUsersWithMessage[] = [
                    'user' => $this->getUser($userId),
                    'message' => $message,
                ];
                $usedUserIds[] = $userId;
            }
        }
        return $recentUsersWithMessage;
    }
}

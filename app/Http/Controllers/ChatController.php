<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageSent;
use App\Events\MessageReaded;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }

    /**
     * Chat view.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request, ?string $receiverId = null)
    {
        $receiver = $receiverId ? User::find($receiverId)->load('avatar') : null;
        
        return Inertia::render('Chat/Chat', [
            'receiver' => $receiver,
        ]);
    }

    public function getChatMessages(Request $request, string $receiverId)
    {
        $messages = $this->chat->getUserMessages((int) $request->user()->id, (int) $receiverId);

        return $messages;
    }

    public function dispatchReadedMessagesOnReceiverChange (int $sender_id) {
        $this->chat->updateChatMessegesStatus(Auth::id(), $sender_id);
    }

    public function getChatList(Request $request) 
    {
        return $this->chat->getRecentUsersWithMessage((int) $request->user()->id, (int) $request->query('limit'));
    }

    public function lastMessage(string $receiver_id) 
    {
        $sender_id = Auth::id();
        $lastMessage = Message::whereIn('sender_id', [$sender_id, $receiver_id])
        ->whereIn('receiver_id', [$sender_id, $receiver_id])
        ->orderBy('created_at', 'desc')
        ->first();

        if ($lastMessage['sender_id'] != $sender_id) {
            $lastMessage->update(['status' => 1]);

            MessageReaded::dispatch($lastMessage['sender_id']);
        }
        
        return $lastMessage;
    }

    public function getLastChat( string $sender_id ) 
    {
        DB::statement("SET SESSION sql_mode=''");

        $recentMessage = Message::where('receiver_id', $sender_id)
            ->orderBy('created_at', 'desc')
            ->limit(1)
            ->get();

        $userId = $recentMessage[0]['sender_id'] == Auth::id() ? $recentMessage[0]['receiver_id'] : $recentMessage[0]['sender_id'];

        return [
            'user' => $this->chat->getUser($userId),
            'message' => $recentMessage[0]
        ];
    }

    /**
     * Chat store
     *
     * @return \Inertia\Response
     */
    public function store(Request $request, ?int $receiverId = null)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        if (empty($receiverId)) {
            return;
        }

        try {
            $this->chat->sendMessage([
                'sender_id' => (int) $request->user()->id,
                'receiver_id' => $receiverId,
                'message' => $request->message,
            ]);

            $sortedUserIds = [$request->user()->id, $receiverId];
            sort($sortedUserIds);
            $roomId = implode('', $sortedUserIds);

            MessageSent::dispatch($roomId);

            ChatMessageSent::dispatch($receiverId);

            return Redirect::route('chat.index', $receiverId);
        } catch (\Throwable $th) {
            return Redirect::route('chat.index', $receiverId);
        }
    }
}
<?php

namespace App\Events;

use App\Http\Traits\LoadNotificationRelations;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels, LoadNotificationRelations;

    public $user_id, $data;
    /**
     * Create a new event instance.
     */
    public function __construct(
        $user_id,
        $data
    ) {
        $this->user_id = $user_id;
        $collection = new \Illuminate\Database\Eloquent\Collection;
        $collection->add($data);
        $this->data = $this->loadNotificationRelations($collection);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notification.' . $this->user_id),
        ];
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Follower;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Console\Command;
use App\Events\NotificationSent as EventsNotificationSent;
class birthdayReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:birthday-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $usersBirthdays = User::whereBetween("birthday", [now(), now()->addDay()])
        ->orWhere(function($query) {
            $query->whereDate("birthday", now());
        })
        ->get();

        $usersBirthdays->each(function($userBirthday) {
            $users = Follower::where('follower_id', $userBirthday['id'])->get();

            $users->each(function(Follower $follower) use($userBirthday) {
                $user = $follower->user()->first();
                $notification = new Notification();
                $notification->user_id = $user['id'];
                $notification->notifiable()->associate($userBirthday);
                $notification->save();

                EventsNotificationSent::dispatch($user['id'], $notification);
            });
        });

        return;
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Traits\LoadNotificationRelations;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    use LoadNotificationRelations;

    public function index() 
    {
        $user = User::find(Auth::id());
        Notification::where('user_id', Auth::id())->update(['readed' => 1]);
        $notifications = $user->notifications()->orderByDesc('id')->paginate(9);
        $notificationsCollection = $notifications->getCollection();
        $notifications = $notifications->toArray();

        $notifications['data'] = $this->loadNotificationRelations($notificationsCollection);
        return $notifications;
    }

    public static function checkForUnreadedNotifications() {
        return Notification::where('user_id', Auth::id())->where('readed', '0')->exists();
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Traits\LoadFollowRelations;
use App\Models\Follower;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\NotificationSent as EventsNotificationSent;

class FollowerController extends Controller
{
    use LoadFollowRelations;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $this->authorize('apply', $user);

        $following_id = $request->query('following_id');
        $follow = $user->following()->create(['follower_id' => $following_id]);

        $notification = new Notification();
        $notification->user_id = $following_id;
        $notification->notifier_id = $user->id;
        $notification->notifiable()->associate($follow);
        $notification->save();

        EventsNotificationSent::dispatch($following_id, $notification);
    }

    /**
     * Display the specified resource.
     */
    public function show(Follower $followers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follower $followers)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follower $followers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, $follower)
    {
        $this->authorize('apply', $user);
        $follow = $user->following()->where('follower_id', $follower)->first();

        $user->following()->where('follower_id', $follower)->delete();

        Notification::where('notifiable_id', $follow->id)->delete();
    }

    public function followers(User $user)
    {
        $followers = $user->followers()->paginate(5);
        $followersCollection = $followers->getCollection();
        $followers = $followers->toArray();
        
        $followers['data'] = $this->loadFollowRelations($followersCollection, 'user_id');
        return $followers;
    }

    public function following(User $user)
    {
        $following = $user->following()->paginate(5);
        $followersCollection = $following->getCollection();
        $following = $following->toArray();

        $following['data'] = $this->loadFollowRelations($followersCollection, 'follower_id');
        return $following;
    }
}

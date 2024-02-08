<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\NotificationSent as EventsNotificationSent;

class PostCommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
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
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'comment' => 'required|string|min:3',
        ]);
    
        $user = User::find($request->user()->id);
    
        $comment = $post->postComments()->create([
            'comment' => $validated['comment'],
        ]);

        $user->postComments()->save($comment);   

        $notification = new Notification();
        $notification->user_id = $post['user_id'];

        $notification->notifiable()->associate($comment);
        $notification->save();

        EventsNotificationSent::dispatch($post['user_id'], $notification);

        return $comment;
    }

    /**
     * Display the specified resource.
     */
    public function show(PostComment $postComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostComment $postComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostComment $postComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostComment $comment)
    {   
        $this->authorize('delete', $comment);

        $comment->delete();
    }
}

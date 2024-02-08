<?php

namespace App\Http\Controllers;

use App\Events\NotificationSent as EventsNotificationSent;
use App\Http\Traits\LoadFollowRelations;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    use LoadFollowRelations;

    public function store(Request $request, string $post)
    {
        $like = Like::where('post_id', $post)->where('liker_id', $request->user()->id)->get();

        if (count($like)) {
            Like::where('post_id', $post)->where('liker_id', $request->user()->id)->delete();
            Notification::where('notifiable_id', $like[0]['id'])->delete();
        } else {
            $p = Post::find($post);
            $like = $p->likes()->create(['liker_id' => $request->user()->id]);

            $notification = new Notification();
            $notification->user_id = $p['user_id'];
            $notification->notifiable()->associate($like);
            $notification->save();

            EventsNotificationSent::dispatch($p['user_id'], $notification);
        }
    }

    public function list(Post $post) {
        $likes = $post->likes()->paginate(5);
// return $likes;
        $likesCollection = $likes->getCollection();
        $likes = $likes->toArray();

        $likes['data'] = $this->loadFollowRelations($likesCollection, 'liker_id');
        return $likes;
    }
}

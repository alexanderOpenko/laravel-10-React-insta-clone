<?php

namespace App\Http\Controllers;

use App\Http\Traits\LoadFollowRelations;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    use LoadFollowRelations;

    public function store(Request $request, string $post)
    {
        $like = Like::where('post_id', $post)->where('liker_id', $request->user()->id)->exists();

        if ($like) {
            Like::where('post_id', $post)->where('liker_id', $request->user()->id)->delete();
        } else {
            $p = Post::find($post);
            $p->likes()->create(['liker_id' => $request->user()->id]);
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

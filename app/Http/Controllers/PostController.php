<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostImage;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only('store');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        $posts = $user->posts()
            ->orderByDesc('id')
            ->with('images', 'user.avatar')
            ->addSelect(['liked' => function ($query) {
                $query->selectRaw('COUNT(*)')
                    ->from('likes')
                    ->whereColumn('post_id', 'posts.id')
                    ->where('liker_id', Auth::id());
            }])
            ->withCount('likes')
            ->withCount('postComments')
            ->paginate(9);

        return $posts;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $this->authorize('apply', $user);

        $validated = $request->validate([
            'message' => 'string|required|min:3',
            'images' => 'required'
        ]);

        $image_path = $request->file('images')->store('image/' . $request->user()->id, 'public');

        $post = $user->posts()->create($validated);

        $post->images()->create(['image_path' => $image_path]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Post $post)
    {
        function deleteInNotifications (Collection $collection): void
        {
            foreach($collection as $comment) {
                Notification::where('notifiable_id', $comment->id)->delete();
            }
        }

        $comments = PostComment::where('post_id', $post->id)->get();
        if ($comments->isNotEmpty()) {
            deleteInNotifications($comments);
        }

        $likes = Like::where('post_id', $post->id)->get();
        if ($likes->isNotEmpty()) {
            deleteInNotifications($likes);
        }

        $image = PostImage::where('post_id', $post->id)->get();
        Storage::disk('public')->delete($image->first()->image_path);

        $post->delete();
    }
}

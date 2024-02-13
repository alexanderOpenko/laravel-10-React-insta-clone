<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
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

    public function deleteAvatar(User $user) {
        $isAvatarExists = count($user->avatar()->get());

        if ($isAvatarExists) { 
            Storage::disk('public')->delete($user->avatar()->first()["avatar"]);
            $user->avatar()->delete();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $this->authorize('apply', $user);

        $this->deleteAvatar($user);
        
        $request->validate([
            'avatar' => 'required|mimes:jpg,bmp,png'
        ]);

        $image_path = $request->file('avatar')->store('avatars/' . $request->user()->id, 'public');

        $user->avatar()->create(['avatar' => $image_path]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Avatar $avatar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avatar $avatar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avatar $avatar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Avatar $avatar)
    {
        $this->deleteAvatar($user);
    }
}

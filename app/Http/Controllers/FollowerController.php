<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $following_id = $request->query('following_id');
        $user->following()->create(['follower_id' => $following_id]);
        return redirect()->back();
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
        $user->following()->where('follower_id', $follower)->delete();

        return redirect()->back();
    }
}

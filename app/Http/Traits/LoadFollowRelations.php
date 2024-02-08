<?php
namespace App\Http\Traits;

use App\Models\Follower;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

trait LoadFollowRelations 
{
    public function loadFollowRelations (Collection $collection, string $followerOrFollowing) 
    {
        foreach ($collection as $follower) 
        {
            $follower['user'] = User::findOrFail($follower[$followerOrFollowing])->load('avatar');
            $follower['authUserFollowed'] = false;

            if (Follower::where('user_id', Auth::id())
                ->where('follower_id', $follower[$followerOrFollowing])->exists()
            ) {
                $follower['authUserFollowed'] = true;
            }
        }

        return $collection;
    }
}

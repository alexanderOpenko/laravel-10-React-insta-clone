<?php

namespace App\Http\Traits;

use App\Models\Follower;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

trait LoadFollowRelations
{
    public function checkIfFollowed($follower, $userIdRowName)
    {
        $follower['authUserFollowed'] = false;

        if (
            Follower::where('user_id', Auth::id())->where('follower_id', $follower[$userIdRowName])->exists()
        ) {
            $follower['authUserFollowed'] = true;
        }

        return $follower;
    }
    public function loadFollowRelations(Collection $collection, string $userIdRowName)
    {
        foreach ($collection as $follower) {
            $follower['user'] = User::findOrFail($follower[$userIdRowName])->load('avatar');
            $this->checkIfFollowed($follower, $userIdRowName);
        }

        return $collection;
    }
}

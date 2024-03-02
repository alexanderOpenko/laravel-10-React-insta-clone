<?php

namespace App\Http\Controllers;

use App\Http\Traits\LoadFollowRelations;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    use LoadFollowRelations;
    public function index()
    {
        return Inertia::render('Users');
    }

    public function list(?string $name = null)
    {
        $users = $name ? User::where('name', 'like', '%' . $name . '%')->with('avatar')->paginate(10) : User::with('avatar')->paginate(10);
        
        $usersCollection = $users->getCollection();
        $users = $users->toArray();

        foreach ($usersCollection as $key => $user) {
            $users['data'][$key] = $this->checkIfFollowed($user, 'id');
        }
        return $users;
    }
}

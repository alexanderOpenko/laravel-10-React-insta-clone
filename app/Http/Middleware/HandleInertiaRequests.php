<?php

namespace App\Http\Middleware;

use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function checkForFollowing($user_id, $following_id) {
        return DB::table('followers')->where('user_id', $user_id)->where('follower_id', $following_id)->exists();
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->load('avatar'),
                'guest' => fn() => Auth::id() != $request->route('id'),
                'following' => fn() => $this->checkForFollowing(Auth::id(), $request->route('id'))
            ],
 
            'isChat' => $request->routeIs('chat.*'),

            'new_messeges' => ChatRepository::checkForUnreadedMessages(),

            'public_url' => asset('storage'),

            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}

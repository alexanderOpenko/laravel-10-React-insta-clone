<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    return redirect()->route('profile.show', ['id' => 1]);
})->name('mainUser');

Route::get('/home-posts', function () {
    DB::statement("SET SESSION sql_mode=''");

    $user = User::find(Auth::id());
    $posts = $user->following()
        ->join('posts', 'posts.user_id', '=', 'followers.follower_id')
        ->orderBy('posts.id', 'desc')
        ->paginate(3);
    $postCollection = $posts->getCollection();

    foreach ($postCollection as $key => $post) {
        $postCollection[$key] = Post::find($post['id'])
            ->load(['images', 'user.avatar', 'likes' => fn ($q) => $q->where('liker_id', Auth::id())])
            ->loadCount('likes')
            ->loadCount('postComments');

        $postCollection[$key]['liked'] = count($postCollection[$key]['likes']) > 0;
    }

    $posts = $posts->toArray();
    $posts['data'] = $postCollection;

    return $posts;
});

Route::get('/post-comments/{id}', function (string $id) {
    $comments = PostComment::where('post_id', $id)
        ->with('user.avatar')
        ->paginate(9);

    return $comments;
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile-info/{user}', [ProfileController::class, 'profileInfoUpdate'])->name('profile-info.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('users.posts', PostController::class);

Route::resource('posts.comments', PostCommentController::class)->only(['store']);

Route::resource('comments', PostCommentController::class)->only(['destroy', 'update']);

Route::resource('users.avatar', AvatarController::class)->only(['store', 'destroy']);

Route::resource('users.followers', FollowerController::class)->only(['store', 'destroy']);;

Route::get('followers/{user}', [FollowerController::class, 'followers']);

Route::get('following/{user}', [FollowerController::class, 'following']);

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'chat', 'as' => 'chat.'], function () {
        Route::get('/{receiverId?}', [ChatController::class, 'index'])->name('index');
        Route::get('/lastMessage/{receiverId}', [ChatController::class, 'lastMessage'])->name('lastMessage');
        Route::get('/lastChat/{receiverId}', [ChatController::class, 'getLastChat'])->name('getLastChat');
        Route::post('/{receiverId?}', [ChatController::class, 'store'])->name('store');
        Route::get('/messages/{receiverId}', [ChatController::class, 'getChatMessages'])->name('messages');
        Route::get('/setReaded/{senderId}', [ChatController::class, 'dispatchReadedMessagesOnReceiverChange'])->name('read');
    });

    Route::get('/chatList', [ChatController::class, 'getChatList'])->name('getChatList');

    Route::group(['prefix' => 'like', 'as' => 'like.'], function () {
        Route::post('/{post}', [LikeController::class, 'store'])->name('index');
        Route::get('/likers/{post}', [LikeController::class, 'list'])->name('list');
    });

    Route::group(['prefix' => 'notifications', 'as' => 'notifications.'], function () {
        Route::get('/', function () {
            return Inertia::render('Notifications/Notifications');
        })->name('index');
        Route::get('/list', [NotificationController::class, 'index'])->name('list');
    });

    Route::group(['prefix' => 'users', 'as' => 'users.'], function() {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::get('/list/{name?}', [UsersController::class, 'list'])->name('list');
    });
});

require __DIR__ . '/auth.php';

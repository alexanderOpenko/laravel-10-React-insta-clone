<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Follower;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified']);

Route::get('/home', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('users.posts', PostController::class);

Route::resource('posts.comments', PostCommentController::class)->only(['store']);

Route::resource('comments', PostCommentController::class)->only(['destroy', 'update']);

Route::resource('users.avatar', AvatarController::class)->only(['store', 'update']);

Route::resource('users.followers', FollowerController::class)->only(['store', 'destroy']);;

Route::get('followers/{user}', [FollowerController::class, 'followers']);

Route::get('following/{user}', [FollowerController::class, 'following']);

Route::middleware('auth')->group(function () {
Route::group(['prefix' => 'chat', 'as' => 'chat.'], function() {
    Route::get('/{receiverId?}', [ChatController::class, 'index'])->name('index');
    Route::get('/lastMessage/{receiverId}', [ChatController::class, 'lastMessage'])->name('lastMessage');
    Route::get('/lastChat/{receiverId}', [ChatController::class, 'getLastChat'])->name('getLastChat');
    Route::post('/{receiverId?}', [ChatController::class, 'store'])->name('store');
});
Route::get('/chatList', [ChatController::class, 'getChatList'])->name('getChatList');
});
 
require __DIR__.'/auth.php';

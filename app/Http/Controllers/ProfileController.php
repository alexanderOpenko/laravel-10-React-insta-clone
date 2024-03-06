<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(Request $request, string $id) {
        $user = User::findOrFail($id)
        ->load('avatar')
          ->loadCount('followers')
          ->loadCount('following');
    
        return Inertia::render('Profile/Profile', [
            'user' => $user,
        ]);
    }
    
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function profileInfoUpdate(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'birthday' => 'nullable|date',
            'biography' => 'nullable|string|max:500',
        ]);

        $user->update($validated);

        return redirect(route('profile.edit'));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();

        Storage::disk('public')->deleteDirectory('image/' . $user->id);
        Storage::disk('public')->deleteDirectory('avatars/' . $user->id);

        return Redirect::to('/');
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $usersToFollow = $users->random(rand(1, 5));

            foreach ($usersToFollow as $toFollow) {
                if ($toFollow->id !== $user->id) {
                    \App\Models\Follower::create([
                        'user_id' => $user->id,
                        'follower_id' => $toFollow->id
                    ]);
                }
            }
        }
    }
}

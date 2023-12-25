<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(1000)->create();

        $this->call(FollowSeeder::class);
        // \App\Models\User::factory(10)->create()->each(function ($user) {

        //     \App\Models\Post::factory()->count(9)
        //         ->for($user)
        //         ->create();
        // });
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User1',
        //     'email' => 'test@example1.com',
        // ]);

        // for($i = 0; $i < 100; $i++) {
        //     \App\Models\PostImage::create([

        //     ])
        // }

        // $user = User::find(5);

        // Post::factory(100)->for($user)->create()->each(function($post) {
        //     \App\Models\PostImage::factory()->for($post)->create();
        // });
    }
}

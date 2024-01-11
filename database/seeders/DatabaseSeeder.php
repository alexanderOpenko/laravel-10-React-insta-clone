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
        User::factory(100)->create();

        $this->call(FollowSeeder::class);

        User::all()->each(function ($user) {
            Post::factory(100)->for($user)->create()->each(function($post) {
                \App\Models\PostImage::factory()->for($post)->create();
            });
        });
    }   
}

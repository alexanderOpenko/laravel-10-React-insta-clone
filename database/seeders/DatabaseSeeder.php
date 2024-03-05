<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Message;
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
        User::factory(2)->create();

        // $this->call(FollowSeeder::class);

        // User::all()->each(function ($user) {
        //     Post::factory(100)->for($user)->create()->each(function($post) {
        //         \App\Models\PostImage::factory()->for($post)->create();
        //     });
        // });

        // for ($i = 0; $i <= 100; $i++)
        // {
        //     $messages = new Message;

        //     $messages->message = $i;
        //     $messages->sender_id = 1;
        //     $messages->receiver_id = 2;

        //     $messages->save();

        //     $messages = new Message;

        //     $messages->message = $i + 1;
        //     $messages->sender_id = 2;
        //     $messages->receiver_id = 1;

        //     $messages->save();

        //     $i++;
        // }    
    }   
}

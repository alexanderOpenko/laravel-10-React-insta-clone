<?php

namespace App\Http\Traits;

use App\Models\Like;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

trait LoadNotificationRelations
{
    public function loadNotificationRelations(Collection $collection) 
    {
       foreach($collection as $notification) 
       {
        // $model = '';
            if (strpos($notification['notifiable_type'], 'Like')) {
               $model = Like::class;
            } else if (strpos($notification['notifiable_type'], 'Comment')) {
               $model = PostComment::class;
            }

            $notification['user'] = User::findOrFail($notification['user_id']);
            
            if($model::find($notification['notifiable_id'])) {
               $notification['data'] = $model::find($notification['notifiable_id'])->load('post.images');
            }
       }

       return $collection;
    }
}
<?php

namespace App\Http\Traits;

use App\Models\Like;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

trait LoadNotificationRelations
{
   public function loadNotificationRelations(Collection $collection)
   {
      foreach ($collection as $notification) {
         if (strpos($notification['notifiable_type'], 'Like')) {
            $model = Like::class;
         } else if (strpos($notification['notifiable_type'], 'Comment')) {
            $model = PostComment::class;
         } else {
            $notification['data'] = [];
            $notification['data'] = array_merge(
               $notification['data'], 
               ['user' => User::find($notification['notifiable_id'])->load('avatar')]
            ); 

            continue;
         }

         if ($model::find($notification['notifiable_id'])) {
            $notification['data'] = $model::find($notification['notifiable_id'])->load(['post.images', 'user']);
         }
      }

      return $collection;
   }
}

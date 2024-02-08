<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Like extends Model
{
    use HasFactory;
    protected $fillable = ['liker_id'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "liker_id");
    }

    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, "notifiable");
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    use HasFactory;

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }
}

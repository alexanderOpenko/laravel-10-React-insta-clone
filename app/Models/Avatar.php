<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Avatar extends Model
{
    use HasFactory;

    protected $fillable = ['avatar'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

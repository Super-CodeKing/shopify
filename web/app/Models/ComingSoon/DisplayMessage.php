<?php

namespace App\Models\ComingSoon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisplayMessage extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'message', 'position', 'alignment'];
    protected $table = 'coming_soon_display_messages';
}

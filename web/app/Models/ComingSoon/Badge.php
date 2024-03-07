<?php

namespace App\Models\ComingSoon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'text', 'position', 'bg_color', 'text_color', 'font_size'];
    protected $table = 'coming_soon_badge_designs';
}

<?php

namespace App\Models\ComingSoon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorsNText extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'settings'];
    protected $table = 'coming_soon_colors_n_texts';
}

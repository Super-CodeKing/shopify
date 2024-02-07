<?php

namespace App\Models\PreOrder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BadgeDesign extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'text', 'position', 'bg_color', 'text_color', 'font_size'];
    protected $table = 'pre_order_badge_designs';
}

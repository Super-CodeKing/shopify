<?php

namespace App\Models\ComingSoon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'start_date', 'end_date', 'estimated_restock_date'];
    protected $table = 'coming_soon_schedules';
}

<?php

namespace App\Models\ComingSoon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setup extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'coming_soon_setups';
}

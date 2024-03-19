<?php

namespace App\Models\RequestStock;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'request_stock_settings';
}

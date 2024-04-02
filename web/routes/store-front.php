<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/store-front/')->group(function(){
    Route::post('quick-start', [DashboardController::class, 'getQuickStart']);
});
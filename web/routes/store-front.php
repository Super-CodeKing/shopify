<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StoreFrontController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/store-front/')->group(function(){
    Route::post('quick-start', [StoreFrontController::class, 'getQuickStart']);
    Route::post('product', [StoreFrontController::class, 'getProductAvailability']);
});
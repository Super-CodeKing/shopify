<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Dashboard Routes
Route::middleware('shopify.auth')->prefix('api/')->group(function(){
    Route::get('all', [DashboardController::class, 'all']);
    Route::get('summary', [DashboardController::class, 'getSummary']);
    Route::post('quick-start', [DashboardController::class, 'storeQuickStart']);
    Route::get('quick-start', [DashboardController::class, 'getQuickStart']);
});
<?php

use App\Http\Controllers\ComingSoonController;
use App\Http\Controllers\ComingSoonProductsController;
use Illuminate\Support\Facades\Route;

/**
 * Coming Soon API Routes
 * 1. Activation
 * 2. Product List
 * 3. Colors and Text
 * 4. Set Coming Soon Schedule
 * 5. Set Display Message on Coming Soon Product page
 * 6. Coming Soon badge Design
 * 7. Custom CSS and Js
 */

 Route::group([
    'prefix' => 'api/coming-soon/',
    'middleware' => 'shopify.auth',
], function () {
    Route::get('init', [ComingSoonController::class, 'init']);
    Route::post('save', [ComingSoonController::class, 'save']);

    Route::get('products', [ComingSoonProductsController::class, 'index']);
    Route::post('products/store', [ComingSoonProductsController::class, 'store']);
    Route::post('products/update', [ComingSoonProductsController::class, 'update']);
    Route::post('products/destroy', [ComingSoonProductsController::class, 'destroy']);
});
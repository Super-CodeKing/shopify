<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreOrderOrdersController;
use App\Http\Controllers\PreOrderProductsController;
use App\Http\Controllers\PreOrderSettingsController;
use App\Http\Controllers\PreOrderSetupController;

/**
 * Pre Order API Routes
 * 1. Activation
 * 2. Product List
 * 3. Pre Orders
 * 4. Colors and Text
 * 5. Set Order Limit
 * 6. Set Pre Order Schedule
 * 7. Set Display Message on Pre Order Product page
 * 8. Pre Order badge Design
 * 9. Custom CSS and Js
 */

Route::middleware('shopify.auth')->prefix('api/')->group(function () {
    // 1. Activation
    Route::get('preorder/settings', [PreOrderSettingsController::class, 'index']);

    Route::get('preorder/init', [PreOrderSetupController::class, 'init']);
    Route::post('preorder/save', [PreOrderSetupController::class, 'save']);

    // Product List
    Route::get('preorder/products', [PreOrderProductsController::class, 'index']);
    Route::post('preorder/products/store', [PreOrderProductsController::class, 'store']);
    Route::post('preorder/products/update', [PreOrderProductsController::class, 'update']);
    Route::post('preorder/products/destroy', [PreOrderProductsController::class, 'destroy']);

    // Pre Orders
    Route::get('preorder/orders', [PreOrderOrdersController::class, 'index']);

    // Colors and Text Settings
    Route::get('preorder/colorntext', [PreOrderSetupController::class, 'getColorNTextSettings']);
    Route::post('preorder/colorntext', [PreOrderSetupController::class, 'colorNText']);

    // Limit Settings
    Route::get('preorder/limit', [PreOrderSetupController::class, 'getOrderLimit']);
    Route::post('preorder/limit', [PreOrderSetupController::class, 'storeOrderLimit']);

    // Schedule
    Route::get('preorder/schedule', [PreOrderSetupController::class, 'getPreOrderSchedule']);
    Route::post('preorder/schedule', [PreOrderSetupController::class, 'storePreOrderSchedule']);

    // Display Message
    Route::get('preorder/display-message', [PreOrderSetupController::class, 'getDisplayMessage']);
    Route::post('preorder/display-message', [PreOrderSetupController::class, 'storeDisplayMessage']);

    Route::get('preorder/badge-design', [PreOrderSetupController::class, 'getBadgeDesign']);
    Route::post('preorder/badge-design', [PreOrderSetupController::class, 'storeBadgeDesign']);
});

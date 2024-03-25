<?php

use App\Http\Controllers\RequestStock\{ActivationController,
    DisplayMessageController,
    ProductsController, 
    RequestedProductsController, 
    SettingsController,
    ScheduleController
};
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'api/request-stock/','middleware' => 'shopify.auth'], function () {
    
    Route::get('activate', [ActivationController::class, 'index']);
    Route::post('activate', [ActivationController::class, 'store']);

    Route::get('products', [ProductsController::class, 'index']);
    Route::post('products/store', [ProductsController::class, 'store']);
    Route::post('products/update', [ProductsController::class, 'update']);
    Route::post('products/destroy', [ProductsController::class, 'destroy']);

    Route::get('requested-products', [RequestedProductsController::class, 'index']);
    Route::get('requested-products/count', [RequestedProductsController::class, 'product_count']);
    Route::post('requested-products/destroy', [RequestedProductsController::class, 'destroy']);
    Route::get('requested-products/export', [RequestedProductsController::class, 'export']);

    Route::get('settings', [SettingsController::class, 'index']);
    Route::post('button-settings', [SettingsController::class, 'storeButtonSettings']);
    Route::post('form-settings', [SettingsController::class, 'storeFormSettings']);

    Route::get('schedule', [ScheduleController::class, 'getRequestStockSchedule']);
    Route::post('schedule', [ScheduleController::class, 'storeRequestStockSchedule']);

    Route::get('display-message', [DisplayMessageController::class, 'getDisplayMessage']);
    Route::post('display-message', [DisplayMessageController::class, 'storeDisplayMessage']);
});
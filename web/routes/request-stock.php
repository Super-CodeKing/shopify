<?php

use App\Http\Controllers\RequestStock\ActivationController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'api/request-stock/',
    'middleware' => 'shopify.auth',
], function () {
    Route::get('activate', [ActivationController::class, 'index']);
    Route::post('activate', [ActivationController::class, 'store']);
});
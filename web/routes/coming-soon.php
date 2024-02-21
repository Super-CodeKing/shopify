<?php

use App\Http\Controllers\ComingSoonController;
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

 Route::get('/api/coming-soon/init', [ComingSoonController::class, 'init'])->middleware('shopify.auth');
 Route::post('/api/coming-soon/save', [ComingSoonController::class, 'save'])->middleware('shopify.auth');
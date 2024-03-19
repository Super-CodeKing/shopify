<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockSettings = Settings::where(['shop' => $shop])->first();

        if (!$requestStockSettings) {
            return response()->json(config('requeststock')['settings']);
        }

        $requestStockSettings = json_decode($requestStockSettings->settings, true);
        return response()->json($requestStockSettings);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\PreOrder\Settings;
use Illuminate\Http\Request;

class PreOrderSettingsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderInitSettings = Settings::where(['shop' => $shop])->first([
            'activation',
            'badge_design',
            'colors',
            'display_message',
            'order_limit',
            'schedule'
        ]);

        if (!$preOrderInitSettings) {
            return response()->json(config('preorder'));
        }

        return response()->json($preOrderInitSettings);
    }
}

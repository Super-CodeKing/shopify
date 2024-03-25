<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\DisplayMessage;
use Illuminate\Http\Request;

class DisplayMessageController extends Controller
{
    public function storeDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $displayMessage = DisplayMessage::where('shop', $shop)->first();

        if ($displayMessage) {
            $requestStockMessage = DisplayMessage::where('shop', $shop)->update([
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
            ]);
        } else {
            $requestStockMessage = DisplayMessage::create([
                'shop' => $shop,
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
            ]);
        }

        return response()->json([
            'message' => 'Display Message Saved Successfully.',
            'data' => $requestStockMessage
        ], 200);
    }

    public function getDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockDisplayMessage = DisplayMessage::where('shop', $shop)->first();
        if (!$requestStockDisplayMessage) {
            return response()->json(config('requeststock')['display_message']);
        }
        $requestStockDisplayMessage = json_decode($requestStockDisplayMessage, true);
        
        return response()->json($requestStockDisplayMessage);
    }
}

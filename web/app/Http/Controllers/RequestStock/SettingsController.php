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

        $requestStockSettings = Settings::where('shop', $shop)->first();

        if (!$requestStockSettings) {
            return response()->json(config('requeststock')['settings']);
        }

        $data['button'] = json_decode($requestStockSettings->button, true);
        $data['button_inherit_from_theme'] = $requestStockSettings->button_inherit_from_theme;
        return response()->json($data);
    }

    public function storeButtonSettings(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockButtonSettings = Settings::where('shop', $shop)->first();

        if (!$requestStockButtonSettings) 
        {
            $data = $this->buttonSettingsCreateData($request, $shop);
            $createdButtonSettings = Settings::create($data);
            return $this->getResponse($createdButtonSettings, 201);
        } 
        else 
        {
            $data = $this->buttonSettingsUpdateData($request);
            $updatedButtonSettings = Settings::where('shop', $shop)->update($data);
            return $this->getResponse($updatedButtonSettings, 200);
        }
    }

    private function buttonSettingsCreateData($data, $shop)
    {
        $inheritTheme = 1;
        
        if($data->button_inherit_from_theme == false || $data->button_inherit_from_theme == 'false')
        $inheritTheme = 0;
        
        return [
            'shop' => $shop,
            'button_inherit_from_theme' => $inheritTheme,
            'button' => json_encode($data->button)
        ];
    }

    private function buttonSettingsUpdateData($data)
    {
        $inheritTheme = 1;
        
        if($data->button_inherit_from_theme == false || $data->button_inherit_from_theme == 'false')
        $inheritTheme = 0;
        
        return [
            'button_inherit_from_theme' => $inheritTheme,
            'button' => json_encode($data->button)
        ];
    }

    private function getResponse($data, $code)
    {
        return response()->json([
            'message' => 'Settings Saved Successfully.',
            'data' => $data
        ], $code);
    }
}

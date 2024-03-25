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
        $data['form'] = json_decode($requestStockSettings->form, true);
        $data['form_inherit_from_theme'] = $requestStockSettings->form_inherit_from_theme;

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

    public function storeFormSettings(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockFormSettings = Settings::where('shop', $shop)->first();

        if (!$requestStockFormSettings) 
        {
            $data = $this->formSettingsCreateData($request, $shop);
            $createdFromSettings = Settings::create($data);
            return $this->getResponse($createdFromSettings, 201);
        } 
        else 
        {
            $data = $this->formSettingsUpdateData($request);
            $updatedFormSettings = Settings::where('shop', $shop)->update($data);
            return $this->getResponse($updatedFormSettings, 200);
        }
    }

    private function formSettingsCreateData($data, $shop)
    {
        $inheritTheme = 1;
        
        if($data->form_inherit_from_theme == false || $data->form_inherit_from_theme == 'false')
        $inheritTheme = 0;
        
        return [
            'shop' => $shop,
            'form_inherit_from_theme' => $inheritTheme,
            'form' => json_encode($data->form)
        ];
    }

    private function buttonSettingsCreateData($data, $shop)
    {
        $inheritTheme = 1;
        
        if($data->button_inherit_from_theme == false || $data->button_inherit_from_theme == 'false' || $data->button_inherit_from_theme == 0)
        $inheritTheme = 0;
        
        return [
            'shop' => $shop,
            'button_inherit_from_theme' => $inheritTheme,
            'button' => json_encode($data->button)
        ];
    }

    private function formSettingsUpdateData($data)
    {
        $inheritTheme = 1;
        
        if($data->form_inherit_from_theme == false || $data->form_inherit_from_theme == 'false' || $data->form_inherit_from_theme == 0)
        $inheritTheme = 0;
        
        return [
            'form_inherit_from_theme' => $inheritTheme,
            'form' => json_encode($data->form_settings)
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

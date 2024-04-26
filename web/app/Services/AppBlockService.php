<?php

namespace App\Services;

use Shopify\Rest\Admin2024_04\Theme;
use Illuminate\Support\Facades\Config;
use Shopify\Rest\Admin2024_04\Asset;

class AppBlockService
{
    private $session;

    public function setSession($session)
    {
        $this->session = $session;
        return $this;
    }

    public function getAppStatusOnActiveTheme()
    {
        $themeId = $this->getCurrentThemeId($this->session);
        $shop = $this->session->getShop();
        try {
            $appId = Config::get('shopify.app_id');
            $asset = Asset::all($this->session, ["theme_id" => $themeId], ["asset" => ["key" => "config/settings_data.json"]]);
        
            if (empty($asset) || empty($asset[0])) {
                throw new \Exception('Failed to retrieve asset data.');
            }
        
            $decodedData = json_decode($asset[0]->value, true);
        
            if (!$decodedData || !array_key_exists('current', $decodedData) || !array_key_exists('blocks', $decodedData['current'])) {
                throw new \Exception('Invalid asset data format.');
            }
        
            $disabledStatus = false;

            if(isset($decodedData['current']['blocks'][$appId]['disabled'])) 
            $disabledStatus = $decodedData['current']['blocks'][$appId]['disabled'];

            $response = [];
        
            if($disabledStatus == false)
            {
                $response = [
                    "shop"      => $shop,
                    "status"    => $disabledStatus,
                    "message"   => 'App Enabled',
                    "theme_id"  => $themeId,
                ];
            }
            else
            {
                $response = [
                    "shop"      => $shop,
                    "status"    => $disabledStatus,
                    "message"   => 'App Disabled',
                    "theme_id"  => $themeId,
                ];
            }
        
            return response()->json($response);
        
        } catch (\Throwable $th) {
            $errorMessage = 'App status unavailable: ' . $th->getMessage();
            $response = [
                "shop"      => $shop,
                "status"    => false,
                "message"   => $errorMessage,
                "theme_id"  => $themeId,
            ];
        
            return response()->json($response);
        }
    }

    private function getCurrentThemeId($session)
    {
        $theme = Theme::all($session, [], ['role' => 'main']);
        $theme_id = $theme[0]->id;
        return $theme_id;
    }
}

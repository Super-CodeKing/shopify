<?php

namespace App\Http\Controllers;

use App\Models\PreOrderSetup;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class PreOrderSetupController extends Controller
{
    public function get(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        $preOrderInitSettings = PreOrderSetup::where(['shop' => $shop])->first();

        if(!$preOrderInitSettings){
            return new JsonResponse(['PreOrderInitSetup' => config('app.preorder')]);
        }
        
        return new JsonResponse(['PreOrderInitSetup' => $preOrderInitSettings]);
    }
}

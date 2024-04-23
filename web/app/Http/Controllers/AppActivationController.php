<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Services\AppBlockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use stdClass;
use Shopify\Clients\Rest;

class AppActivationController extends Controller
{
    public function __construct(private AppBlockService $appBlockService){}

    public function getCurrentThemeAppBlockStatus(Request $request) {
        $session = $request->get('shopifySession');
        return $this->appBlockService->setSession($session)->getAppStatusOnActiveTheme();
    }
}

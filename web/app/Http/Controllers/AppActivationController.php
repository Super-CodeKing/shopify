<?php

namespace App\Http\Controllers;

use App\Services\AppBlockService;
use Illuminate\Http\Request;

class AppActivationController extends Controller
{
    public function __construct(private AppBlockService $appBlockService){}

    public function getCurrentThemeAppBlockStatus(Request $request) {
        $session = $request->get('shopifySession');
        return $this->appBlockService->setSession($session)->getAppStatusOnActiveTheme();
    }
}

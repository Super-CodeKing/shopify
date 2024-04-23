<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Shopify\Clients\Rest;

class PreOrderOrdersController extends Controller
{
    public function index(Request $request) {
        /** @var AuthSession */
        $session = $request->get('shopifySession');

        $client = new Rest($session->getShop(), $session->getAccessToken());
        $result = $client->get('orders', [], [
            'tag' => 'PRE_ORDER',
            'status' => 'any'
        ]);

        return response($result->getDecodedBody());
    }
}

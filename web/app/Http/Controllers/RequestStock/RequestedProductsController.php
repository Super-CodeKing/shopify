<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\RequestedProducts;
use App\Repositories\RequestedProductsRepository;
use App\Services\RequestedProductsService;
use Illuminate\Http\Request;

class RequestedProductsController extends Controller
{

    public function __construct(private RequestedProductsService $requestedProductsService,
    private RequestedProductsRepository $rpRepo){}

    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        return $this->requestedProductsService->setShop($shop)->get($request->all());
    }

    public function product_count(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        return response()->json($this->rpRepo->getCount($shop));
    }
}

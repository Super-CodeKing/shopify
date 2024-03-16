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

    public function destroy(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestedProduct = $this->rpRepo->getFirstByIdNShop($shop, $request->id);
        $requestedProduct->delete();

        return response()->json([
            'message' => 'Product Removed Successfully'
        ], 200);
    }

    public function export(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $data = RequestedProducts::where('shop', $shop)->get(['product_id', 'product_title', 'product_quantity', 'customer_name', 'customer_email', 'customer_phone', 'country', 'message']);
        $csvHeader = ['Product Id', 'Product Title', 'Product Quantity', 'Customer Name', 'Customer Email', 'Customer Phone', 'Country', 'Message'];
        $csvContent = implode(',', $csvHeader) . "\n";
        foreach ($data as $row) {
            $csvContent .= implode(',', $row->toArray()) . "\n";
        }

        return response($csvContent)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="requested_products.csv"');
    }
}

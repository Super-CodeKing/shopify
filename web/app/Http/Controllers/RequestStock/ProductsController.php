<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockProducts = Products::where('shop', $shop)->get();
        return response()->json([
            'data' => $requestStockProducts
        ], 200);
    }

    public function store(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockProductArray = json_decode($request->getContent(), true);
        $makeData = [];

        for($i = 0; $i < count($requestStockProductArray); $i++) {
            $singleProductData = $requestStockProductArray[$i];

            $singleProductData['shop']              = $shop;
            $singleProductData['title']             = $singleProductData['title'];
            $singleProductData['start_date']        = formatDate($singleProductData['start_date']);
            $singleProductData['end_date']          = formatDate($singleProductData['end_date']);
            $singleProductData['no_end_date']       = $singleProductData['no_end_date'] == 1 ? 1: 0;
            $singleProductData['restock_date']      = formatDate($singleProductData['restock_date']);
            $singleProductData['no_restock_date']   = $singleProductData['no_restock_date'] == 1 ? 1: 0;
            $singleProductData['display_message']   = $singleProductData['display_message'] == 1 ? 1 : 0;
            $singleProductData['display_badge']     = $singleProductData['display_badge'] == 1 ? 1 : 0;

            array_push($makeData, $singleProductData);
        }

        $result = [];
        foreach ($makeData as $data) {
            $r = Products::create($data);
            array_push($result, $r);
        }

        return response()->json([
            'message' => 'Product Saved Successfully',
            'data' => $result
        ], 201);
    }

    public function update(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $start_date = $request->start_date != "null" ? date('Y-m-d H:i:s', strtotime($request->start_date)) : null;
        $end_date = $request->end_date != "null" ? date('Y-m-d H:i:s', strtotime($request->end_date)) : null;
        $restock_date = $request->restock_date != "null" ? date('Y-m-d H:i:s', strtotime($request->restock_date)) : null;

        $hasEndDate = formatFalsyValue($request->no_end_date);
        $hasRestockDate = formatFalsyValue($request->no_restock_date);

        $displayMessage = formatFalsyValue($request->display_message);
        $displayBadge = formatFalsyValue($request->display_badge); 

        $preOrderProduct = Products::where('shop', $shop)
            ->where('id', $request->id)
            ->where('product_id', $request->product_id)
            ->update([
                'start_date'        => $start_date,
                'end_date'          => $end_date,
                'no_end_date'       => $hasEndDate,
                'restock_date'      => $restock_date,
                'no_restock_date'   => $hasRestockDate,
                'display_message'   => $displayMessage,
                'display_badge'     => $displayBadge,
            ]);

        return response()->json([
            'message' => 'Product Updated Successfully',
            'data' => $preOrderProduct
        ], 200);
    }

    public function destroy(Request $request)
    {
        $product = Products::find($request->id);
        $product->delete();

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ], 200);
    }
}

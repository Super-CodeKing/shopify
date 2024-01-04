<?php

namespace App\Http\Controllers;

use App\Models\PreOrderProducts;
use Illuminate\Http\Request;

class PreOrderProductsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProducts = PreOrderProducts::where('shop', $shop)->get();
        return response()->json([
            'message' => 'Product Saved Successfully',
            'data' => $preOrderProducts
        ], 200);
    }

    public function store(Request $request)
    {

        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProducts = PreOrderProducts::create([
            'shop'              => $shop,
            'product_id'        => $request->product_id,
            'variant_id'        => $request->variant_id,
            'title'             => $request->title,
            'start_date'        => $request->start_date,
            'end_date'          => $request->end_date,
            'order_limit'       => $request->order_limit,
            'display_message'   => $request->display_message,
            'display_badge'     => $request->display_badge
        ]);

        return response()->json([
            'message' => 'Product Saved Successfully',
            'data' => $preOrderProducts
        ], 201);
    }

    public function update(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProduct = PreOrderProducts::where('shop', $shop)
            ->where('id', $request->id)
            ->where('product_id', $request->product_id)
            ->update([
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'order_limit' => $request->order_limit,
                'display_message' => $request->display_message,
                'display_badge' => $request->display_badge,
            ]);

        return response()->json([
            'message' => 'Product Updated Successfully',
            'data' => $preOrderProduct
        ], 200);
    }


    public function destory(Request $request)
    {
        $flight = PreOrderProducts::find($request->id);
        $flight->delete();

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ], 200);
    }
}

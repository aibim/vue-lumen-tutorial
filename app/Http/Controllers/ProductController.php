<?php

namespace App\Http\Controllers;

use App\Product;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{

    /**
     * Show all products
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json(Product::all());
    }

    /**
     * Show specific product
     * @param $id ID of the product
     * @return \Illuminate\Http\JsonResponse
     */
    public function showOne($id)
    {
        return response()->json(new ProductResource(Product::find($id)));
    }
}
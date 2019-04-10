<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Resources\Company as CompanyResource;

class CompanyController extends Controller
{

    /**
     * Show all companies
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json(Company::all());
    }

    /**
     * Show specific company
     * @param $id ID of the company
     * @return \Illuminate\Http\JsonResponse
     */
    public function showOne($id)
    {
        return response()->json(new CompanyResource(Company::find($id)));
    }
}
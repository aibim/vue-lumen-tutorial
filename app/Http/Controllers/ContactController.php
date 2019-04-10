<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    /**
     * Show all Contact Form entries
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json(Contact::all());
    }

    /**
     * Create new contact form request entry in datanbase and send mail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|max:255',
            'message' => 'required',
        ]);
        $contact = Contact::create($request->all());

        return response()->json($request, 201);
    }
}
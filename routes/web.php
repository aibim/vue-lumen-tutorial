<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    //Products
    $router->get('products', ['uses' => 'ProductController@showAll']);
    $router->get('products/{id}', ['uses' => 'ProductController@showOne']);

    // Companies
    $router->get('companies', ['uses' => 'CompanyController@showAll']);
    $router->get('companies/{id}', ['uses' => 'CompanyController@showOne']);

    //Contact Form
    $router->post('contact', ['uses' => 'ContactController@create']);

    //Login
    $router->post('/login', 'LoginController@login');
    $router->post('/login/refresh', 'LoginController@refresh');
});


$router->group(['prefix' => 'api/private', 'middleware' => 'client'], function () use ($router) {
    //Contact Form
    $router->post('contacts', ['uses' => 'ContactController@showAll']);
});
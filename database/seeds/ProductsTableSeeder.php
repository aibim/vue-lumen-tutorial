<?php

use Illuminate\Database\Seeder;
use App\Product as Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = factory(Product::class, 20)->create();
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Company as Company;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companies = factory(Company::class, 10)->create();
    }
}

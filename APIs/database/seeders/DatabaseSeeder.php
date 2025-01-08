<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Cabin;
use App\Models\Guest;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        \App\Models\User::factory(10)->create();
//        Guest::factory(1000)->create();
//        Cabin::factory(20)->create();
        Booking::factory(30)->create();
    }
}

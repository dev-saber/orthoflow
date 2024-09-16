<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Bill;
use App\Models\MedicalHistory;
use App\Models\Patient;
use App\Models\Stock;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'test@test.com',
            'email_verified_at' => now(),
            'password' => bcrypt('0000'),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
        ]);

        User::factory(3)->create();
        Patient::factory(20)->create();
        Appointment::factory(300)->create();
        MedicalHistory::factory(100)->create();
        Bill::factory(300)->create();
        // Stock::factory(5)->create();    
    }
}

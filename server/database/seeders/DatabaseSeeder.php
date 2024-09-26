<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Bill;
use App\Models\MedicalHistory;
use App\Models\Patient;
use App\Models\Stock;
use App\Models\User;
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
            'end_time' => '15:00:00',
        ]);

        Patient::factory(25)->create();
        Appointment::factory(1500)->create();
        MedicalHistory::factory(80)->create();
        Bill::factory(300)->create();

        // stock categories to be used for each user
        $stockCategories = [
            'pieces' => [
                'Dental Mirror',
                'Dental Explorer',
                'Dental Burs',
            ],
            'boxes' => [
                'Disposable Gloves (Box of 100)',
                'Surgical Masks (Box of 50)',
                'Dental Anesthetic',
                'Dental X-ray Films',
                'Sterilization Pouches',
            ],
            'syringes' => [
                'Composite Resin',
            ],
            'packs' => [
                'Dental Floss',
                'Cotton Rolls',
                'Saliva Ejectors',
                'Dental Bibs',
            ],
            'jars' => [
                'Temporary Filling Material',
            ],
            'sets' => [
                'Impression Material',
            ],
        ];

        User::all()->each(function ($user) use ($stockCategories) {
            foreach ($stockCategories as $unit => $items) {
                foreach ($items as $item) {
                    Stock::create([
                        'name' => $item,
                        'price' => fake()->randomFloat(2, 5, 100),
                        'quantity' => fake()->numberBetween(1, 100),
                        'reorder_level' => fake()->numberBetween(1, 20),
                        'unit' => $unit,
                        'dentist_id' => $user->id,
                    ]);
                }
            }
        });
    }
}

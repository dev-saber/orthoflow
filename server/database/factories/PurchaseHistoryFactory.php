<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseHistory>
 */
class PurchaseHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dentists = User::pluck('id');
        
        return [
            'dentist_id' => fake()->randomElement($dentists),
            'item' => fake()->randomElement([
                'Dental Mirror',
                'Dental Explorer',
                'Cotton Roll',
                'Syringe',
                'Dental Scaler',
                'Forceps',
                'Surgical Mask',
                'Gloves',
                'Dental Cement',
                'Dental Floss'
            ]),
            'quantity' => fake()->numberBetween(1, 100),
            'purchase_date' => fake()->date(),
            'purchase_price' => fake()->randomFloat(2, 5, 100)
        ];
    }
}

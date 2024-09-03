<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dentists = User::pluck('id');

        // predefined list of dental items
        $dentalItems = [
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
        ];

        return [
            'name' => fake()->randomElement($dentalItems),
            'price' => fake()->randomFloat(2, 5, 100),
            'quantity' => fake()->numberBetween(1, 100),
            'reorder_level' => fake()->numberBetween(1, 20),
            'dentist_id' => fake()->randomElement($dentists),
        ];
    }
}

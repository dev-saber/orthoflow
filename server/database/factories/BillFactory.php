<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bill>
 */
class BillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $patients = Patient::pluck('id');

        return [
            'patient_id' => fake()->randomElement($patients),
            'amount' => fake()->randomFloat(2, 0, 1000),
            'status' => fake()->randomElement(['unpaid', 'paid']),
        ];
    }
}

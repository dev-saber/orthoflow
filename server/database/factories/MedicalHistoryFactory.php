<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalHistory>
 */
class MedicalHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dentists = User::pluck('id');
        $patients = Patient::pluck('id');

        return [
            'patient_id' => fake()->randomElement($patients),
            'dentist_id' => fake()->randomElement($dentists),
            'diagnosis' => fake()->sentence(),
            'treatment' => fake()->sentence(),
            'visit_date' => fake()->date(),
            'notes' => fake()->sentence(),
        ];
    }
}

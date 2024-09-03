<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
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
            'date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'canceled']),
        ];
    }
}

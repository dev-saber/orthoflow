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

        $dentistId = fake()->randomElement($dentists);
        $dentist = User::find($dentistId);

        $startTime = fake()->dateTimeBetween($dentist->start_time, $dentist->end_time);
        $endTime = fake()->dateTimeBetween($startTime, $dentist->end_time);

        return [
            'patient_id' => fake()->randomElement($patients),
            'dentist_id' => $dentistId,
            'date' => fake()->dateTimeBetween('2024-06-01', '2024-12-31')->format('Y-m-d'),
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
            'status' => fake()->randomElement(['pending', 'confirmed', 'canceled']),
        ];
    }
}

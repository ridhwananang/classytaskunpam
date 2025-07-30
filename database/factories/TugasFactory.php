<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Kelas;
use App\Models\Jadwal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tugas>
 */
class TugasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_tugas' => $this->faker->sentence(3),
            'deskripsi' => $this->faker->paragraph(),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 month'),
            'kelas_id' => Kelas::factory(),
            // 'users_id' => User::factory(),
            'jadwals_id' => Jadwal::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

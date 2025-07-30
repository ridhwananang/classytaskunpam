<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Kelas;
use App\Models\Jadwal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jadwal>
 */
class JadwalFactory extends Factory
{
    protected $model = Jadwal::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_matkul' => $this->faker->word(),
            'users_id' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }
}

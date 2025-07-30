<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kelas')->insert([
            'nama_kelas' => 'TPLM003',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $kelasId = DB::table('kelas')->where('nama_kelas', 'TPLM003')->value('id');
        User::create([
            'nim' => '231011450670',
            'name' => 'An',
            'email' => 'jakartacodese@gmail.com',
            'email_verified_at' => now(),
            'kelas_id' => $kelasId,
            'role' => 'admin',
            'password' => Hash::make('Veena123'),
        ]);
    }
}

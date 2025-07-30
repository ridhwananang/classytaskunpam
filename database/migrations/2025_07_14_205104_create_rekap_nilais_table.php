<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rekap_nilais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // mahasiswa
            $table->foreignId('jadwal_id')->constrained()->onDelete('cascade'); // matkul
            $table->unsignedTinyInteger('tugas')->nullable();
            $table->unsignedTinyInteger('uts')->nullable();
            $table->unsignedTinyInteger('uas')->nullable();
            $table->unsignedTinyInteger('kehadiran')->default(0);
            $table->string('nilai')->nullable(); // A, B, C, D, E
            $table->timestamps();

            $table->unique(['user_id', 'jadwal_id']); // 1 mahasiswa hanya 1 rekap per matkul
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekap_nilais');
    }
};

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
        Schema::table('absensis', function (Blueprint $table) {
            $table->foreignId('jadwal_id')->after('user_id')->constrained();
            $table->enum('status', ['hadir', 'tidak_hadir'])->default('tidak_hadir')->after('jadwal_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('absensis', function (Blueprint $table) {
            $table->dropForeign(['jadwal_id']);
            $table->dropColumn('jadwal_id');
            $table->dropColumn('status');
        });
    }
};

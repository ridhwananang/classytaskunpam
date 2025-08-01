<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Crypt;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use  Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nim',
        'name',
        'email',
        'kelas_id',
        'role',
        'password',
        'is_online',
        'email_verified_at',
        'remember_token',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        return in_array($this->role, ['admin']);
    }


    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function mahasiswa()
    {
        return $this->hasOne(User::class, 'id', 'mahasiswa_id');
    }

    public function tugas()
    {
        return $this->hasManyThrough(Tugas::class, Kelas::class, 'id', 'kelas_id', 'kelas_id', 'id');
    }

    public function forums()
    {
        return $this->hasMany(Forum::class);
    }

    public function kelompokTugas()
    {
        return $this->belongsToMany(KelompokTugas::class, 'kelompok_tugas_user', 'user_id', 'kelompok_tugas_id');
    }
    public function verifyTwoFactorAuth($code)
    {
        $google2fa = new Google2FA();
        return $google2fa->verifyKey(decrypt($this->two_factor_secret), $code);
    }

    // app/Models/User.php

    public function kelasAmpu()
    {
        // Melalui jadwal, ambil kelas yang diampu dosen ini
        return $this->hasManyThrough(
            \App\Models\Kelas::class,
            \App\Models\Jadwal::class,
            'dosen_id',   // Foreign key di tabel jadwals
            'id',         // Foreign key di tabel kelass (relasi ke jadwals.kelas_id)
            'id',         // Local key di tabel users
            'kelas_id'    // Local key di tabel jadwals
        )->distinct(); // Agar tidak dobel jika dosen ngajar kelas yang sama di 2 matkul
    }
}

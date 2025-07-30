<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Kelas;
use Inertia\Response;
// use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'kelasList' => Kelas::select('id', 'nama_kelas')->get(),
        ]);
        dd(Kelas::select('id', 'nama_kelas')->get());
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nim' => 'required|numeric|digits_between:1,12|unique:users,nim',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'kelas_id' => 'required|exists:kelas,id',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'nim' => $request->nim,
            'name' => $request->name,
            'email' => $request->email,
            'kelas_id' => $request->kelas_id,
            'password' => Hash::make($request->password),
            'email_verified_at' => now(),
            'remember_token' => Str::random(30),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }

    public function showRegisterPage()
    {
        return Inertia::render('register', [
            'kelasList' => Kelas::all(),
        ]);
    }

    public function registerUserByAdmin(Request $request): RedirectResponse
    {
        $user = Auth::user(); // user yang sedang login

        $rules = [
            'nim' => 'required|numeric|digits_between:1,12|unique:users,nim',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'role' => 'required|in:admin,kelasAdmin,mahasiswa,dosen',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];

        // Hanya admin yang boleh mengisi manual kelas_id
        if ($user->role === 'admin') {
            $rules['kelas_id'] = 'required|exists:kelas,id';
        }
        // Log::info('User Login:', ['role' => $user->role, 'kelas_id' => $user->kelas_id]);

        $validated = $request->validate($rules);

        // Penentuan kelas_id berdasarkan role
        if ($user->role === 'admin') {
            $kelasId = $validated['kelas_id'];
        } elseif ($user->role === 'kelasAdmin') {
            // kelasAdmin harus otomatis pakai kelas_id miliknya
            if (!$user->kelas_id) {
                return redirect()->back()->withErrors(['kelas_id' => 'Akun Anda belum memiliki kelas terkait. Hubungi administrator.']);
            }
            $kelasId = $user->kelas_id;
        } else {
            // Jika bukan admin atau kelasAdmin
            return redirect()->back()->withErrors(['role' => 'Anda tidak memiliki izin untuk melakukan tindakan ini.']);
        }

        // Buat user baru
        User::create([
            'nim' => $validated['nim'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'kelas_id' => $kelasId,
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(),
            'remember_token' => Str::random(30),
        ]);

        return redirect()->back()->with('success', 'User berhasil ditambahkan!');
    }




    public function showAddUserForm()
    {
        return Inertia::render('dashboard_admin', [
            'kelasList' => Kelas::select('id', 'nama_kelas')->get(),
            // 'mahasiswaList' => User::select('id', 'nim', 'name')->get(),
        ]);
    }
}

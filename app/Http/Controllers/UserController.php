<?php

// namespace App\Http\Controllers;

// use App\Models\User;
// use Inertia\Inertia;
// use Illuminate\Http\Request;
// use Illuminate\Support\Carbon;
// use Illuminate\Http\JsonResponse;
// use Illuminate\Support\Facades\DB;

// class UserController extends Controller
// {
//     public function isUserOnline($id): JsonResponse
//     {
//         $user = User::find($id);
//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }

//         return response()->json(['online' => $user->is_online]);
//     }
//     public function index()
//     {
//         $users = User::select('id', 'name', 'nim', 'is_online')->get();

//         return Inertia::render('Dashboard', [
//             'users' => $users
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    // Cek apakah user online
    public function isUserOnline($id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['online' => $user->is_online]);
    }

    // Halaman dashboard (jika diperlukan)
    public function acak()
    {
        $users = User::select('id', 'name', 'nim')->get();
        // dd(User::all()); // Mengonversi ke array
        return Inertia::render('acak', [
            'users' => $users
        ]);
    }


    // Halaman Forum: Acak Nama Mahasiswa
    public function showRandomizer()
    {
        $users = User::select('id', 'name', 'nim')->get();

        return Inertia::render('acak', [
            'users' => $users
        ]);
    }
}

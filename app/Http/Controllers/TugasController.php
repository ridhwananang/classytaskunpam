<?php

namespace App\Http\Controllers;

use App\Models\Tugas;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TugasController extends Controller
{
    public function index(Request $request)
    {
        $kategori = $request->input('kategori', 'Individu'); // Default ke 'Individu' jika tidak ada input
        // 'Individu' atau 'Kelompok'

        // Cari category berdasarkan nama (misal 'Individu' atau 'Kelompok')
        $category = Category::where('category', $kategori)->first();

        // Siapkan variabel default jika kategori tidak ditemukan
        $tugas = collect();

        if ($category) {
            // Ambil semua tugas dengan kategori tersebut, termasuk relasi kelompok dan mahasiswa
            $tugas = Tugas::with('kelompokTugas.mahasiswa', 'jadwal')
                ->where('category_id', $category->id)
                ->get();
        }

        return Inertia::render('tugas', [
            'tugas' => $tugas,
            'kategori' => $kategori,
        ]);
    }
}


    // public function index(Request $request)
    // {
    //     $user = Auth::user(); // Ambil user yang login
    //     $kategori = $request->query('kategori', 'Individu'); // Default 'Individu'

    //     $category = Category::where('category', $kategori)->first();

    //     if (!$category) {
    //         return redirect()->back()->with('error', 'Kategori tidak ditemukan');
    //     }

    //     // Ambil tugas berdasarkan kelas user yang login & category_id
    //     $tugas = Tugas::where('kelas_id', $user->kelas_id)
    //         ->where('category_id', $category->id)
    //         ->with('jadwal') // 🟢 Ambil data jadwal terkait
    //         ->get();


    //     // dd($kategori, $category, $tugas->toArray());

    //     return Inertia::render('tugas', [  // 🟢 Kirim data sebagai props ke React
    //         'tugas' => $tugas,
    //         'kategori' => $kategori,
    //     ]);
    // }


    // public function show($id)
    // {
    //     // Ambil data tugas beserta relasi yang dibutuhkan
    //     $tugas = Tugas::with('kelas', 'category', 'jadwal', 'kelompokTugas')->findOrFail($id);

    //     // Kirim data tugas ke komponen Inertia
    //     return Inertia::render('admin/tugas/show', [
    //         'tugas' => $tugas,
    //     ]);
    // }

    // public function show($id)
    // {
    //     $tugas = Tugas::with('mahasiswa')->findOrFail($id);
    //     return view('tugas.show', compact('tugas'));
    // }

    // public function show($id)

    // {

    //     $tugas = Tugas::with([
    //         'kelompokTugas.mahasiswa' // 👈 Ini penting untuk load anggota kelompok
    //     ])->findOrFail($id);

    //     $kelompokTugas = $tugas->kelompokTugas;
    //     dd($kelompokTugas->toArray());

    //     return view('tugas-view', [ // 👈 Ganti dengan nama view kamu
    //         'tugas' => $tugas,
    //         'kelompokTugas' => $kelompokTugas,
    //     ]);
    // }

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Forum;
use App\Models\Discussion;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $forums = Forum::with('user.kelas')
            ->when(!in_array($user->role, ['admin', 'dosen']), function ($query) use ($user) {
                $query->where(function ($q) use ($user) {
                    $q->where('kelas_id', $user->kelas_id)
                        ->orWhereNull('kelas_id') // forum admin yang tidak spesifik kelas
                        ->orWhereHas('user', function ($subQ) {
                            $subQ->where('role', 'admin'); // forum yang dibuat oleh admin
                        });
                });
            })
            ->latest()
            ->get();

        $kelasList = [];

        // Ambil kelas dari jadwals jika user adalah dosen
        if ($user->role === 'dosen') {
            $kelasList = $user->kelasAmpu()->select('kelas.id', 'kelas.nama_kelas')->get();
        }

        return Inertia::render('forum', [
            'forumList' => $forums,
            'kelasList' => $kelasList,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'kelas_id' => 'nullable|exists:kelas,id',
        ]);

        $user = Auth::user();

        Forum::create([
            'user_id' => $user->id,
            'kelas_id' => $user->role === 'dosen' ? $request->kelas_id : $user->kelas_id,
            'judul' => $request->judul,
            'isi' => $request->isi,
            'slug' => Str::slug($request->judul),
        ]);

        return redirect()->route('forum.index');
    }

    public function show($slug)
    {
        $forum = Forum::where('slug', $slug)
            ->with(['user.kelas', 'comments.user.kelas'])

            ->firstOrFail();

        $user = Auth::user();

        // Jika bukan admin dan bukan kelas yang sama, tolak akses
        if (!in_array($user->role, ['admin', 'dosen'])) {
            if ($forum->user->role !== 'admin' && $user->kelas_id !== $forum->kelas_id) {
                abort(403, 'Kamu tidak memiliki akses ke forum ini.');
            }
        }



        return Inertia::render('show', ['forum' => $forum]);
    }

    public function update(Request $request, $id)
    {
        $forum = Forum::findOrFail($id);

        if (
            Auth::user()->role !== 'admin' &&
            Auth::user()->role !== 'kelasAdmin' &&
            Auth::user()->id !== $forum->user_id
        ) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'judul' => 'required|string',
            'isi' => 'required|string',
        ]);

        $forum->update([
            'judul' => $request->judul,
            'isi' => $request->isi,
        ]);

        return back();
    }

    public function destroy(Forum $forum)
    {
        $user = Auth::user();

        if ($user->id !== $forum->user_id && $user->role !== 'admin') {
            abort(403, 'Kamu tidak memiliki izin untuk menghapus forum ini.');
        }

        $forum->delete();

        return redirect()->route('forum.index')->with('success', 'Forum berhasil dihapus.');
    }
}

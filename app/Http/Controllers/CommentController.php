<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $forumId)
    {
        $request->validate([
            'isi' => 'required|string',
        ]);

        $forum = Forum::findOrFail($forumId);
        $user = Auth::user();

        if (in_array($user->role, ['mahasiswa', 'kelasAdmin'])) {
            // Jika forum tidak dibuat oleh admin dan bukan dari kelas yang sama → tolak akses
            if ($forum->user->role !== 'admin' && $forum->kelas_id !== $user->kelas_id) {
                abort(403, 'Akses ditolak');
            }
        }


        Comment::create([
            'forum_id' => $forum->id,
            'user_id' => $user->id,
            'isi' => $request->isi,
        ]);

        return back();
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();

        // Hanya pemilik komentar ATAU super admin (admin) yang boleh edit
        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            abort(403, 'Anda tidak memiliki izin untuk mengedit komentar ini.');
        }

        $request->validate([
            'isi' => 'required|string|max:1000',
        ]);

        $comment->update([
            'isi' => $request->isi,
        ]);

        return back();
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();

        // Hanya pemilik komentar ATAU super admin (admin) yang boleh hapus
        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            abort(403, 'Akses ditolak');
        }

        $comment->delete();

        return back();
    }
}

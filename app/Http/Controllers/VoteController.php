<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class VoteController extends Controller
{
    public function index()
    {
        $query = Vote::with([
            'options' => function ($query) {
                $query->withCount([
                    'results as upvotes_count' => function ($q) {
                        $q->where('type', 'up');
                    },
                    'results as downvotes_count' => function ($q) {
                        $q->where('type', 'down');
                    },
                    'results as total_votes_count',
                ]);
            }
        ])
            ->withCount(['upvotes', 'downvotes']);

        // 🔐 Jika bukan super admin, filter berdasarkan kelas user
        if (!in_array(Auth::user()->role, ['admin', 'dosen'])) {
            $query->where('kelas_id', Auth::user()->kelas_id);
        }

        $votes = $query->get();

        // Tambahkan top_option ke setiap vote
        $votes->each(function ($vote) {
            $topOption = $vote->options->sortByDesc('total_votes_count')->first();
            $vote->top_option = $topOption;
        });

        return Inertia::render('vote', [
            'votes' => $votes,
            'now' => now()->toIso8601String(),
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function create()
    {
        Gate::authorize('VoteCreate');
        return Inertia::render('VoteCreate');
    }

    public function store(Request $request)
    {
        Gate::authorize('VoteCreate');

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'deadline' => 'required|date|after:now',
            'options' => 'required|array|min:1',
            'options.*' => 'required|string|max:255',
        ]);

        $vote = new Vote($request->only('judul', 'deskripsi', 'deadline'));

        // 💡 Auto-set kelas_id berdasarkan user
        if (!in_array(Auth::user()->role, ['admin', 'dosen'])) {
            $vote->kelas_id = Auth::user()->kelas_id;
        } else {
            $vote->kelas_id = $request->kelas_id;
        }


        $vote->save();

        foreach ($request->options as $optionLabel) {
            if ($optionLabel) {
                $vote->options()->create([
                    'label' => $optionLabel,
                ]);
            }
        }

        return redirect()->route('vote.index')->with('success', 'Vote berhasil dibuat.');
    }

    public function show(Vote $vote)
    {
        $vote->load([
            'options' => function ($query) {
                $query->withCount([
                    'results as upvotes_count' => function ($q) {
                        $q->where('type', 'up');
                    },
                    'results as downvotes_count' => function ($q) {
                        $q->where('type', 'down');
                    },
                ]);
            }
        ]);

        return Inertia::render('voteshow', [
            'vote' => $vote,
            'now' => now()->toDateTimeString(),
        ]);
    }

    public function destroy(Vote $vote)
    {
        $vote->delete();

        return redirect()->route('vote.index')->with('success', 'Voting berhasil dihapus.');
    }
}

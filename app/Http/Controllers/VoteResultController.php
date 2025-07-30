<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\VoteOption;
use App\Models\VoteResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoteResultController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'vote_id' => 'required|exists:votes,id',
            'option_id' => 'required|exists:vote_options,id',
            'type' => 'required|in:up,down',
        ]);

        $vote = Vote::with('options')->findOrFail($request->vote_id);

        // Jika deadline sudah lewat, tolak voting
        if (now()->gt($vote->deadline)) {
            $userVote = VoteResult::where('user_id', Auth::id())
                ->where('vote_id', $vote->id)
                ->first();

            return Inertia::render('voteshow', [
                'vote' => $vote,
                'now' => now()->toIso8601String(), // ⬅️ konsisten waktu ISO 8601
                'user_vote' => $userVote ? [
                    'option_id' => $userVote->vote_option_id,
                    'type' => $userVote->type,
                ] : null,
                'flash' => [
                    'vote_success' => false,
                    'error' => 'Voting sudah ditutup.',
                ],
            ]);
        }

        $user = Auth::user();
        $option = VoteOption::findOrFail($request->option_id);

        $result = VoteResult::updateOrCreate(
            ['user_id' => $user->id, 'vote_id' => $vote->id],
            ['vote_option_id' => $option->id, 'type' => $request->type]
        );

        return Inertia::render('voteshow', [
            'vote' => $vote,
            'now' => now()->toIso8601String(),
            'user_vote' => [
                'option_id' => $option->id,
                'type' => $request->type,
            ],
            'flash' => [
                'vote_success' => true,
                'voted_by' => $user->name,
                'option_label' => $option->label,
            ],
        ]);
    }

    public function show(Vote $vote)
    {
        $vote->load([
            'options' => function ($query) {
                $query->withCount('results'); // total suara per opsi
            },
            'userResult.option', // biar bisa ambil pilihan user juga
        ]);

        $userVote = $vote->userResult;

        // Cari opsi dengan suara terbanyak
        $topOption = $vote->options->sortByDesc('results_count')->first();

        return Inertia::render('voteshow', [
            'vote' => $vote,
            'now' => now()->toIso8601String(),
            'user_vote' => $userVote ? [
                'option_id' => $userVote->vote_option_id,
                'type' => $userVote->type,
            ] : null,
            'top_option' => $topOption?->label, // kirim ke frontend
        ]);
    }
}

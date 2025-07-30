<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DiscussionController extends Controller
{
    public function store(Request $request, Forum $forum)
    {
        $request->validate([
            'isi' => 'required|string',
        ]);

        $forum->comments()->create([
            'user_id' => Auth::id(),
            'isi' => $request->isi,
        ]);

        return redirect()->back();
    }
}

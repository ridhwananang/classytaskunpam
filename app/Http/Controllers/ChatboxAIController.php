<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use thiagoalessio\TesseractOCR\TesseractOCR;

class ChatboxAIController extends Controller
{
    public function index()
    {
        return Inertia::render('openai/chatboxai');
    }

    public function chatboxAI(Request $request)
    {
        $messages = $request->input('messages');

        if (!is_array($messages)) {
            return response()->json([
                'reply' => 'Format pesan salah.',
            ], 422);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            ])->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama3-70b-8192',
                'messages' => $messages,
            ]);

            $data = $response->json();
            $reply = $data['choices'][0]['message']['content'] ?? 'Maaf, tidak ada balasan.';

            return response()->json(['reply' => $reply]);
        } catch (\Exception $e) {
            return response()->json(['reply' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }

    public function processImage(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['reply' => 'Tidak ada gambar yang diunggah.'], 422);
        }

        try {
            $filename = uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path('uploads/temp'), $filename);
            $path = public_path("uploads/temp/" . $filename);

            if (!file_exists($path)) {
                return response()->json(['reply' => "File tidak ditemukan: {$path}"], 404);
            }

            $text = (new TesseractOCR($path))
                ->lang('eng', 'ind')
                ->run();

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            ])->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama3-70b-8192',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Kamu adalah AI asisten yang menjawab dalam Bahasa Indonesia.',
                    ],
                    [
                        'role' => 'user',
                        'content' => "Jelaskan isi dari gambar berikut:\n\n" . $text,
                    ],
                ],
            ]);

            $data = $response->json();
            $reply = $data['choices'][0]['message']['content'] ?? 'Maaf, tidak ada balasan.';

            return response()->json(['reply' => $reply]);
        } catch (\Exception $e) {
            return response()->json(['reply' => 'Terjadi error: ' . $e->getMessage()], 500);
        }
    }
}

// namespace App\Http\Controllers;

// use Inertia\Inertia;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;

// class ChatboxAIController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('chatboxai');
//     }
//     public function chatboxAI(Request $request)
//     {
//         $messages = $request->input('messages');

//         if (!is_array($messages)) {
//             return response()->json([
//                 'reply' => 'Format pesan salah.',
//             ], 422);
//         }

//         try {
//             $response = Http::withHeaders([
//                 'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
//             ])->post('https://api.groq.com/openai/v1/chat/completions', [
//                 'model' => 'llama3-70b-8192',
//                 'messages' => $messages,
//             ]);

//             $data = $response->json();

//             $reply = $data['choices'][0]['message']['content'] ?? 'Maaf, tidak ada balasan.';

//             return response()->json([
//                 'reply' => $reply,
//             ]);
//         } catch (\Exception $e) {
//             return response()->json([
//                 'reply' => 'Terjadi kesalahan: ' . $e->getMessage(),
//             ], 500);
//         }
//     }
// } 

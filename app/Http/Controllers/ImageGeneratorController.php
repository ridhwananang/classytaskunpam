<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ImageGeneratorController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:200',
        ]);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('STABILITY_API_KEY'),
                'Accept' => 'application/json',
            ])->asMultipart()->post('https://api.stability.ai/v2beta/stable-image/generate/core', [
                [
                    'name' => 'prompt',
                    'contents' => $request->prompt,
                ],
                [
                    'name' => 'model',
                    'contents' => 'stable-diffusion-xl-beta-v2-2-2',
                ],
                [
                    'name' => 'output_format',
                    'contents' => 'png',
                ],
            ]);

            $data = $response->json();

            return response()->json([
                'url' => $data['image'] ?? null,
                'raw' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Terjadi error: ' . $e->getMessage(),
            ], 500);
        }
    }
}

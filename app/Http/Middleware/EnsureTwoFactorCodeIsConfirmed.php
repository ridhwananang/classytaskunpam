<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureTwoFactorCodeIsConfirmed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (
            Auth::check() &&
            Auth::user()->two_factor_secret &&
            !session()->has('two_factor_confirmed')
        ) {
            return redirect()->route('two-factor.login');
        }

        return $next($request); // ✅ Ini penting agar request bisa diteruskan
    }
}

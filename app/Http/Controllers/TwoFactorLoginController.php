<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class TwoFactorLoginController extends Controller
{

    public function store(Request $request)
    {
        $request->validate(['code' => 'required']);

        $user = $request->user();
        $google2fa = new \PragmaRX\Google2FAQRCode\Google2FA();

        $secret = decrypt($user->two_factor_secret);

        $validOtp = $google2fa->verifyKey($secret, $request->code);

        // Cek recovery code
        $recoveryCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);
        $validRecovery = in_array($request->code, $recoveryCodes);

        if (! $validOtp && ! $validRecovery) {
            return back()->withErrors(['code' => 'Kode OTP atau recovery code salah']);
        }

        // Jika kode recovery digunakan, hapus dari daftar agar hanya bisa sekali pakai
        if ($validRecovery) {
            $updatedCodes = array_filter($recoveryCodes, fn($c) => $c !== $request->code);
            $user->forceFill([
                'two_factor_recovery_codes' => encrypt(json_encode(array_values($updatedCodes))),
            ])->save();
        }

        session(['two_factor_confirmed' => true]);

        return redirect()->intended(route('dashboard'));
    }
}

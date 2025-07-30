<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OTPHP\TOTP;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Inertia\Inertia;

class AuthenticatorController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        if (!$user->totp_secret) {
            $totp = TOTP::create();
            $user->totp_secret = encrypt($totp->getSecret());
            $user->save();
        } else {
            $totp = TOTP::create(decrypt($user->totp_secret));
        }

        $totp->setLabel($user->email);
        $totp->setIssuer('ClassyTask');
        $otpUri = $totp->getProvisioningUri();

        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $qrCode = $writer->writeString($otpUri);

        return Inertia::render('auth/SetupQR', [
            'qrSvg' => $qrCode,
            'secret' => $totp->getSecret(),
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = Auth::user();

        if (!$user->totp_secret) {
            return back()->withErrors(['code' => 'Authenticator belum diset.']);
        }

        $totp = TOTP::create(decrypt($user->totp_secret));

        if (!$totp->verify($request->code)) {
            return back()->withErrors(['code' => 'Kode salah atau kadaluarsa.']);
        }

        return redirect()->route('absensi.input-kode')->with('success', '✅ OTP berhasil diverifikasi!');
    }
}

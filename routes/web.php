<?php

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Forum;
use App\Models\Tugas;
use App\Models\Jadwal;
use App\Http\Controllers\RekapNilaiController;

use Illuminate\Support\Str;
use Spatie\Sitemap\Sitemap;
use Illuminate\Http\Request;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFController;
use PragmaRX\Google2FAQRCode\Google2FA;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\GenAIController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\TugasController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ChatboxAIController;
// use Illuminate\Http\Request;
use App\Http\Controllers\PertemuanController;
use App\Http\Controllers\DiscussionController;
// use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoteResultController;
use App\Http\Controllers\AuthenticatorController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ImageGeneratorController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Middleware\EnsureTwoFactorCodeIsConfirmed;

Route::middleware(['auth'])->group(function () {
    Route::get('/two-factor-login', function () {
        return Inertia::render('TwoFactorLogin');
    })->name('two-factor.login');

    Route::post('/two-factor-login', [App\Http\Controllers\TwoFactorLoginController::class, 'store'])
        ->name('two-factor.login.store');
});
Route::middleware(['auth', 'verified', EnsureTwoFactorCodeIsConfirmed::class])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        $mahasiswa = User::where('kelas_id', $user->kelas_id)->with('kelas')->get();
        $jadwal = Jadwal::where('kelas_id', $user->kelas_id)->get();
        $tugas = Tugas::where('kelas_id', $user->kelas_id)->get();

        return Inertia::render('dashboard', [
            'mahasiswa' => $mahasiswa,
            'tugas' => $tugas,
            'jadwal' => $jadwal,
        ]);
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/two-factor', function () {
        return Inertia::render('TwoFactorSetup');
    });

    Route::post('/user/two-factor-authentication', function (Request $request) {
        $google2fa = new Google2FA();

        $user = $request->user();

        if (! $user->two_factor_secret) {
            $secret = $google2fa->generateSecretKey();

            $user->forceFill([
                'two_factor_secret' => Crypt::encrypt($secret),
                'two_factor_recovery_codes' => Crypt::encrypt(json_encode(
                    collect(range(1, 8))->map(fn() => Str::random(10))->all()
                )),
            ])->save();
        }

        return response()->json(['message' => '2FA enabled']);
    });

    Route::get('/user/two-factor-qr-code', function (Request $request) {
        $google2fa = new Google2FA();
        $user = $request->user();

        $secret = Crypt::decrypt($user->two_factor_secret);

        $inlineUrl = $google2fa->getQRCodeInline(
            config('app.name'),
            $user->email,
            $secret
        );

        return response()->json([
            'svg' => $inlineUrl,
            'recovery_codes' => json_decode(Crypt::decrypt($user->two_factor_recovery_codes), true),
        ]);
    });

    Route::post('/user/confirmed-two-factor-authentication', function (Request $request) {
        $request->validate(['code' => 'required']);
        $google2fa = new Google2FA();

        $user = $request->user();
        $secret = Crypt::decrypt($user->two_factor_secret);

        if (! $google2fa->verifyKey($secret, $request->code)) {
            return response()->json(['message' => 'Kode OTP salah'], 422);
        }

        $user->forceFill([
            'two_factor_confirmed_at' => now(),
        ])->save();

        return response()->json(['message' => '2FA confirmed']);
    });

    Route::delete('/user/two-factor-authentication', function (Request $request) {
        $user = $request->user();

        $user->forceFill([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ])->save();

        return response()->json(['message' => '2FA disabled']);
    });
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/acak', [UserController::class, 'acak'])->name('acak');

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::middleware(['auth'])->group(function () {
    Route::get('/adduser', [RegisteredUserController::class, 'showAddUserForm'])->name('admin.users.create');
    Route::post('/adduser', [RegisteredUserController::class, 'registerUserByAdmin'])->name('admin.users.store');
});
Route::middleware(['auth'])->group(function () {
    Route::get('/vote', [VoteController::class, 'index'])->name('vote.index');

    Route::get('/vote/create', [VoteController::class, 'create'])->middleware('can:VoteCreate');
    Route::post('/vote', [VoteController::class, 'store'])->middleware('can:VoteCreate');

    Route::get('/vote/{vote}', [VoteResultController::class, 'show'])->name('vote.show');
    Route::delete('/vote/{vote}', [VoteController::class, 'destroy'])->name('vote.destroy');

    Route::post('/vote-result', [VoteResultController::class, 'store'])->name('vote.result');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard_admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::delete('/mahasiswa/{id}', [AdminDashboardController::class, 'destroy'])->name('admin.mahasiswa.destroy');
});
Route::middleware(['auth'])->get('/kelas', [KelasController::class, 'index']);
Route::middleware('auth')->get('/kelas/{kelas_id}', [KelasController::class, 'show']);

Route::get('/jadwal', [JadwalController::class, 'index'])->name('jadwals.index');

Route::get('/user/{id}/online', function ($id) {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    return response()->json(['online' => $user->is_online]);
});

Route::get('/tugas', [TugasController::class, 'index'])->name('tugas.index');

Route::middleware(['auth'])->group(function () {
    Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::get('/forum/{slug}', [ForumController::class, 'show'])->name('forum.show');
    Route::delete('/forum/{forum}', [ForumController::class, 'destroy'])->name('forum.destroy');
    Route::put('/forum/{id}', [ForumController::class, 'update'])->name('forum.update');
});

Route::post('/forum/{forum}/comments', [DiscussionController::class, 'store'])->name('comments.store');

Route::middleware(['auth'])->group(function () {
    Route::post('/forum/{forum}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

Route::get('/admin/tugas/{id}', [TugasController::class, 'show']);

Route::middleware(['auth'])->group(function () {
    Route::get('/chatboxai', [ChatboxAIController::class, 'index']);
    Route::post('/chatboxai', [ChatboxAIController::class, 'chatboxAI']);
    Route::post('/chatboxai/image', [ChatboxAIController::class, 'processImage']);
});

Route::get('/test', function () {
    return Inertia::render('test');
});

Route::post('/admin/jadwal', [AdminDashboardController::class, 'storeJadwal'])->name('admin.jadwal.store');
Route::delete('/admin/jadwal/{id}', [AdminDashboardController::class, 'destroyJadwal'])->name('admin.jadwal.destroy');

Route::get('/sitemap.xml', function () {
    $sitemap = Cache::remember('sitemap', 60, function () {
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0))
            ->add(Url::create('/register'))
            ->add(Url::create('/jadwal'))
            ->add(Url::create('/tugas'))
            ->add(Url::create('/forum'))
            ->add(Url::create('/chatboxai'));

        // Ambil semua forum dinamis
        $forums = Forum::all();
        foreach ($forums as $forum) {
            $sitemap->add(
                Url::create("/forum/{$forum->slug}")
                    ->setLastModificationDate(Carbon::parse($forum->updated_at))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8)
            );
        }

        return $sitemap;
    });

    return $sitemap->toResponse(request());
});
Route::middleware(['auth'])->group(function () {
    Route::get('/GenerateImage', fn() => Inertia::render('GenerateImage'));
    Route::post('/GenerateImage', [\App\Http\Controllers\ImageGeneratorController::class, 'generate']);
});

Route::get('/export-mahasiswa', [ExportController::class, 'exportExcel'])
    ->middleware('auth')
    ->name('export.mahasiswa');
Route::get('/export/pdf', [PDFController::class, 'exportPDF'])->name('export.pdf');
Route::middleware(['auth'])->group(function () {
    Route::get('/setup-authenticator', [AuthenticatorController::class, 'show'])->name('authenticator.setup');
    Route::post('/setup-authenticator', [AuthenticatorController::class, 'verify'])->name('authenticator.verify');

    Route::get('/absensi/input-kode', [AbsensiController::class, 'inputKode'])->name('absensi.input-kode');
    Route::post('/absensi/hadir', [AbsensiController::class, 'absensiHadir'])->name('absensi.hadir');
    Route::get('/absensi/riwayat', [AbsensiController::class, 'riwayat'])->name('absensi.riwayat');

    Route::get('/admin/pertemuan/create', [PertemuanController::class, 'create'])->name('pertemuan.create');
    Route::post('/admin/pertemuan', [PertemuanController::class, 'store'])->name('pertemuan.store');
});
Route::middleware(['auth'])->group(function () {
    Route::get('/rekap-nilai', [RekapNilaiController::class, 'create'])->name('rekap.create');
    Route::post('/rekap-nilai', [RekapNilaiController::class, 'store'])->name('rekap.store');
});
Route::middleware(['auth'])->group(function () {
    Route::get('/kehadiran-pertemuan/{pertemuan}', [AbsensiController::class, 'showByPertemuan'])->name('kehadiran-pertemuan.show');
    Route::get('/kehadiran-pertemuan', [AbsensiController::class, 'listPertemuan'])->name('kehadiran-pertemuan.index');
});

Route::get('/nilai', [RekapNilaiController::class, 'nilai'])->middleware(['auth']);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


//WOZBERR
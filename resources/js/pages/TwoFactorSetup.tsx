import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function TwoFactorSetup() {
  const [enabled, setEnabled] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  const fetchQrAndCodes = () => {
    fetch('/user/two-factor-qr-code', {
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQrCode(data.svg);
        setRecoveryCodes(data.recovery_codes);
      })
      .catch((err) => console.error('Gagal ambil QR code:', err));
  };

  const enable2FA = () => {
    fetch('/user/two-factor-authentication', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(() => {
        setEnabled(true);
        fetchQrAndCodes();
      })
      .catch((err) => console.error('Gagal aktifkan 2FA:', err));
  };

  const confirmOTP = () => {
    fetch('/user/confirmed-two-factor-authentication', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ code }),
    })
      .then(() => {
        setCode('');
        setShowModal(true);
        fetchQrAndCodes();
      })
      .catch((err) => console.error('Gagal konfirmasi OTP:', err));
  };

  const disable2FA = () => {
    fetch('/user/two-factor-authentication', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(() => {
        setEnabled(false);
        setQrCode('');
        setRecoveryCodes([]);
        setShowModal(false);
      })
      .catch((err) => console.error('Gagal nonaktifkan 2FA:', err));
  };

  useEffect(() => {
    fetch('/user/two-factor-qr-code', {
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (res.ok) {
          setEnabled(true);
          return res.json();
        }
        setEnabled(false);
      })
      .then((data) => {
        if (data) {
          setQrCode(data.svg);
          setRecoveryCodes(data.recovery_codes);
        }
      })
      .catch(() => setEnabled(false));
  }, []);

  return (
    <AppLayout>
      <Head title="Two-Factor Authentication" />

      {/* ✅ Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Berhasil!</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Two-Factor Authentication berhasil dikonfirmasi.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Two-Factor Authentication (2FA)
        </h1>

        {/* Status */}
        <div
          className={`text-sm font-medium ${
            enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Status: {enabled ? 'Aktif' : 'Tidak Aktif'}
        </div>

        {/* Tombol Aktifkan */}
        <button
          onClick={enable2FA}
          disabled={enabled}
          className={`w-full px-4 py-3 rounded-lg shadow transition font-semibold ${
            enabled
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          🔐 Aktifkan 2FA
        </button>

        {enabled && (
          <>
            {/* Tampilkan QR */}
            {qrCode && (
              <div className="border rounded-xl p-4 bg-gray-50 dark:bg-neutral-800 text-center transition">
                <div
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: qrCode }}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Scan QR di aplikasi Google Authenticator untuk menghubungkan.
                </p>
              </div>
            )}

            {/* Input OTP */}
            {!showModal && (
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masukkan Kode OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="border border-gray-300 dark:border-neutral-700 px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white transition"
                  placeholder="Contoh: 123456"
                />
                <button
                  onClick={confirmOTP}
                  className="bg-green-600 hover:bg-green-700 w-full text-white px-4 py-2 rounded-lg transition font-semibold"
                >
                  ✅ Konfirmasi OTP
                </button>
              </div>
            )}

            {/* Tombol Nonaktifkan */}
            <button
              onClick={disable2FA}
              className="bg-red-600 hover:bg-red-700 w-full text-white px-4 py-2 mt-4 rounded-lg transition font-semibold"
            >
              ❌ Nonaktifkan 2FA
            </button>
          </>
        )}
      </div>
    </AppLayout>
  );
}

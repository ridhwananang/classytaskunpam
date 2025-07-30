import React from 'react';
import { useForm } from '@inertiajs/react';

export default function TwoFactorLogin() {
  const { data, setData, post, processing, errors } = useForm({ code: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/two-factor-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/img/web.jpg')] bg-cover bg-center bg-no-repeat px-4 relative">
      <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 space-y-6 border border-gray-100 dark:border-neutral-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🔐 Verifikasi Keamanan</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Masukkan kode dari aplikasi Authenticator
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kode OTP
            </label>
            <input
              id="code"
              type="text"
              value={data.code}
              onChange={(e) => setData('code', e.target.value)}
              className={`mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm text-sm transition focus:outline-none focus:ring-2 dark:bg-neutral-800 dark:text-white ${
                errors.code
                  ? 'border-red-500 focus:ring-red-300 dark:focus:ring-red-500'
                  : 'border-gray-300 dark:border-neutral-600 focus:ring-blue-400 dark:focus:ring-blue-500'
              }`}
              placeholder="Contoh: 123456"
              disabled={processing}
              autoFocus
            />
            {errors.code && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.code}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`w-full flex justify-center items-center px-4 py-2 text-white text-sm font-semibold rounded-lg shadow transition ${
              processing
                ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800'
            }`}
          >
            {processing ? 'Memverifikasi...' : '✅ Verifikasi'}
          </button>
        </form>
      </div>
    </div>
  );
}

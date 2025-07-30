import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function SetupQR() {
  const props = usePage().props as unknown as {
    qrSvg: string;
    secret: string;
  };
  const { qrSvg, secret } = props;

  const { data, setData, post, processing, errors } = useForm({
    code: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('authenticator.verify'), {
      onSuccess: () => router.visit(route('absensi.input-kode')),
    });
  };

  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-100px)] px-4 py-12 flex items-center justify-center bg-gray-100 dark:bg-neutral-900 transition-colors">
        <div className="bg-white dark:bg-neutral-800 text-black dark:text-white shadow-xl rounded-2xl w-full max-w-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-4">
            Setup Authenticator
          </h1>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Scan QR ini pakai aplikasi Google Authenticator:
          </p>

          <div
            className="flex justify-center my-6"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            *Scan QRCode cukup dilakukan 1x
          </p>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
           *Masukkan Kode OTP disetiap pertemuan
           </p>
          {/* Optional Manual Code */}
          {/* <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            Atau masukkan kode manual: <code className="font-mono">{secret}</code>
          </p> */}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              value={data.code}
              onChange={(e) => setData('code', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 dark:text-white border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Masukkan kode OTP"
              required
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              {processing ? 'Memverifikasi...' : 'Verifikasi OTP'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

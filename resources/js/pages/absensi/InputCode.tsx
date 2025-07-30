import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface PertemuanAktif {
  id: number;
  topik: string | null;
  jadwal: {
    nama_matkul: string;
  };
}

export default function InputCode() {
  const { pertemuan } = usePage().props as unknown as {
    pertemuan: PertemuanAktif | null;
  };

  const { data, setData, post, processing, errors } = useForm({
    code: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pertemuan) return;

    post(route('absensi.hadir', { pertemuan_id: pertemuan.id }), {
      onSuccess: () => {
        setData('code', '');
        setShowModal(true);
      },
      onError: () => {
        setErrorMessage('❌ Pertemuan Telah Berakhir');
        setShowErrorModal(true);
      },
    });
  };

  return (
    <AppLayout>
      <div className=" flex items-center justify-center bg-white dark:bg-black text-neutral-900 dark:text-white px-4 py-8">
        <div className="w-full max-w-md p-8 sm:p-10 bg-gray-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-2xl shadow-lg space-y-6">
          <h1 className="text-2xl font-extrabold text-center text-gray-800 dark:text-white">
            📋 Form Absensi
          </h1>

          {!pertemuan ? (
            <p className="text-center text-red-600 dark:text-red-400 font-semibold">
              Tidak ada pertemuan aktif saat ini.
            </p>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {pertemuan.jadwal.nama_matkul}
                </p>
                {pertemuan.topik && (
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    Topik: <span className="font-medium">{pertemuan.topik}</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kode Authenticator
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    inputMode="numeric"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 text-neutral-900 dark:text-white px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
                >
                  {processing ? 'Memproses...' : 'Absen Sekarang'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Modal Sukses */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center max-w-sm w-full border border-gray-300 dark:border-neutral-700 space-y-4">
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
                ✅ Absensi berhasil!
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Kehadiran kamu telah tercatat.
              </p>
              <button
                onClick={() => router.visit(route('riwayat.absensi'))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
              >
                Lihat Riwayat
              </button>
            </div>
          </div>
        )}

        {/* Modal Error */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center max-w-sm w-full border border-red-300 dark:border-red-700 space-y-4">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                Gagal Absen
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

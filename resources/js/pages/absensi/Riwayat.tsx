import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';

interface Absensi {
  id: number;
  status: string;
  waktu: string;
  pertemuan: {
    topik: string | null;
    jadwal: {
      nama_matkul: string;
    };
  };
}

export default function Riwayat() {
  const { absensis } = usePage().props as unknown as { absensis: Absensi[] };

  return (
    <AppLayout>
      <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-neutral-800 dark:text-neutral-200 px-4 py-8">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 transition-all duration-300">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            📅 Riwayat Absensi
          </h1>

          {absensis.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-neutral-400">
              Belum ada riwayat absensi.
            </p>
          ) : (
            <div className="space-y-4">
              {absensis.map((absen) => (
                <div
                  key={absen.id}
                  className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-neutral-700 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{absen.pertemuan.jadwal.nama_matkul}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${
                        absen.status === 'hadir'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {absen.status}
                    </span>
                  </div>

                  {absen.pertemuan.topik && (
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-medium text-gray-800 dark:text-neutral-300">Topik:</span> {absen.pertemuan.topik}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 dark:text-neutral-500 font-mono mt-1">
                    🕒 {new Date(absen.waktu).toLocaleString('id-ID')} WIB
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Mahasiswa {
  id: number;
  name: string;
  status: string;
}

interface Props {
  matkul: string;
  pertemuan: string;
  dataKehadiran: Mahasiswa[];
}

export default function ShowKehadiranPertemuan({
  matkul,
  pertemuan,
  dataKehadiran,
}: Props) {
  return (
    <AppLayout>
      <div className="w-full mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Informasi Mata Kuliah dan Pertemuan */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {matkul}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Topik: <span className="font-medium">{pertemuan}</span>
            </p>
          </div>

          {/* Tabel Kehadiran */}
          <div className="overflow-x-auto border rounded-lg border-neutral-200 dark:border-neutral-700">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Kehadiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {dataKehadiran.length > 0 ? (
                  dataKehadiran.map((mhs) => (
                    <tr
                      key={mhs.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <td className="px-6 py-3 text-neutral-900 dark:text-neutral-100">
                        {mhs.name}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            mhs.status === 'hadir'
                              ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-white'
                              : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-white'
                          }`}
                        >
                          {mhs.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-6 text-center text-neutral-500 dark:text-neutral-400"
                    >
                      Tidak ada data kehadiran untuk pertemuan ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="text-center">
          <Link
            href="/kehadiran-pertemuan"
            className="inline-block text-sm px-5 py-2.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            ← Kembali
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

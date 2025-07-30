import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Pertemuan {
  id: number;
  matkul: string;
  topik: string;
}

interface Props {
  pertemuans: Pertemuan[];
  matkulOptions: string[]; // daftar nama matkul dari backend
}

export default function ListPertemuan({ pertemuans, matkulOptions }: Props) {
  const [selectedMatkul, setSelectedMatkul] = useState<string>('semua');

  const filteredPertemuans = selectedMatkul === 'semua'
    ? pertemuans
    : pertemuans.filter(p => p.matkul === selectedMatkul);

  return (
    <AppLayout>
      <Head title="Daftar Pertemuan" />

      <div className="w-full mx-auto px-2 sm:px-6 py-6">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-5 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              Daftar Pertemuan
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Pilih pertemuan untuk melihat kehadiran mahasiswa.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Filter Matkul:
            </label>
            <select
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-neutral-200"
              value={selectedMatkul}
              onChange={(e) => setSelectedMatkul(e.target.value)}
            >
              <option value="semua">Semua</option>
              {matkulOptions.map((matkul, i) => (
                <option key={i} value={matkul}>
                  {matkul}
                </option>
              ))}
            </select>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full text-sm divide-y divide-neutral-200 dark:divide-neutral-700 border border-neutral-300 dark:border-neutral-600">
              <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold">Mata Kuliah</th>
                  <th className="px-3 py-3 text-left font-semibold">Topik</th>
                  <th className="px-3 py-3 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredPertemuans.length > 0 ? (
                  filteredPertemuans.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <td className="px-3 py-3 text-neutral-900 dark:text-neutral-100">
                        {p.matkul}
                      </td>
                      <td className="px-3 py-3 text-neutral-900 dark:text-neutral-100">
                        {p.topik}
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          href={`/kehadiran-pertemuan/${p.id}`}
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                      Tidak ada pertemuan pada matkul ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

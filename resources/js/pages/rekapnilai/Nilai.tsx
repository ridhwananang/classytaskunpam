import React from 'react';
import AppLayout from '@/layouts/app-layout';

interface Nilai {
  matkul: string;
//   kelas: string;
  tugas: number;
  uts: number;
  uas: number;
  kehadiran: number;
  nilai: string;
}

interface Props {
  rekap: Nilai[];
}

export default function Nilai({ rekap }: Props) {
  return (
    <AppLayout>
     <div className="p-4 sm:p-6 lg:p-8 w-full max-w-5xl mx-auto mt-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg space-y-6 transition-all duration-300">
  <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white tracking-tight">
    Nilai Akademik
  </h1>

  {rekap.length > 0 ? (
    <div className="overflow-x-auto rounded-xl ring-1 ring-gray-200 dark:ring-neutral-700 shadow-md">
      <table className="min-w-full divide-y divide-gray-100 dark:divide-neutral-700 text-sm">
        <thead className="bg-gradient-to-r from-indigo-500 to-sky-500 dark:from-indigo-600 dark:to-sky-700 text-white">
          <tr>
            {/* <th className="p-3 text-left">Kelas</th> */}
            <th className="p-3 text-left">Mata Kuliah</th>
            <th className="p-3 text-left">Tugas</th>
            <th className="p-3 text-left">UTS</th>
            <th className="p-3 text-left">UAS</th>
            <th className="p-3 text-left">Kehadiran</th>
            <th className="p-3 text-left">Nilai</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-100 dark:divide-neutral-800">
          {rekap.map((r, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150 ease-in-out"
            >
              {/* <td className="p-3">{r.kelas}</td> */}
              <td className="p-3 font-medium text-gray-800 dark:text-white">{r.matkul}</td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{r.tugas}</td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{r.uts}</td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{r.uas}</td>
              <td className="p-3">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    r.kehadiran >= 12
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-100'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
                  }`}
                >
                  {r.kehadiran}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold tracking-wide shadow-sm transition ${
                    r.nilai === 'A'
                      ? 'bg-emerald-500 text-white dark:bg-emerald-600'
                      : r.nilai === 'B'
                      ? 'bg-blue-500 text-white dark:bg-blue-600'
                      : r.nilai === 'C'
                      ? 'bg-yellow-400 text-white dark:bg-yellow-500'
                      : r.nilai === 'D'
                      ? 'bg-orange-400 text-white dark:bg-orange-500'
                      : 'bg-red-500 text-white dark:bg-red-600'
                  }`}
                >
                  {r.nilai}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
      Belum ada nilai yang tersedia.
    </div>
  )}
  <a
  href="/nilai/export"
  target="_blank"
  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
>
  Export PDF
</a>

</div>


    </AppLayout>
  );
}

import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface KelasOption {
  id: number;
  nama_kelas: string;
}

interface MatkulOption {
  id: number;
  nama_matkul: string;
}

interface Mahasiswa {
  id: number;
  name: string;
}

interface Jadwal {
  id: number;
  nama_matkul: string;
}

interface ExistingNilai {
  tugas?: number;
  uts?: number;
  uas?: number;
  nilai?: string;
}

interface PageProps {
  kelasOptions: KelasOption[];
  matkulOptions: MatkulOption[];
  kelas_id?: number;
  jadwal_id?: number;
  jadwal?: Jadwal;
  mahasiswa: Mahasiswa[];
  kehadiran: Record<number, number>;
  existing: Record<number, ExistingNilai>;
  totalPertemuan?: number;
}

export default function InputRekapNilai() {
  const {
    kelasOptions,
    matkulOptions,
    kelas_id,
    jadwal_id,
    jadwal,
    mahasiswa,
    kehadiran,
    totalPertemuan,
    existing
  } = usePage().props as unknown as PageProps;

  const [formState, setFormState] = useState<Record<number, { tugas: number; uts: number; uas: number }>>(
    mahasiswa.reduce((acc, m) => {
      acc[m.id] = {
        tugas: existing[m.id]?.tugas ?? 0,
        uts: existing[m.id]?.uts ?? 0,
        uas: existing[m.id]?.uas ?? 0,
      };
      return acc;
    }, {} as Record<number, { tugas: number; uts: number; uas: number }>)
  );

  const handleChange = (id: number, field: 'tugas' | 'uts' | 'uas', value: number) => {
    setFormState(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSubmit = () => {
    const payload = mahasiswa.map(m => ({
      user_id: m.id,
      tugas: formState[m.id].tugas,
      uts: formState[m.id].uts,
      uas: formState[m.id].uas,
    }));

    router.post('/rekap-nilai', {
      jadwal_id: jadwal!.id,
      rekap: payload,
    });
  };

  const handleSelect = (kelasId: number, jadwalId?: number) => {
    router.get('/rekap-nilai', {
      kelas_id: kelasId,
      ...(jadwalId ? { jadwal_id: jadwalId } : {})
    });
  };

  return (
    <AppLayout>
      <div className="p-2 sm:p-5 md:p-2 w-full mx-auto space-y-3">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-3 space-y-2 transition-all">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Input Rekap Nilai</h1>

          {/* FILTER */}
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center flex-wrap">
            <select
              value={kelas_id || ''}
              onChange={e => handleSelect(parseInt(e.target.value))}
              className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-white focus:ring focus:ring-blue-400 transition-all"
            >
              <option value="">Pilih Kelas</option>
              {kelasOptions.map(k => (
                <option key={k.id} value={k.id}>{k.nama_kelas}</option>
              ))}
            </select>

            {kelas_id && (
              <select
                value={jadwal_id || ''}
                onChange={e => handleSelect(kelas_id, parseInt(e.target.value))}
                className="w-full md:w-auto px-2 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-white focus:ring focus:ring-blue-400 transition-all"
              >
                <option value="">Pilih Mata Kuliah</option>
                {matkulOptions.map(m => (
                  <option key={m.id} value={m.id}>{m.nama_matkul}</option>
                ))}
              </select>
            )}
          </div>

          {/* TABEL NILAI */}
          {jadwal && mahasiswa.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Mata Kuliah: {jadwal.nama_matkul}
              </h2>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                Total Pertemuan: <span className="font-semibold text-gray-800 dark:text-white">{totalPertemuan ?? 0}</span>
              </p>

<div className="overflow-x-auto rounded-xl shadow-md scrollbar-hide">
  <table className="min-w-[250px] w-full border-collapse text-xs text-center text-gray-700 dark:text-gray-200">
    <thead className="bg-slate-300 dark:bg-neutral-800 text-slate-700 dark:text-white uppercase tracking-wide text-xs">
      <tr>
        <th className="px-20 py-3">Nama</th>
        <th className="px-2 py-3">Kehadiran</th>
        <th className="px-4 py-3">Tugas</th>
        <th className="px-4 py-3">UTS</th>
        <th className="px-4 py-3">UAS</th>
        <th className="px-2 py-3">Nilai</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
      {mahasiswa.map((m) => (
        <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150">
          <td className="px-2 py-3 font-medium">{m.name}</td>
          <td className="px-2 py-3">{kehadiran[m.id] ?? 0}</td>
          {['tugas', 'uts', 'uas'].map((field) => (
            <td key={field} className="px-3 py-2">
              <input
                type="number"
                className="w-20 px-2 py-1 rounded-md text-center border border-gray-300 dark:border-neutral-600 bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
                value={formState[m.id]?.[field as 'tugas' | 'uts' | 'uas'] ?? 0}
                onChange={(e) => handleChange(m.id, field as 'tugas' | 'uts' | 'uas', parseInt(e.target.value || '0'))}
                min={0}
                max={100}
              />
            </td>
          ))}
          <td className="px-1 py-3 font-medium text-gray-900 dark:text-white">
            {existing[m.id]?.nilai ?? '-'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

              <div className="text-right mt-3">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition-all duration-200 shadow-md"
                >
                  Simpan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

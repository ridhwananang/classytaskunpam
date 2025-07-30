import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Jadwal {
  id: number;
  nama_matkul: string;
}

export default function CreatePertemuan() {
  const { jadwals, flash } = usePage().props as unknown as {
    jadwals: Jadwal[];
    flash?: { success?: string };
  };

  const { data, setData, post, processing, errors } = useForm({
    jadwal_id: '',
    topik: '',
    waktu_dibuka: '',
    waktu_ditutup: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('pertemuan.store'), {
      onSuccess: () => {
        setShowModal(true);
        setData({
          jadwal_id: '',
          topik: '',
          waktu_dibuka: '',
          waktu_ditutup: '',
        });
      },
    });
  };

  return (
    <AppLayout>
<div className="min-h-[calc(100vh-1px)] px-4 py-12 bg-gray-100 dark:bg-neutral-900 transition-colors flex flex-col justify-start overflow-y-auto">
{/* <div className="min-h-screen px-4 py-8 md:py-12 bg-gray-100 dark:bg-neutral-900 transition-colors flex flex-col justify-start"> */}


    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-800 text-black dark:text-white p-3 md:p-5 shadow-xl rounded-2xl relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center">Buat Pertemuan Baru</h1>

          {flash?.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-700 dark:text-white rounded-lg">
              {flash.success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block font-semibold mb-1">Pilih Jadwal</label>
              <select
                value={data.jadwal_id}
                onChange={(e) => setData('jadwal_id', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 dark:text-white border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              >
                <option value="">-- Pilih Jadwal --</option>
                {jadwals.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.nama_matkul}
                  </option>
                ))}
              </select>
              {errors.jadwal_id && <p className="text-red-500 text-sm mt-1">{errors.jadwal_id}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Topik (Opsional)</label>
              <input
                type="text"
                value={data.topik}
                onChange={(e) => setData('topik', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 dark:text-white border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Waktu Dibuka</label>
              <input
                type="datetime-local"
                value={data.waktu_dibuka}
                onChange={(e) => setData('waktu_dibuka', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 dark:text-white border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
              {errors.waktu_dibuka && <p className="text-red-500 text-sm mt-1">{errors.waktu_dibuka}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Waktu Ditutup</label>
              <input
                type="datetime-local"
                value={data.waktu_ditutup}
                onChange={(e) => setData('waktu_ditutup', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 dark:text-white border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
              {errors.waktu_ditutup && <p className="text-red-500 text-sm mt-1">{errors.waktu_ditutup}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              {processing ? 'Membuat...' : 'Buat Pertemuan'}
            </button>
          </form>
        </div>
      </div>

      {/* Modal Sukses */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
              ✅ Pertemuan berhasil dibuat!
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Pertemuan sudah aktif sesuai waktu yang ditentukan.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

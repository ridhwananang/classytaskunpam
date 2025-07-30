import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import AddUser from '@/components/add-user';
import AddJadwal from '@/components/add-jadwal';

type ActiveView = 'user' | 'tugas' | 'jadwal' | null;

type Kelas = {
  id: number;
  nama_kelas: string;
};

type Mahasiswa = {
  id: number;
  nim: string;
  name: string;
  email: string;
  kelas_id: number;
};
type Jadwal = {
  id: number;
  nama_matkul: string;
  dosen?: {
    name: string;
  };
  ruang: string;
  hari: string;
  waktu_mulai: string;
  waktu_selesai: string;
  sks: number;
  whatsapp: string;
  kelas: {
    nama_kelas: string;
  };
};

interface Props {
  auth: any;
  kelasList: Kelas[];
  mahasiswaList: Mahasiswa[];
  dosenList: { id: number; name: string }[];
  title: string;
  jadwalList:Jadwal[];
}

const AdminDashboardPage: React.FC<Props> = ({ title }) => {
const [activeView, setActiveView] = useState<ActiveView>(null);
const { auth, kelasList, mahasiswaList, jadwalList, dosenList } = usePage().props as unknown as Props;
const user = auth?.user;
  return (
    <AppLayout>
      <Head title={title} />
      <div className="p-4 space-y-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4">
          <button
            onClick={() => setActiveView('user')}
            className="px-4 py-2 text-white bg-orange-600 hover:bg-blue-700 rounded-lg shadow transition"
          >
            + Tambah User
          </button>
          {user?.role !== 'kelasAdmin' && (
            <button
              onClick={() => setActiveView('jadwal')}
              className="px-4 py-2 text-white bg-orange-500 hover:bg-purple-700 rounded-lg shadow transition"
            >
              + Tambah Jadwal
            </button>
          )}

          <button
            onClick={() => setActiveView('tugas')}
            className="px-4 py-2 text-white bg-orange-400 hover:bg-green-700 rounded-lg shadow transition"
          >
            + Tambah Tugas
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {activeView === 'user' && (
            <AddUser auth={auth} kelasList={kelasList} mahasiswaList={mahasiswaList} />
          )}

            {activeView === 'jadwal' && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Form Jadwal</h2>
                <AddJadwal kelasList={kelasList} jadwalList={jadwalList} dosenList={dosenList} />
              </div>
            )}

            {activeView === 'tugas' && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Form Tugas</h2>
                <p className="text-gray-600 dark:text-gray-400">Coming Soon...</p>
              </div>
            )}
          
            {!activeView && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Silakan pilih tombol di atas untuk menampilkan formulir yang diinginkan.
                </p>
              </div>
            )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboardPage;

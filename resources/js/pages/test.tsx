import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import '../css/test.css';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface Tugas {
  id: number;
  nama_tugas: string;
  deskripsi: string;
  deadline: string;
}

interface DashboardProps {
  tugasCount: number;
  forumCount: number;
  mahasiswaCount: number;
  recentTugas: Tugas[];
}

export default function Dashboard() {
    const { tugasCount, forumCount, mahasiswaCount, recentTugas } = usePage<{ tugasCount: number; forumCount: number; mahasiswaCount: number; recentTugas: Tugas[] }>()
    .props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex flex-col gap-6 p-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Selamat datang kembali di Classy Task</p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-orange-600 p-6 text-white shadow-md">
            <h2 className="text-lg font-semibold">Tugas</h2>
            <p className="mt-2 text-3xl font-bold">{tugasCount}</p>
          </div>
          <div className="rounded-lg bg-orange-400 p-6 text-white shadow-md">
            <h2 className="text-lg font-semibold">Forum</h2>
            <p className="mt-2 text-3xl font-bold">{forumCount}</p>
          </div>
          <div className="rounded-lg bg-purple-500 p-6 text-white shadow-md">
            <h2 className="text-lg font-semibold">Mahasiswa</h2>
            <p className="mt-2 text-3xl font-bold">{mahasiswaCount}</p>
          </div>
        </div>

        {/* Tugas Terbaru */}
       

      </div>
    </AppLayout>
  );
}

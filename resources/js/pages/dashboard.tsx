import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import InstallButton from '../components/InstallButton';
import { FaCrown } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface Mahasiswa {
  id: number;
  name: string;
  nim: string;
  kelas_id: number;
  kelas: {
    id: number;
    nama_kelas: string;
  };
  is_online: boolean;
  role: string;
}

interface Semester {
  id: number;
  name: string;
  nim: string;
  kelas_id: number;
  kelas: {
    id: number;
    nama_kelas: string;
  };
  is_online: boolean;
}

interface Tugas {
  id: number;
  nama_tugas: string;
  deskripsi: string;
  deadline: string;
  kelas_id: number;
  kelas: {
    id: number;
    nama_kelas: string;
  };
  categori_id: number;
  categori: {
    id: number;
    nama_categori: string;
  };
  jadwal_id: number;
}

interface Jadwal {
  id: number;
  mata_kuliah: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  kelas_id: number;
  kelas: {
    id: number;
    nama_kelas: string;
  };
}

export default function Dashboard() {
  const props = usePage().props;
  const mahasiswa = props.mahasiswa as Mahasiswa[] ?? [];
  const tugas = props.tugas as Tugas[] ?? [];
  const semester = props.semester as Semester[] ?? [];
  const jadwal = props.jadwal as Jadwal[] ?? [];

  return (
    <AppLayout>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-3">

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mahasiswa */}
          <div className="group bg-[#006359] text-white rounded-tr-3xl rounded-bl-lg p-6 shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-[#F9F200] p-3 rounded-full text-3xl text-[#006359] shadow-md">🎓</div>
              <div>
                <h2 className="text-lg font-semibold">Mahasiswa</h2>
                <p className="text-3xl font-bold mt-1">{mahasiswa.length}</p>
              </div>
            </div>
          </div>

          {/* Tugas */}
          {/* <div className="group bg-gradient-to-br from-[#F9F200] to-yellow-300 text-[#006359] rounded-bl-3xl p-6 shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg text-3xl shadow-inner">📚</div>
              <div>
                <h2 className="text-lg font-semibold">Tugas</h2>
                <p className="text-3xl font-bold mt-1">{tugas.length}</p>
              </div>
            </div>
          </div> */}

          {/* Forum */}
          {/* <div className="group bg-white text-[#006359] border-2 border-[#F9F200] rounded-tl-[2rem] p-6 shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-[#F9F200] p-3 rounded-br-2xl text-3xl shadow-md">💬</div>
              <div>
                <h2 className="text-lg font-semibold">Forum</h2>
                <p className="text-3xl font-bold mt-1">{semester.length}</p>
              </div>
            </div>
          </div> */}

          {/* Jadwal */}
          <div className="group bg-gradient-to-tr from-[#006359] via-emerald-600 to-[#006359] text-white rounded-r-[3rem] p-6 shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-white text-[#006359] p-3 rounded-t-full text-3xl shadow-md">📆</div>
              <div>
                <h2 className="text-lg font-semibold">Jadwal</h2>
                <p className="text-3xl font-bold mt-1">{jadwal.length}</p>
              </div>
            </div>
          </div> 
        </div>

        {/* Tabel Mahasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 p-1 bg-white dark:bg-zinc-900 min-h-screen">
          <div className="col-span-7 rounded-2xl p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-center text-3xl font-extrabold text-[#006359] dark:text-yellow-400 mb-6">
              Daftar User
            </h2>

            <div className="space-y-4">
              {mahasiswa.length > 0 ? (
                mahasiswa.map((mhs, index) => (
                  <div
                    key={mhs.id}
                    className={`flex items-center justify-between rounded-xl p-4 shadow hover:shadow-md transition-transform hover:scale-[1.01] ${
                      index % 2 === 0
                        ? 'bg-[#f5f5f5] dark:bg-zinc-700'
                        : 'bg-yellow-50 dark:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#006359] text-white flex items-center justify-center font-bold text-lg select-none">
                        {mhs.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </div>
                      <div>
                        <p className="text-zinc-800 dark:text-white font-semibold text-lg flex flex-wrap items-center gap-1">
                          {mhs.name}

                          {/* Badge Role */}
                          <span className={`
                            ml-2 px-2 py-0.5 text-xs rounded-md font-semibold inline-flex items-center gap-1
                            ${
                              mhs.role === 'admin'
                                ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white'
                                : mhs.role === 'kelasAdmin'
                                ? 'bg-yellow-200 text-yellow-800'
                                : mhs.role === 'mahasiswa'
                                ? 'bg-green-200 text-green-800'
                                : mhs.role === 'dosen'
                                ? 'bg-purple-200 text-purple-800'
                                : 'bg-gray-200 text-gray-800'
                            }
                          `}>
                            {mhs.role === 'admin' && <FaCrown className="text-yellow-300" />}
                            {mhs.role === 'admin'
                              ? 'Super Admin'
                              : mhs.role === 'kelasAdmin'
                              ? 'Ketua Kelas'
                              : mhs.role === 'mahasiswa'
                              ? 'Mahasiswa'
                              : mhs.role === 'dosen'
                              ? 'Dosen'
                              : mhs.role}
                          </span>

                          {/* Badge Kelas (khusus admin) */}
                          {mhs.role === 'admin' && mhs.kelas?.nama_kelas && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold inline-flex items-center gap-1 bg-blue-100 text-blue-800 border border-blue-300">
                              <HiCheckCircle className="text-blue-500 w-3 h-3" />
                              {mhs.kelas.nama_kelas}
                            </span>
                          )}
                        </p>
                        <span className="text-xs text-zinc-500 dark:text-zinc-300">
                          NIM: {mhs.nim}
                        </span>
                      </div>
                    </div>

                    {/* <div className="flex items-center gap-2">
                      {mhs.is_online ? (
                        <>
                          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-green-600 dark:text-green-400 text-sm font-medium select-none">
                            Online
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-3 h-3 rounded-full bg-gray-400" />
                          <span className="text-gray-500 dark:text-gray-300 text-sm select-none">
                            Offline
                          </span>
                        </>
                      )}
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-red-500 font-semibold py-8">
                  Tidak ada data mahasiswa.
                </p>
              )}
            </div>
          </div>

          <div className="col-span-3 hidden md:block">
            {/* Kosongkan atau isi konten tambahan */}
          </div>
        </div>

        {/* Navigasi Eksternal */}
        <div className="grid auto-rows-min gap-3 md:grid-cols-3">
          {[
            { href: "https://event.unpam.ac.id/", img: "img/ems.png", alt: "EMS" },
            { href: "https://my.unpam.ac.id/", img: "img/logounpam.png", alt: "Unpam" },
            { href: "https://mentari.unpam.ac.id/", img: "img/mentari.png", alt: "Mentari" },
          ].map(({ href, img, alt }, index) => (
            <div
              key={index}
              className="border border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-2xl bg-white dark:bg-gray-900 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:ring-2 ring-primary/50 hover:rotate-1"
            >
              <a href={href} className="w-full h-full flex justify-center items-center">
                <img
                  src={img}
                  alt={alt}
                  className={`object-contain grayscale hover:grayscale-0 transition-all duration-300
                    ${alt === "EMS" || alt === "Mentari" ? "max-h-34 max-w-70" : "max-h-40 max-w-40"}`}
                />
              </a>
              <InstallButton />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface Jadwal {
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
  kelas: { id: number; nama_kelas: string };
}

interface PageProps {
  jadwals: Jadwal[];

  
  [key: string]: unknown;
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    alert('Nomor WhatsApp disalin!');
  } catch {
    alert('Gagal menyalin nomor WhatsApp.');
  }
  document.body.removeChild(textArea);
}

export default function Jadwal() {
  const { jadwals } = usePage<PageProps>().props;
const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }

      const interval = setInterval(() => {
        const now = new Date();
        const hariIni = now.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
        const waktuSekarang = now.getHours() * 60 + now.getMinutes();

        jadwals.forEach((jadwal) => {
          const jadwalHari = jadwal.hari.toLowerCase();
          if (hariIni !== jadwalHari) return;

          const [jamMulai, menitMulai] = jadwal.waktu_mulai.split(':').map(Number);
          const waktuJadwal = jamMulai * 60 + menitMulai;
          const selisihMenit = waktuJadwal - waktuSekarang;

          const key = `notified-${jadwal.id}-${hariIni}`;
          if (selisihMenit === 30 && !localStorage.getItem(key)) {
            new Notification(`🕒 30 Menit Lagi: ${jadwal.nama_matkul}`, {
              body: `Kelas bersama ${jadwal.dosen?.name} dimulai pukul ${jadwal.waktu_mulai.slice(0, 5)}.`,
              icon: '/icon.png',
            });
            localStorage.setItem(key, 'true');
          }

          if (selisihMenit < -1) {
            localStorage.removeItem(key);
          }
        });
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [jadwals]);

  return (
    <AppLayout>
      <Head title="Jadwal" />

      <div className="px-2 py-3 max-w-screen">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-3 w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            📘 Jadwal Perkuliahan
          </h1>

          <div className="overflow-x-auto rounded-xl shadow-md scrollbar-hide">
  <table className="min-w-[1000px] w-full text-sm text-center text-gray-700 dark:text-gray-200">
    <thead className="bg-slate-300 dark:bg-neutral-800 text-slate-700 dark:text-white uppercase tracking-wide text-sm font-semibold">
      <tr>
        <th className="px-4 py-4">Mata Kuliah</th>
        <th className="px-4 py-4">Dosen</th>
        <th className="px-4 py-4">Ruang</th>
        <th className="px-4 py-4">Hari</th>
        <th className="px-4 py-4">Mulai</th>
        <th className="px-4 py-4">Selesai</th>
        <th className="px-4 py-4">SKS</th>
        <th className="px-4 py-4">WhatsApp</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
      {jadwals.length === 0 ? (
        <tr>
          <td colSpan={8} className="text-center py-6 text-gray-500 dark:text-gray-400">
            Tidak ada data jadwal.
          </td>
        </tr>
      ) : (
        jadwals.map((jadwal) => (
          <tr key={jadwal.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150">
            <td className="px-4 py-4 font-medium">{jadwal.nama_matkul}</td>
            <td className="px-4 py-4">{jadwal.dosen?.name || '-'}</td>
            <td className="px-4 py-4">{jadwal.ruang}</td>
            <td className="px-4 py-4 capitalize">{jadwal.hari}</td>
            <td className="px-4 py-4">{jadwal.waktu_mulai}</td>
            <td className="px-4 py-4">{jadwal.waktu_selesai}</td>
            <td className="px-4 py-4">{jadwal.sks}</td>
          <td className="px-4 py-4">
  {jadwal.whatsapp ? (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 justify-center">
      <div className="flex items-center gap-1">
        <FaWhatsapp className="text-green-500 text-base" />
        <a
          href={`https://wa.me/${jadwal.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 break-all"
        >
          {jadwal.whatsapp}
        </a>
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(jadwal.whatsapp)
            .then(() => {
              setCopiedId(jadwal.id);
              setTimeout(() => setCopiedId(null), 2000);
            })
            .catch(() => fallbackCopyTextToClipboard(jadwal.whatsapp));
        }}
        className={`text-xs px-2 py-[2px] rounded-md border transition whitespace-nowrap ${
          copiedId === jadwal.id
            ? 'bg-green-200 text-green-800 border-green-400'
            : 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300'
        }`}
      >
        {copiedId === jadwal.id ? 'Tersalin ✅' : 'Salin'}
      </button>
    </div>
  ) : (
    <span className="text-gray-400 italic">Tidak ada</span>
  )}
</td>

          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


        </div>
      </div>
    </AppLayout>
  );
}

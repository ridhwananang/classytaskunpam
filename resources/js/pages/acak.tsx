// import { useState } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';

// export default function Forum() {
//     return (
//         <AppLayout>
//             <Head title="fORUM" />
//             <div className="p-4">
//                 <h1 className="text-sm font-bold mb-4">Daftar Tugas</h1>
               
                
//             </div>
//         </AppLayout>
//     );
// }
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

// Definisikan tipe User sesuai dengan yang diharapkan
interface User {
  id: number;
  name: string;
  nim: string;
}

export default function Acak() {
  const { users } = usePage().props;

  // Cek jika users undefined atau tidak ada isinya
  if (!users || !Array.isArray(users) || users.length === 0) {
    return (
      <AppLayout>
        <Head title="Acak Mahasiswa" />
        <div className="p-4">
          <h1 className="text-lg font-bold mb-4">Fitur Acak Nama Mahasiswa</h1>
          <p className="text-red-500">Tidak ada data mahasiswa.</p>
        </div>
      </AppLayout>
    );
  }

  // State untuk menyimpan nama terpilih, tipe didefinisikan sebagai User atau null
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menjalankan proses acak gacha
  const startGacha = () => {
    setIsLoading(true);
    let currentIndex = 0;

    // Set interval untuk mengganti nama secara acak
    const interval = setInterval(() => {
      currentIndex = Math.floor(Math.random() * users.length);
      setSelectedUser(users[currentIndex]);
    }, 100); // Ganti nama setiap 100ms untuk efek acak

    // Setelah 3 detik, hentikan interval dan pilih nama secara acak
    setTimeout(() => {
      clearInterval(interval);
      setSelectedUser(users[Math.floor(Math.random() * users.length)]);
      setIsLoading(false);
    }, 3000); // Durasi gacha 3 detik
  };

  return (
    <AppLayout>
      <Head title="Acak Mahasiswa" />
      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Fitur Acak Nama Mahasiswa</h1>

        {/* Tombol untuk memulai gacha */}
        <button
          onClick={startGacha}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        >
          Mulai Gacha
        </button>

        {/* Menampilkan proses gacha */}
        {isLoading ? (
          <div className="text-center text-xl font-bold">
            Sedang mengacak...
          </div>
        ) : (
          <div className="text-center text-xl font-bold">
            {selectedUser ? `${selectedUser.name} - ${selectedUser.nim}` : 'Klik untuk mulai'}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

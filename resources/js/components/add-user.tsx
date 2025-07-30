import { useForm, usePage, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState, useMemo, FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
  nim: string;
  name: string;
  email: string;
  kelas_id: number;
  role: string;
  password: string;
  password_confirmation: string;
};

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

interface Props {
  auth: any;
  kelasList: Kelas[];
  mahasiswaList: Mahasiswa[];
}

export default function AddUser({ auth, kelasList, mahasiswaList }: Props) {
  const role = auth?.user?.role;
  const isKelasAdmin = role === 'kelasAdmin';
  const isSuperAdmin = role === 'admin';

  const defaultKelasId = isKelasAdmin ? auth?.user?.kelas_id ?? 0 : 0;

  const [filterKelasId, setFilterKelasId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMahasiswaId, setSelectedMahasiswaId] = useState<number | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
    nim: '',
    name: '',
    email: '',
    kelas_id: defaultKelasId,
    role: isKelasAdmin ? 'mahasiswa' : '',
    password: '',
    password_confirmation: '',
  });

  const { props } = usePage();
  const flash = props?.flash as { success?: string; error?: string } | undefined;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setModalMessage('❌ ' + Object.values(errors).join('\n'));
      setShowModal(true);
    }
  }, [errors]);

  useEffect(() => {
    if (flash?.success) {
      setModalMessage(flash.success);
      setShowModal(true);
    } else if (flash?.error) {
      setModalMessage(flash.error);
      setShowModal(true);
    }
  }, [flash]);

  const filteredMahasiswa = useMemo(() => {
    if (!Array.isArray(mahasiswaList)) return [];
    if (filterKelasId === 0) return mahasiswaList;
    return mahasiswaList.filter((m) => m.kelas_id === filterKelasId);
  }, [mahasiswaList, filterKelasId]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/adduser', {
      onSuccess: () => {
        setModalMessage('✅ User berhasil ditambahkan!');
        setShowModal(true);
        reset();
      },
      onError: () => {
        setModalMessage('❌ Gagal menambahkan user. Periksa data!');
        setShowModal(true);
      },
    });
  };

  const openDeleteModal = (id: number) => {
    setSelectedMahasiswaId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMahasiswaId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedMahasiswaId) {
      router.delete(`/mahasiswa/${selectedMahasiswaId}`, {
        preserveScroll: true,
        onFinish: closeDeleteModal,
      });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Form Tambah User */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Tambah User</h2>

        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nim" className="dark:text-white">NIM</Label>
              <Input
                id="nim"
                value={data.nim}
                maxLength={12}
                onChange={(e) => setData('nim', e.target.value)}
                placeholder="NIM"
                className="bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
              />
              <InputError message={errors.nim} />
            </div>

            <div>
              <Label htmlFor="name" className="dark:text-white">Nama</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Nama"
                className="bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
              />
              <InputError message={errors.name} />
            </div>

            <div>
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="email@example.com"
                className="bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
              />
              <InputError message={errors.email} />
            </div>

            {isSuperAdmin && (
              <div>
                <Label htmlFor="kelas_id" className="dark:text-white">Kelas</Label>
                <select
                  id="kelas_id"
                  value={data.kelas_id}
                  onChange={(e) => setData('kelas_id', Number(e.target.value))}
                  className="border rounded-md p-2 w-full bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
                >
                  <option value={0}>Pilih Kelas</option>
                  {kelasList.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.nama_kelas}
                    </option>
                  ))}
                </select>
                <InputError message={errors.kelas_id} />
              </div>
            )}

            <div>
              <Label htmlFor="password" className="dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Password"
                className="bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
              />
              <InputError message={errors.password} />
            </div>

            <div>
              <Label htmlFor="password_confirmation" className="dark:text-white">Konfirmasi Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Konfirmasi Password"
                className="bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
              />
              <InputError message={errors.password_confirmation} />
            </div>

            {isSuperAdmin && (
              <div>
                <Label htmlFor="role" className="dark:text-white">Role</Label>
                <select
                  id="role"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="border rounded-md p-2 w-full bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
                >
                  <option value="">Pilih Role</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="kelasAdmin">Admin Kelas</option>
                  <option value="dosen">Dosen</option>
                  <option value="admin">Super Admin</option>
                </select>
                <InputError message={errors.role} />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Tambah User
          </Button>
        </form>

        {/* Modal Notifikasi */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl w-80 text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Info</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full bg-primary text-white dark:text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Hapus Mahasiswa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-sm text-center shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Hapus Mahasiswa</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Yakin ingin menghapus mahasiswa ini?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daftar Mahasiswa */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-800 rounded-xl shadow p-4 space-y-4">
        
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Daftar Mahasiswa</h3>
          {isSuperAdmin && (
          <div className="flex items-center gap-2">
            <label htmlFor="filterKelas" className="text-sm text-gray-700 dark:text-gray-300">Filter Kelas:</label>
            <select
              id="filterKelas"
              value={filterKelasId}
              onChange={(e) => setFilterKelasId(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-neutral-900 text-gray-800 dark:text-white"
            >
              <option value={0}>Semua Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>
          </div>
           )}
        </div>
        <div className="max-h-96 overflow-y-auto border dark:border-neutral-700 rounded-lg p-2 bg-gray-50 dark:bg-neutral-900">
          {filteredMahasiswa.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Tidak ditemukan data.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
              {filteredMahasiswa.map((mhs) => (
                <li
                  key={mhs.id}
                  className="bg-white dark:bg-neutral-800 rounded-md shadow-sm px-4 py-2 flex justify-between items-center border dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <div>
                    <p className="font-medium">{mhs.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{mhs.nim}</p>
                  </div>
                  <button
                    onClick={() => openDeleteModal(mhs.id)}
                    className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 text-xs font-semibold px-2 py-1 rounded transition"
                    title="Hapus Mahasiswa"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

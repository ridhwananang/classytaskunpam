import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

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
  kelas: {
    nama_kelas: string;
  };
}

interface Props {
  kelasList: { id: number; nama_kelas: string }[];
  dosenList: { id: number; name: string }[];
  jadwalList?: Jadwal[];
}

const AddJadwal: React.FC<Props> = ({ kelasList, jadwalList, dosenList }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_matkul: '',
    dosen_id: '',
    ruang: '',
    hari: '',
    waktu_mulai: '',
    waktu_selesai: '',
    sks: '',
    whatsapp: '',
    kelas_id: '',
  });

  const [selectedToDelete, setSelectedToDelete] = useState<Jadwal | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.jadwal.store'), {
      onSuccess: () => reset(),
    });
  };

  const confirmDelete = () => {
    if (selectedToDelete) {
      router.delete(route('admin.jadwal.destroy', selectedToDelete.id), {
        onSuccess: () => setSelectedToDelete(null),
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Form Input Jadwal */}
      <div className="w-full md:w-1/2 bg-white dark:bg-neutral-700 p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tambah Jadwal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Matkul"
            type="text"
            value={data.nama_matkul}
            onChange={(e) => setData('nama_matkul', e.target.value)}
            error={errors.nama_matkul}
            placeholder="Contoh: Pemrograman Web"
          />
          <div className="flex flex-col">
  <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Dosen Pengampu</label>
  <select
    value={data.dosen_id}
    onChange={(e) => setData('dosen_id', e.target.value)}
    className={`p-2 rounded-lg border ${
      errors.dosen_id ? 'border-red-500' : 'border-gray-300'
    } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-neutral-900 dark:text-white dark:border-gray-700`}
  >
    <option value="">Pilih Dosen</option>
    {dosenList.map((dosen) => (
      <option key={dosen.id} value={dosen.id}>
        {dosen.name}
      </option>
    ))}
  </select>
  {errors.dosen_id && <span className="text-sm text-red-500 mt-1">{errors.dosen_id}</span>}
</div>

          <InputField
            label="Ruang"
            type="text"
            value={data.ruang}
            onChange={(e) => setData('ruang', e.target.value)}
            error={errors.ruang}
            placeholder="Contoh: R202"
          />
          <InputField
            label="Hari"
            type="text"
            value={data.hari}
            onChange={(e) => setData('hari', e.target.value)}
            error={errors.hari}
            placeholder="Contoh: Senin"
          />
          <InputField
            label="Waktu Mulai"
            type="datetime-local"
            value={data.waktu_mulai}
            onChange={(e) => setData('waktu_mulai', e.target.value)}
            error={errors.waktu_mulai}
          />
          <InputField
            label="Waktu Selesai"
            type="datetime-local"
            value={data.waktu_selesai}
            onChange={(e) => setData('waktu_selesai', e.target.value)}
            error={errors.waktu_selesai}
          />
          <InputField
            label="SKS"
            type="number"
            value={data.sks}
            onChange={(e) => setData('sks', e.target.value)}
            error={errors.sks}
            placeholder="Contoh: 3"
          />
          <InputField
            label="No. WhatsApp"
            type="text"
            value={data.whatsapp}
            onChange={(e) => setData('whatsapp', e.target.value)}
            error={errors.whatsapp}
            placeholder="Contoh: +6281234567890"
          />
          {/* Dropdown Kelas */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Kelas</label>
            <select
              value={data.kelas_id}
              onChange={(e) => setData('kelas_id', e.target.value)}
              className={`p-2 rounded-lg border ${
                errors.kelas_id ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-neutral-900 dark:text-white dark:border-gray-700`}
            >
              <option value="">Pilih Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>
            {errors.kelas_id && <span className="text-sm text-red-500 mt-1">{errors.kelas_id}</span>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Jadwal */}
      <div className="w-full md:w-1/2 bg-white dark:bg-neutral-700 p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Daftar Jadwal</h2>
        {(jadwalList?.length ?? 0) === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Belum ada jadwal.</p>
        ) : (
          jadwalList?.map((jadwal) => (
            <div
              key={jadwal.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{jadwal.nama_matkul}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{jadwal.dosen?.name}</p>
                </div>
                <button
  onClick={() => setSelectedToDelete(jadwal)}
  className="px-3 py-1 text-xs font-semibold rounded-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
  title="Hapus jadwal"
>
  Hapus
</button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {selectedToDelete && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Yakin ingin menghapus jadwal ini?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {selectedToDelete.nama_matkul} - {selectedToDelete.dosen?.name}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedToDelete(null)}
                className="px-4 py-2 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJadwal;

// 🔁 Reusable Input Field
interface InputProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputProps> = ({ label, type, value, onChange, error, placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-300'
      } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-neutral-900 dark:text-white dark:border-gray-700`}
    />
    {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
  </div>
);

import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Props {
  user_id: number;
  pertemuan_id: number;
  errors: {
    pertemuan_id?: string;
    status?: string;
  };
}

export default function Edit({ user_id, pertemuan_id, errors }: Props) {
  const { data, setData, post, processing } = useForm({
    pertemuan_id: pertemuan_id,
    status: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/absensi/update/${user_id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Update Kehadiran Mahasiswa</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden pertemuan_id yang dikontrol oleh useForm */}
          <input
            type="hidden"
            name="pertemuan_id"
            value={data.pertemuan_id}
            onChange={(e) => setData('pertemuan_id', Number(e.target.value))}
          />

          {/* Status Kehadiran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Kehadiran
            </label>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="hadir"
                  checked={data.status === 'hadir'}
                  onChange={(e) => setData('status', e.target.value)}
                />
                <span className="ml-1">Hadir</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="tidak_hadir"
                  checked={data.status === 'tidak_hadir'}
                  onChange={(e) => setData('status', e.target.value)}
                />
                <span className="ml-1">Tidak Hadir</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1">{errors.status}</p>
            )}
          </div>

          {errors.pertemuan_id && (
            <p className="text-sm text-red-600">{errors.pertemuan_id}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

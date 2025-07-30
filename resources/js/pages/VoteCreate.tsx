import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function VoteCreate() {
  const { data, setData, post, processing, errors } = useForm({
    judul: '',
    deskripsi: '',
    deadline: '',
    options: [''],
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...data.options];
    newOptions[index] = value;
    setData('options', newOptions);
  };

  const addOption = () => {
    setData('options', [...data.options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = data.options.filter((_, i) => i !== index);
    setData('options', newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/vote');
  };

  return (
    <AppLayout>
      <div className="p-6 w-full mx-auto">
        {/* Card Judul */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Buat Voting Baru</h1>
        </div>

        {/* Card Form */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Judul */}
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Judul</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 dark:bg-neutral-900 dark:text-white dark:border-gray-700"
                value={data.judul}
                onChange={(e) => setData('judul', e.target.value)}
              />
              {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul}</p>}
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Deskripsi</label>
              <textarea
                className="w-full border rounded px-3 py-2 dark:bg-neutral-900 dark:text-white dark:border-gray-700"
                value={data.deskripsi}
                onChange={(e) => setData('deskripsi', e.target.value)}
              />
              {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Deadline</label>
              <input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 dark:bg-neutral-900 dark:text-white dark:border-gray-700"
                value={data.deadline}
                onChange={(e) => setData('deadline', e.target.value)}
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
            </div>

            {/* Opsi Voting */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Opsi Voting</label>
              {data.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Opsi ${index + 1}`}
                    className="flex-1 border rounded px-3 py-2 dark:bg-neutral-900 dark:text-white dark:border-gray-700"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {data.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:text-red-800 font-bold text-lg"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                + Tambah Opsi
              </button>
              {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options}</p>}
              {(errors as any)['options.0'] && (
                <p className="text-red-500 text-sm mt-1">{(errors as any)['options.0']}</p>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Menyimpan...' : 'Buat Voting'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

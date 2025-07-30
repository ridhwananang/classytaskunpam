// import React from 'react';
// import { Link, useForm } from '@inertiajs/react';
// import { PageProps } from '@/types';

// interface ForumItem {
//   id: number;
//   judul: string;
//   user: { name: string };
//   created_at: string;
// }

// export default function ForumPage({ forumList }: PageProps<{ forumList: ForumItem[] }>) {
//   const { data, setData, post, processing, reset } = useForm({
//     judul: '',
//     isi: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     post(route('forum.store'), {
//       onSuccess: () => reset(),
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Forum Diskusi</h1>

//       <form onSubmit={handleSubmit} className="space-y-3 mb-6">
//         <input
//           type="text"
//           className="w-full border p-2 rounded"
//           placeholder="Judul forum"
//           value={data.judul}
//           onChange={(e) => setData('judul', e.target.value)}
//           required
//         />
//         <textarea
//           className="w-full border p-2 rounded"
//           placeholder="Isi diskusi..."
//           value={data.isi}
//           onChange={(e) => setData('isi', e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           disabled={processing}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Buat Forum
//         </button>
//       </form>

//       <div className="space-y-4">
//         {forumList.map((forum) => (
//           <div key={forum.id} className="bg-white shadow p-4 rounded">
//             <Link href={route('forum.show', forum.id)} className="text-xl font-semibold text-blue-600 hover:underline">
//               {forum.judul}
//             </Link>
//             <p className="text-sm text-gray-500">
//               oleh {forum.user.name} - {new Date(forum.created_at).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { FaCrown } from 'react-icons/fa';

interface ForumItem {
  id: number;
  slug: string;
  judul: string;
  isi?: string;
  user: {
    name: string;
    role: string;
    kelas?: {
      nama_kelas?: string;
    };
  };
  created_at: string;
}

interface Kelas {
  id: number;
  nama_kelas: string;
}

interface User {
  name: string;
  role: 'admin' | 'kelasAdmin' | 'mahasiswa' | 'dosen'; // atau string kalau dinamis
  kelas?: {
    nama_kelas?: string;
  };
  
}

interface Props {
  forumList: ForumItem[];
  auth: {
    user: User;
  };
  kelasList: Kelas[];
}


export default function ForumPage({ auth, forumList, kelasList }: Props)

 {
  const { data, setData, post, processing, reset } = useForm({
    judul: '',
    isi: '',
    kelas_id: '',
  });

  const [editId, setEditId] = React.useState<number | null>(null);
  const [editJudul, setEditJudul] = React.useState('');
  const [editIsi, setEditIsi] = React.useState('');
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('forum.store'), {
      onSuccess: () => reset('judul', 'isi', 'kelas_id'),
    });
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('forum.destroy', deleteId), {
        onSuccess: () => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }
      });
    }
  };

  const handleEdit = (forum: ForumItem) => {
    setEditId(forum.id);
    setEditJudul(forum.judul);
    setEditIsi(forum.isi || '');
  };

  const handleUpdate = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    router.put(route('forum.update', id), {
      judul: editJudul,
      isi: editIsi,
    }, {
      onSuccess: () => {
        setEditId(null);
      }
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white inline-flex items-center gap-1">
            <FaCrown className="text-yellow-300" />
            Super Admin
          </span>
        );
      case 'kelasAdmin':
        return (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-yellow-200 text-yellow-800">
            Ketua Kelas
          </span>
        );
      case 'mahasiswa':
        return (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-green-200 text-green-800">
            Mahasiswa
          </span>
        );
      case 'dosen':
        return (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-purple-200 text-purple-800">
            Dosen
          </span>
        );
      default:
        return (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-gray-200 text-gray-800">
            {role}
          </span>
        );
    }
  };
const canEditForum = (forum: ForumItem): boolean => {
  const currentUser = auth.user;

  // Admin bisa edit semua forum
  if (currentUser.role === 'admin') return true;

  // Forum milik admin tidak bisa diedit user biasa
  if (forum.user.role === 'admin') return false;

  // User biasa bisa edit forum miliknya sendiri
  return (
    currentUser.name === forum.user.name &&
    ['kelasAdmin', 'mahasiswa'].includes(currentUser.role)
  );
};

  return (
    <AppLayout>
      <Head title="Forum Diskusi" />
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-xl p-3 mb-3 border border-gray-200 dark:border-neutral-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Forum Diskusi
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              {auth.user.role === 'dosen' && (
                <select
                  value={data.kelas_id}
                  onChange={(e) => setData('kelas_id', e.target.value)}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                >
                  <option value="">Pilih Kelas</option>
                  {kelasList.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.nama_kelas}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Judul forum"
                value={data.judul}
                onChange={(e) => setData('judul', e.target.value)}
                required
              />
              <textarea
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Isi diskusi..."
                value={data.isi}
                onChange={(e) => setData('isi', e.target.value)}
                rows={4}
                required
              />
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buat Forum
              </button>
            </form>

            {/* List Forum */}
            <div className="space-y-5">
              {forumList.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Belum ada forum.</p>
              ) : (
                forumList.map((forum) =>
                  editId === forum.id ? (
                    <form
                      key={forum.id}
                      onSubmit={(e) => handleUpdate(e, forum.id)}
                      className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md space-y-3"
                    >
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={editJudul}
                        onChange={(e) => setEditJudul(e.target.value)}
                        required
                      />
                      <textarea
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={editIsi}
                        onChange={(e) => setEditIsi(e.target.value)}
                        rows={4}
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          Simpan
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      key={forum.id}
                      className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md hover:shadow-xl transition-all"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center flex-wrap">
                        oleh
                        {forum.user ? (
                          <>
                            <span className="ml-1 font-medium text-gray-800 dark:text-white">
                              {forum.user.name}
                            </span>
                            {getRoleBadge(forum.user.role)}
                            {auth.user.role === 'admin' && forum.user.kelas?.nama_kelas && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-md font-semibold bg-indigo-100 text-indigo-800">
                                {forum.user.kelas.nama_kelas}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="ml-1 font-medium text-gray-400 dark:text-gray-500 italic">
                            (User tidak ditemukan)
                          </span>
                        )}
                      </p>

                      <p>
                        <Link
                          href={route('forum.show', forum.slug)}
                          className="text-xl font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-all"
                        >
                          {forum.judul}
                        </Link>
                      </p>

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(forum.created_at).toLocaleString()}
                      </span>

{canEditForum(forum) && (
  <div className="mt-3 flex gap-2">
    <button
      onClick={() => handleEdit(forum)}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(forum.id)}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
    >
      Hapus
    </button>
  </div>
)}

                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-neutral-700">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Apakah kamu yakin ingin menghapus forum ini?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

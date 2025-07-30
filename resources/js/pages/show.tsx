// import React from 'react';
// import { useForm } from '@inertiajs/react';
// import { PageProps } from '@/types';

// interface Comment {
//   id: number;
//   isi: string;
//   created_at: string;
//   user: {
//     name: string;
//   };
// }

// interface ForumData {
//   id: number;
//   judul: string;
//   isi: string;
//   created_at: string;
//   user: {
//     name: string;
//   };
//   comments: Comment[];
// }

// export default function Show({ forum }: PageProps<{ forum: ForumData }>) {
//   const { data, setData, post, processing, reset } = useForm({
//     isi: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     post(route('comments.store', forum.id), {
//       onSuccess: () => reset(),
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 space-y-6">
//       <div className="bg-white shadow p-4 rounded">
//         <h2 className="text-2xl font-bold">{forum.judul}</h2>
//         <p className="text-gray-600 mb-2">oleh {forum.user.name} - {new Date(forum.created_at).toLocaleString()}</p>
//         <p>{forum.isi}</p>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow space-y-3">
//         <textarea
//           className="w-full border rounded p-2"
//           placeholder="Tulis komentar..."
//           value={data.isi}
//           onChange={(e) => setData('isi', e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           disabled={processing}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Kirim Komentar
//         </button>
//       </form>

//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold">Komentar:</h3>
//         {forum.comments.length === 0 ? (
//           <p className="text-gray-500">Belum ada komentar.</p>
//         ) : (
//           forum.comments.map((comment) => (
//             <div key={comment.id} className="border border-gray-200 p-3 rounded">
//               <p className="text-sm text-gray-700 mb-1">{comment.user.name} - {new Date(comment.created_at).toLocaleString()}</p>
//               <p>{comment.isi}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// =================================================================================================
// import React from 'react';
// import { Head, useForm } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { PageProps } from '@/types';

// interface Comment {
//   id: number;
//   isi: string;
//   created_at: string;
//   user: {
//     name: string;
//   };
// }

// interface ForumData {
//   id: number;
//   judul: string;
//   isi: string;
//   created_at: string;
//   user: {
//     name: string;
//   };
//   comments: Comment[];
// }

// export default function Show({ auth, forum }: PageProps<{ forum: ForumData }>) {
//   const { data, setData, post, processing, reset } = useForm({
//     isi: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     post(route('comments.store', forum.id), {
//       onSuccess: () => reset(),
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title={forum.judul} />
//       <div className="py-6">
//         <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
//           <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
//             <p className="text-gray-600 dark:text-gray-400 mb-2">
//                {forum.user.name} - {new Date(forum.created_at).toLocaleString()}
//             </p>
//             <p className="text-gray-900 dark:text-white">{forum.isi}</p>
//           </div>

         {/* ================================== */}

          {/* <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Komentar:</h3>
            {forum.comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Belum ada komentar.</p>
            ) : (
              forum.comments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 dark:border-gray-700 p-3 rounded">
                  <p className="text-sm text-orange-700 dark:text-gray-400 mb-1">
                    {comment.user.name} - {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-800 dark:text-white">{comment.isi}</p>
                </div>
              ))
            )}
          </div> */}

          {/* =============================================== */}

{/* <div className="space-y-3">
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Komentar:</h3>

  {forum.comments.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">Belum ada komentar.</p>
  ) : (
    forum.comments.map((comment) => (
      <div
        key={comment.id}
        className="border border-gray-200 dark:border-gray-700 p-3 rounded flex gap-3 items-start"
      >
        {/* Avatar inisial */}
        // <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        //   {comment.user.name
        //     .split(' ')
        //     .map((n) => n[0])
        //     .join('')
        //     .slice(0, 2)
        //     .toUpperCase()}
        // </div> 

        {/* Konten komentar */}
  //       <div>
  //         <p className="text-sm font-bold text-orange-700 dark:text-gray-400 mb-1">
  //           {comment.user.name} - {new Date(comment.created_at).toLocaleString()}
  //         </p>
  //         <p className="text-gray-800 dark:text-white">{comment.isi}</p>
  //       </div>
  //     </div>
  //   ))
  // )}
// </div> 

  //         <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow space-y-3">
  //           <textarea
  //             className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
  //             placeholder="Tulis komentar..."
  //             value={data.isi}
  //             onChange={(e) => setData('isi', e.target.value)}
  //             required
  //           />
  //           <button
  //             type="submit"
  //             disabled={processing}
  //             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  //           >
  //             Kirim Komentar
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </AppLayout>
  // );
// }

import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { route } from 'ziggy-js';
import { FaCrown } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi'; // Import icon centang biru
import { ArrowLeft } from 'lucide-react'; // atau pakai icon lain jika sudah tersedia


interface Comment {
  id: number;
  isi: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    role: string;
    kelas?: {
      nama_kelas: string;
    };
  };
}

interface ForumData {
  id: number;
  judul: string;
  isi: string;
  created_at: string;
  user: {
    name: string;
    role: string;
    kelas?: {
      nama_kelas: string;
    };
  };
  comments: Comment[];
}

export default function Show({ auth, forum }: PageProps<{ forum: ForumData }>) {
  const { data, setData, post, processing, reset } = useForm<{ isi: string }>({ isi: '' });
  const [editingCommentId, setEditingCommentId] = React.useState<number | null>(null);
  const [editContent, setEditContent] = React.useState('');
const [showDeleteModal, setShowDeleteModal] = React.useState(false);
const [commentToDelete, setCommentToDelete] = React.useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('comments.store', forum.id), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.isi);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  const updateComment = () => {
    if (!editingCommentId) return;
    router.put(route('comments.update', editingCommentId), {
      isi: editContent,
    }, {
      preserveScroll: true,
      onSuccess: cancelEditing,
    });
  };

  const deleteComment = (id: number) => {
  setCommentToDelete(id);
  setShowDeleteModal(true);
};
const confirmDeleteComment = () => {
  if (commentToDelete !== null) {
    router.delete(route('comments.destroy', commentToDelete), {
      preserveScroll: true,
      onSuccess: () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
      }
    });
  }
};


  const getRoleBadge = (role: string) => (
    <span
      className={`text-xs px-2 py-0.5 font-semibold rounded-md inline-flex items-center gap-1
        ${
          role === 'admin'
            ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white'
            : role === 'kelasAdmin'
            ? 'bg-yellow-200 text-yellow-800'
            : role === 'mahasiswa'
            ? 'bg-green-200 text-green-800'
            : role === 'dosen'
            ? 'bg-purple-200 text-purple-800'
            : 'bg-gray-200 text-gray-800'
        }
      `}
    >
      {role === 'admin' && <FaCrown className="text-yellow-300" />}
      {role === 'admin'
        ? 'Super Admin'
        : role === 'kelasAdmin'
        ? 'Ketua Kelas'
        : role === 'mahasiswa'
        ? 'Mahasiswa'
        : role === 'dosen'
        ? 'Dosen'
        : role}
    </span>
  );

 const getKelasBadge = (nama_kelas?: string) => {
  if (!nama_kelas) return null;

  return (
    <span className="text-xs px-2 py-0.5 font-semibold rounded-md inline-flex items-center gap-1 bg-blue-100 text-blue-800 border border-blue-300">
      <HiCheckCircle className="text-blue-500 text-sm" />
      {nama_kelas}
    </span>
  );
};

  return (
    <AppLayout>
      <Head title={forum.judul} />

      <div className="py-6">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
<div className="bg-white dark:bg-neutral-900 shadow-sm rounded-xl p-3 mb-3 border border-gray-200 dark:border-neutral-700">
  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
    Forum Diskusi
  </h1>
</div>
          {/* Forum Section */}
          <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-xl border dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{forum.user.name}</span>
              {getRoleBadge(forum.user.role)}
              {forum.user.role === 'admin' && getKelasBadge(forum.user.kelas?.nama_kelas)}
             
            </p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{forum.judul}</h2>
            <div className="text-gray-800 dark:text-white whitespace-pre-line mt-2">{forum.isi}</div>
             <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(forum.created_at).toLocaleString()}
              </span>
          </div>

          {/* Komentar Section */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-6">
<h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
  Komentar
  <span className="inline-block text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
    {forum.comments.length}
  </span>
</h3>


            {/* Daftar Komentar */}
            <div className="space-y-4">
              {forum.comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Belum ada komentar.</p>
              ) : (
                forum.comments.map((comment) => {
                  const isOwner = auth.user.id === comment.user.id || auth.user.role === 'admin';

                  return (
                    <div
                      key={comment.id}
                      className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4"
                    >
                      {/* Avatar */}
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {comment.user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      {/* Komentar Konten */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {comment.user.name}
                              </span>
                              {getRoleBadge(comment.user.role)}
                              {comment.user.role === 'admin' && getKelasBadge(comment.user.kelas?.nama_kelas)}
                            </div>
                            
                          </div>

                          
                        </div>

                        {/* Isi Komentar */}
                        {editingCommentId === comment.id ? (
                          <div className="space-y-2 mt-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={updateComment}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-800 dark:text-white whitespace-pre-line mt-2 break-words break-all">
  {comment.isi}
</p>

                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comment.created_at).toLocaleString()}
                            </span>
                        {isOwner && editingCommentId !== comment.id && (
                            <div className="flex gap-2 text-xs mt-3">
                              <span
                                onClick={() => startEditing(comment)}
                                className="cursor-pointer inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                              >
                                Edit
                              </span>
                              <span
                                onClick={() => deleteComment(comment.id)}
                                className="cursor-pointer inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                              >
                                Hapus
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
 

            {/* Form Komentar Baru */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                className="w-full border rounded p-2 dark:bg-gray-900 dark:text-white"
                placeholder="Tulis komentar..."
                value={data.isi}
                onChange={(e) => setData('isi', e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Kirim Komentar
              </button>
                         <button
  onClick={() => router.visit(route('forum.index'))}
  className="mb-4 ml-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
>
  <ArrowLeft className="w-4 h-4" />
  Kembali ke Forum
</button>
            </form>

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
        Apakah kamu yakin ingin menghapus komentar ini?
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition"
        >
          Batal
        </button>
        <button
          onClick={confirmDeleteComment}
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

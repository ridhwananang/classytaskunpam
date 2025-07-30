import { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function VoteIndex({ votes, now, auth }: any) {
  const currentTime = new Date(now);
  const user = auth.user;

  const [showModal, setShowModal] = useState(false);
  const [voteToDelete, setVoteToDelete] = useState<number | null>(null);

  const openModal = (id: number) => {
    setVoteToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setVoteToDelete(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (voteToDelete !== null) {
      router.delete(`/vote/${voteToDelete}`, {
        onFinish: () => closeModal(),
      });
    }
  };

  const getVoteById = (id: number) => votes.find((v: any) => v.id === id);

  return (
    <AppLayout>
      <Head title="Voting" />

      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Daftar Voting</h1>
        </div>

        {votes.length === 0 && (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 shadow text-sm">
            Belum ada voting yang tersedia.
          </div>
        )}

        {votes.map((vote: any) => {
          const deadline = new Date(vote.deadline);
          const isClosed = currentTime > deadline;

          return (
            <div
              key={vote.id}
              className="p-4 border bg-white dark:bg-neutral-800 rounded-xl shadow-sm space-y-2"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{vote.judul}</h2>

              <p className="text-sm text-gray-600 flex items-center gap-2">
                Deadline:
                <span className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-0.5 rounded-full shadow-sm">
                  {deadline.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
                </span>
              </p>

              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{vote.deskripsi}</p>

              <p className="text-sm mt-2 flex items-center gap-1">
                {isClosed ? (
                  <span className="text-red-600">🔒 Voting telah ditutup</span>
                ) : (
                  <span className="text-green-600">🟢 Voting masih dibuka</span>
                )}
              </p>

              {isClosed && vote.top_option && vote.upvotes_count > 0 && (
  <div className="mt-2 text-sm">
    <p className="font-medium text-gray-600 dark:text-gray-300">Hasil voting:</p>
    <div className="ml-4 mt-2">
      <span className="inline-block rounded bg-green-100 text-green-800 text-base font-semibold px-3 py-1 shadow-sm">
        {vote.top_option.label}
      </span>
      <span className="ml-2 text-gray-600">({vote.upvotes_count} suara)</span>
    </div>
  </div>
)}


              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/vote/${vote.id}`}
                  className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                >
                  {isClosed ? 'Lihat Hasil' : 'Ikut Voting'}
                </Link>

                {user?.role !== 'mahasiswa' && (
                  <button
                    onClick={() => openModal(vote.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    🗑️ Hapus
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h2>
            <p>
              Apakah Anda yakin ingin menghapus voting{' '}
              <span className="font-semibold text-red-700">
                "{getVoteById(voteToDelete!)?.judul}"
              </span>{' '}
              ?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

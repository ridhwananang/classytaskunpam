import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';

type Flash = {
  vote_success?: boolean;
  voted_by?: string;
  option_label?: string;
  error?: string;
};

type UserVote = {
  option_id: number;
  type: 'up' | 'down';
};

export default function VoteShow({
  vote,
  now,
  user_vote,
  top_option,
}: {
  vote: any;
  now: string;
  user_vote?: UserVote;
  top_option?: any;
}) {
  const { flash = {} }: { flash?: Flash } = usePage().props as { flash?: Flash };
  const [showModal, setShowModal] = useState(false);

  const currentTime = new Date(now);
  const deadline = new Date(vote.deadline);
  const isClosed = deadline < currentTime;
  const hasVoted = !!user_vote;

  useEffect(() => {
    if (flash.vote_success) setShowModal(true);
  }, [flash.vote_success]);

  useEffect(() => {
    if (flash.error) alert(flash.error);
  }, [flash.error]);

  const handleModalClose = () => {
    setShowModal(false);
    router.visit('/vote');
  };

  const voteHandler = (optionId: number, type: 'up' | 'down') => {
    if (isClosed || hasVoted) return;

    router.visit(`/vote-result`, {
      method: 'post',
      data: {
        vote_id: vote.id,
        option_id: optionId,
        type,
      },
      preserveScroll: true,
      preserveState: false,
    });
  };

  return (
    <AppLayout>
      <div className="w-full max-w-2xl mx-auto my-8 bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6 md:p-8 space-y-6 border border-gray-200 dark:border-neutral-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{vote.judul}</h1>
        <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-line">{vote.deskripsi}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🗓️ Deadline:{' '}
          {deadline.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
        </p>

        {/* Voting State */}
        {!isClosed && hasVoted ? (
          <div className="space-y-3">
            {vote.options.map((option: any) => {
              const isSelected = user_vote?.option_id === option.id;
              return (
                <div
                  key={option.id}
                  className="flex items-center justify-between border rounded-md px-4 py-2 bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-gray-700"
                >
                  <span className="text-gray-800 dark:text-white">{option.label}</span>
                  {isSelected && (
                    <span className="text-xs text-green-500 font-medium ml-2">
                      ✔️ Anda memilih ini
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : !isClosed ? (
          <div className="space-y-3">
            {vote.options.map((option: any) => (
              <div
                key={option.id}
                className="flex items-center justify-between border rounded-md px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 transition border-gray-300 dark:border-gray-700"
              >
                <span className="text-gray-800 dark:text-white">{option.label}</span>
                <button
                  onClick={() => voteHandler(option.id, 'up')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                  👍
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-100/10 text-yellow-700 dark:text-yellow-300 p-4 rounded-md border border-yellow-200 dark:border-yellow-400">
            <p className="font-semibold mb-2 text-center">📌 Voting ditutup.</p>
          </div>
        )}

        {/* Result */}
        {isClosed && (
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-4">
            <p className="font-semibold mb-1">📊 Hasil voting:</p>
            {vote.options.every((opt: any) => (opt.results_count || 0) === 0) ? (
              <p className="text-gray-500 dark:text-gray-400 italic">Belum ada suara yang masuk.</p>
            ) : (
              <>
                <ul className="pl-5 space-y-1">
                  {vote.options.map((option: any) => (
                    <li key={option.id} className="list-disc">
                      {option.label}: {option.results_count || 0} suara
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p>
                    ✅ Hasil terpilih:{' '}
                    <strong className="text-blue-700 dark:text-blue-400">
                      {top_option || 'Belum ada pilihan'}
                    </strong>
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
          <button
            onClick={() => router.visit('/vote')}
            className={`px-4 py-2 rounded text-white transition font-medium ${
              isClosed
                ? 'bg-blue-500 hover:bg-blue-600'
                : hasVoted
                ? 'bg-gray-500 hover:bg-gray-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isClosed || hasVoted ? 'Kembali ke Daftar Voting' : 'Ikut Voting'}
          </button>
        </div>

        {/* Modal Sukses Vote */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg text-center space-y-3 max-w-sm w-full">
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Vote Berhasil!</h2>
              <p className="text-gray-700 dark:text-gray-200">
                Terima kasih telah memilih opsi{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {flash.option_label}
                </span>
                !
              </p>
              {flash.voted_by && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Voted by: <strong>{flash.voted_by}</strong>
                </p>
              )}
              <button
                onClick={handleModalClose}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

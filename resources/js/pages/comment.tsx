import { useState } from "react";

interface Comment {
  id: number;
  user: { name: string };
  komentar: string;
}

interface CommentProps {
  discussionId: number;
  comments: Comment[];
  onAddComment: (komentar: string) => void;
  onDeleteComment: (id: number) => void;
}

const Comment = ({ discussionId, comments, onAddComment, onDeleteComment }: CommentProps) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError("");

    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (err) {
      setError("Gagal menambahkan komentar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus komentar ini?");
    if (confirmDelete) {
      onDeleteComment(id);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Komentar</h3>

      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

      {comments.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada komentar.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-start"
            >
              <p className="text-gray-800 text-sm mb-2 sm:mb-0">
                <span className="font-medium text-blue-600">{comment.user.name}</span>:{" "}
                {comment.komentar}
              </p>
              <button
                className="text-red-500 text-sm hover:underline transition"
                onClick={() => handleDelete(comment.id)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          placeholder="Tambahkan komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          disabled={loading}
        >
          {loading ? "Menambah..." : "Tambah"}
        </button>
      </form>
    </div>
  );
};

export default Comment;

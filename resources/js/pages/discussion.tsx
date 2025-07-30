import { useState, useEffect } from "react";
import Comment from "./comment";

interface Discussion {
  id: number;
  judul: string;
  deskripsi: string;
  user: { name: string };
  comments: { id: number; user: { name: string }; komentar: string }[];
}

const Discussion = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const kelasId = 1; // Ganti dengan ID kelas yang sesuai

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/discussion/${kelasId}`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        setDiscussions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  const addDiscussion = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/discussion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kelas_id: kelasId, judul: newTitle, deskripsi: newDescription }),
      });
      if (!response.ok) throw new Error("Gagal menambahkan diskusi");
      const newDiscussion = await response.json();
      setDiscussions([...discussions, newDiscussion.discussion]);
      setNewTitle("");
      setNewDescription("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscussion = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus diskusi ini?")) return;
    try {
      const response = await fetch(`/discussion/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Gagal menghapus diskusi");
      setDiscussions(discussions.filter((d) => d.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addComment = async (discussionId: number, komentar: string) => {
    try {
      const response = await fetch(`/comment/${discussionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ komentar }),
      });
      if (!response.ok) throw new Error("Gagal menambahkan komentar");
      const { comment } = await response.json();
      setDiscussions(discussions.map((d) =>
        d.id === discussionId ? { ...d, comments: [...d.comments, comment] } : d
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteComment = async (discussionId: number, commentId: number) => {
    try {
      const response = await fetch(`/comment/${commentId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Gagal menghapus komentar");
      setDiscussions(discussions.map((d) =>
        d.id === discussionId ? { ...d, comments: d.comments.filter((c) => c.id !== commentId) } : d
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Forum Kelas</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Form Tambah Diskusi */}
      <div className="mb-4 p-4 border rounded-lg shadow">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Judul Diskusi"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Deskripsi Diskusi"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 w-full rounded"
          onClick={addDiscussion}
          disabled={loading}
        >
          {loading ? "Menambah..." : "Tambah Diskusi"}
        </button>
      </div>

      {/* Daftar Diskusi */}
      {loading && <p>Memuat diskusi...</p>}
      {discussions.length === 0 && !loading && <p>Tidak ada diskusi.</p>}
      {discussions.map((discussion) => (
        <div key={discussion.id} className="border p-4 mb-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">{discussion.judul}</h3>
          <p>{discussion.deskripsi}</p>
          <small className="text-gray-500">Oleh: {discussion.user.name}</small>
          <button
            className="text-red-500 hover:underline ml-4"
            onClick={() => deleteDiscussion(discussion.id)}
          >
            Hapus
          </button>

          {/* Komentar */}
          <Comment
            discussionId={discussion.id}
            comments={discussion.comments}
            onAddComment={(komentar) => addComment(discussion.id, komentar)}
            onDeleteComment={(commentId) => deleteComment(discussion.id, commentId)}
          />
        </div>
      ))}
    </div>
  );
};

export default Discussion;

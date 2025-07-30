import { useState } from "react";
import AppLayout from "@/layouts/app-layout";

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      const res = await fetch("/GenerateImage", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN":
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: formData,
        credentials: "same-origin",
      });

      const data = await res.json();

      if (data.url) {
        if (data.url?.startsWith("http")) {
          setImageUrl(data.url);
        } else if (data.url?.startsWith("iVBOR") || data.url?.length > 1000) {
          setImageUrl(`data:image/png;base64,${data.url}`);
        } else {
          setImageUrl("");
        }
      } else {
        alert("Gagal generate gambar:\n" + JSON.stringify(data.raw || data.error, null, 2));
      }
    } catch (error) {
      alert("Terjadi error saat generate gambar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-center py-10 px-4">
        <div className="bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
             Generate Your Image with Classy of Magic
          </h1>

          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Contoh: Ilustrasi mahasiswa belajar kolaboratif di ruang kelas modern"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm mb-4 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white placeholder:text-gray-500"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Sedang membuat gambar..." : "✨ Generate Gambar"}
          </button>

          {imageUrl && (
            <div className="mt-6 text-center">
              <img
                src={imageUrl}
                alt="Hasil dari AI"
                className="rounded-xl shadow-lg border max-w-full mx-auto"
              />
              <a
                href={imageUrl}
                download="gambar-ai.png"
                className="inline-block mt-4 text-blue-600 hover:underline text-sm"
              >
                ⬇️ Download Gambar
              </a>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

import React from 'react';
import route from 'ziggy-js';

export default function MahasiswaExcel() {
// Fungsi untuk membuka URL download Excel di tab baru
const handleDownloadExcel = () => {
window.open(route('export.mahasiswa'), '_blank');
};

return (
<div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Halaman Export Mahasiswa Excel
    </h1>
    <div className="flex justify-center">
        <button onClick={handleDownloadExcel}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
            type="button">
            Download Excel
        </button>
    </div>
</div>
);
}

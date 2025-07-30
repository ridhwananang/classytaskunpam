import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Jadwal {
    id: number;
    nama_matkul: string;
}

interface Mahasiswa {
    id: number;
    name: string;
}

interface KelompokTugas {
    id: number;
    nama_kelompok: string;
    mahasiswa: Mahasiswa[];
}

interface Tugas {
    id: number;
    nama_tugas: string;
    deskripsi: string;
    deadline: string;
    status: 'Selesai' | 'Belum Selesai';
    jadwal?: Jadwal;
    kelompok_tugas?: KelompokTugas[];
}

export default function Tugas() {
    const { props } = usePage<{ tugas: Tugas[], kategori?: 'Individu' | 'Kelompok' }>();

    const [kategori, setKategori] = useState<'Individu' | 'Kelompok'>(
        props.kategori === 'Kelompok' ? 'Kelompok' : 'Individu'
    );

    const [selectedMatkul, setSelectedMatkul] = useState<string>('Semua');

    const [statusTugas, setStatusTugas] = useState(() =>
        props.tugas.reduce((acc, curr) => {
            acc[curr.nama_tugas] = curr.status;
            return acc;
        }, {} as Record<string, 'Selesai' | 'Belum Selesai'>)
    );

    const allMatkul = Array.from(
        new Set(props.tugas.map(t => t.jadwal?.nama_matkul).filter(Boolean))
    );

    const tugasFiltered = props.tugas.filter(t =>
        selectedMatkul === 'Semua' || t.jadwal?.nama_matkul === selectedMatkul
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric"
        }) + " - " + date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }) + " WIB";
    };

    const toggleStatus = (namaTugas: string) => {
        setStatusTugas(prev => ({
            ...prev,
            [namaTugas]: prev[namaTugas] === 'Selesai' ? 'Belum Selesai' : 'Selesai'
        }));
    };

    const badgeStatus = (status: string) => {
        return status === 'Selesai'
            ? <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">Selesai</span>
            : <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">Belum Selesai</span>;
    };

    const changeKategori = (newKategori: 'Individu' | 'Kelompok') => {
        if (newKategori !== kategori) {
            setKategori(newKategori);
            window.location.href = `/tugas?kategori=${newKategori}`;
        }
    };

    return (
        <AppLayout>
            <Head title="Tugas" />
            <div className="p-4 space-y-4">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:scale-[1.02] transition-transform duration-300 ease-in-out group border border-gray-200 dark:border-slate-700">
                <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-green-600 via-yellow-400 to-green-600 text-transparent bg-clip-text tracking-wide group-hover:opacity-90">
                    Daftar Tugas
                </h1>
            </div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="space-x-2">
                        <button
                            className={`px-4 py-2 rounded ${kategori === 'Individu' ? 'bg-emerald-300 text-white' : 'bg-[#006359]'}`}
                            onClick={() => changeKategori('Individu')}>
                            Individu
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${kategori === 'Kelompok' ? 'bg-emerald-300 text-white' : ' bg-[#006359]'}`}
                            onClick={() => changeKategori('Kelompok')}>
                            Kelompok
                        </button>
                    </div>
                    <select
                        className="border rounded px-3 py-2 text-sm"
                        value={selectedMatkul}
                        onChange={(e) => setSelectedMatkul(e.target.value)}
                    >
                        <option value="Semua">Semua Mata Kuliah</option>
                        {allMatkul.map(matkul => (
                            <option key={matkul} value={matkul}>{matkul}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tugasFiltered.length > 0 ? tugasFiltered.map(item => (
                        <div key={item.nama_tugas} className="bg-white p-4 rounded-xl shadow-md border space-y-2">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-[#006359]">{item.nama_tugas}</h2>
                                {badgeStatus(statusTugas[item.nama_tugas])}
                            </div>
                            <p className="text-sm text-gray-600"><strong>Mata Kuliah:</strong> {item.jadwal?.nama_matkul || '-'}</p>
                            <p className="text-sm text-gray-600"><strong>Deskripsi:</strong> {item.deskripsi}</p>
                            <p className="text-sm text-gray-600"><strong>Deadline:</strong> {formatDate(item.deadline)}</p>

                            {kategori === 'Kelompok' && item.kelompok_tugas?.map(k => (
                                <div key={k.id} className="bg-blue-50 p-2 rounded border border-blue-100">
                                    <p className="text-sm font-semibold">{k.nama_kelompok}</p>
                                    <ul className="list-disc ml-5 text-sm text-gray-700">
                                        {k.mahasiswa.map(m => <li key={m.id}>{m.name}</li>)}
                                    </ul>
                                </div>
                            ))}

                            <div className="flex flex-wrap gap-2 mt-2">
                                <button
                                    onClick={() => toggleStatus(item.nama_tugas)}
                                    className="bg-[#006359] hover:bg-green-800 text-white text-sm px-3 py-1 rounded"
                                >
                                    Tandai {statusTugas[item.nama_tugas] === 'Selesai' ? 'Belum Selesai' : 'Selesai'}
                                </button>
                                <button className="bg-[#F9F200] hover:bg-yellow-300 text-black text-sm px-3 py-1 rounded">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="italic text-gray-500">Tidak ada tugas tersedia</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

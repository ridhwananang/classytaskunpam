import React from 'react';

interface Tugas {
    nama_tugas: string;
    deskripsi: string;
    deadline: string;
    kelas: {
        nama_kelas: string;
    };
    category: {
        category: string;
    };
    jadwal: {
        nama_matkul: string;
    };
    kelompokTugas: {
        id: number;
        nama_kelompok: string;
        mahasiswa: {
            id: number;
            name: string;
        }[];
    }[];
}

interface Props {
    tugas: Tugas;
}

const Show: React.FC<Props> = ({ tugas }) => {
    return (
        <div>
            <h1>{tugas.nama_tugas}</h1>
            <p>{tugas.deskripsi}</p>
            <p>Deadline: {tugas.deadline}</p>
            <div>
                <h3>Kelas: {tugas.kelas.nama_kelas}</h3>
                <h3>Kategori: {tugas.category.category}</h3>
                <h3>Jadwal: {tugas.jadwal.nama_matkul}</h3>
            </div>
            {tugas.kelompokTugas && tugas.kelompokTugas.length > 0 && (
                <div>
                    <h3>Kelompok Tugas</h3>
                    <ul>
                        {tugas.kelompokTugas.map((kelompok) => (
                            <li key={kelompok.id}>
                                {kelompok.nama_kelompok}
                                <ul>
                                    {kelompok.mahasiswa.map((mahasiswa) => (
                                        <li key={mahasiswa.id}>{mahasiswa.name}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Show;

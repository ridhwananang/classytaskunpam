<h1>Detail Tugas</h1>
<p>Nama Tugas: {{ $tugas->nama_tugas }}</p>
<p>Deskripsi: {{ $tugas->deskripsi }}</p>
<p>Deadline: {{ $tugas->deadline }}</p>
<p>Kelas: {{ $tugas->kelas->nama_kelas }}</p>
<p>Kategori: {{ $tugas->category->name }}</p>
<p>Jadwal: {{ $tugas->jadwal->nama_matkul }}</p>

<h2>Kelompok Tugas</h2>
@foreach ($tugas->kelompokTugas as $kelompok)
    <p>{{ $kelompok->nama_kelompok }}</p>
    <ul>
        @foreach ($kelompok->mahasiswa as $mahasiswa)
            <li>{{ $mahasiswa->name }}</li>
        @endforeach
    </ul>
@endforeach

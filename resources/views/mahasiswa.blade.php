<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Mahasiswa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <h1>Daftar Mahasiswa Kelas {{ $mahasiswa->first()->kelas->nama_kelas ?? 'Tidak Ada Kelas' }}</h1>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIM</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($mahasiswa as $index => $mhs)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $mhs->name }}</td>
                    <td>{{ $mhs->nim }}</td>
                    <td></td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{-- <p class="total">Total Mahasiswa unpam: {{ $mahasiswa->count() }}</p> --}}
</body>

</html>

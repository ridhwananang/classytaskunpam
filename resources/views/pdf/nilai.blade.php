<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 40px;
            color: #333;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            text-transform: uppercase;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #666;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #e0e0e0;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:last-child {
            border-bottom: 2px solid #333;
        }
    </style>
</head>

<body>
    <h2>Rekap Nilai - {{ strtoupper($nama) }}</h2>

    <table>
        <thead>
            <tr>
                <th>Mata Kuliah</th>
                {{-- <th>Kelas</th> --}}
                <th>Tugas</th>
                <th>UTS</th>
                <th>UAS</th>
                <th>Kehadiran</th>
                <th>Nilai</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($rekap as $r)
                <tr>
                    <td>{{ $r->jadwal->nama_matkul ?? '-' }}</td>
                    {{-- <td>{{ $r->jadwal->kelas->nama_kelas ?? '-' }}</td> --}}
                    <td>{{ $r->tugas }}</td>
                    <td>{{ $r->uts }}</td>
                    <td>{{ $r->uas }}</td>
                    <td>{{ $r->kehadiran }}</td>
                    <td><strong>{{ $r->nilai }}</strong></td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">Tidak ada data nilai.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>

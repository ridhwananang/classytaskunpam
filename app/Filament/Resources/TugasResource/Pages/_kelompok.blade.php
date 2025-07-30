<div class="space-y-4">
    @foreach ($record->kelompokTugas as $kelompok)
        <div class="p-4 border rounded-lg bg-gray-50">
            <div class="font-semibold text-lg">{{ $kelompok->nama_kelompok }}</div>
            <div class="text-sm text-gray-700">
                Anggota:
                @if ($kelompok->mahasiswa->isNotEmpty())
                    <ul class="list-disc ml-5">
                        @foreach ($kelompok->mahasiswa as $mahasiswa)
                            <li>{{ $mahasiswa->name }}</li>
                        @endforeach
                    </ul>
                @else
                    <em>Tidak ada anggota</em>
                @endif
            </div>
        </div>
    @endforeach
</div>

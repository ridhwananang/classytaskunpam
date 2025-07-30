import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

type RegisterForm = {
    nim: string;
    name: string;
    email: string;
    kelas_id: number;
    role: string;
    password: string;
    password_confirmation: string;
};

type Kelas = {
    id: number;
    nama_kelas: string;
};

export default function AddUser({ auth }: PageProps<{ kelasList: Kelas[] }>) {
    const isKelasAdmin = auth.user.role === 'kelasAdmin';
    const kelasList = usePage<PageProps<{ kelasList: Kelas[] }>>().props.kelasList;

    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        nim: '',
        name: '',
        email: '',
        kelas_id: isKelasAdmin ? (auth.user.kelas_id ?? 0) : 0, // Ensure kelas_id is always a number
        role: isKelasAdmin ? 'mahasiswa' : 'mahasiswa',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/adduser', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout >
            <Head title="Tambah Mahasiswa" />

            <div className="max-w-xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Tambah User</h1>

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">

                        <div>
                            <Label htmlFor="nim">NIM</Label>
                            <Input
                                id="nim"
                                type="text"
                                maxLength={12}
                                value={data.nim}
                                onChange={(e) => setData('nim', e.target.value)}
                                disabled={processing}
                                placeholder="NIM"
                            />
                            <InputError message={errors.nim} />
                        </div>

                        <div>
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nama"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {!isKelasAdmin && (
                            <div>
                                <Label htmlFor="kelas_id">Kelas</Label>
                                <select
                                    id="kelas_id"
                                    value={data.kelas_id}
                                    onChange={(e) => setData('kelas_id', Number(e.target.value))}
                                    disabled={processing}
                                    className="border rounded-md p-2 w-full"
                                >
                                    <option value={0}>Pilih Kelas</option>
                                    {kelasList.map((kelas) => (
                                        <option key={kelas.id} value={kelas.id}>{kelas.nama_kelas}</option>
                                    ))}
                                </select>
                                <InputError message={errors.kelas_id} />
                            </div>
                        )}

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Konfirmasi Password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {!isKelasAdmin && (
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    disabled={processing}
                                    className="border rounded-md p-2 w-full"
                                >
                                    <option value="mahasiswa">Mahasiswa</option>
                                    <option value="kelasAdmin">Admin Kelas</option>
                                    <option value="admin">Super Admin</option>
                                </select>
                                <InputError message={errors.role} />
                            </div>
                        )}

                        <Button type="submit" className="mt-2 w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Tambah User
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

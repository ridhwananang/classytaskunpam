import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    nim: string;
    name: string;
    email: string;
    kelas_id: number;
    password: string;
    password_confirmation: string;
};

type Kelas = {
    id: number;
    nama_kelas: string;
};
// interface PageProps {
//     kelasList: Kelas[];
// }

export default function Register() {

    const { props } = usePage<{ kelasList: Kelas[] }>();

const kelasList = props.kelasList ?? [];

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nim: '',
        name: '',
        email: '',
        kelas_id: 0, 
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nim">NIM</Label>
                        <Input
                            id="nim"
                            type="text"
                            required
                            maxLength={12}
                            value={data.nim}
                            onChange={(e) => setData('nim', e.target.value)}
                            disabled={processing}
                            placeholder="Masukkan NIM"
                        />
                        <InputError message={errors.nim} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Masukkan Nama"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="kelas_id">Kelas</Label>
                        <select
                            id="kelas_id"
                            required
                            value={data.kelas_id}
                            onChange={(e) => setData('kelas_id', Number(e.target.value))}
                            disabled={processing}
                            className="border rounded-md p-2"
                        >
                            <option value="">Pilih Kelas</option>
                            {kelasList.map((kelas) => (
                                <option key={kelas.id} value={kelas.id}>{kelas.nama_kelas}</option>
                            ))}
                        </select>
                        <InputError message={errors.kelas_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Konfirmasi Password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Buat Akun
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Sudah punya akun?{' '}
                    <TextLink href={route('login')}>
                        Masuk
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

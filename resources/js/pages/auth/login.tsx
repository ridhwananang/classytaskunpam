// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// type LoginForm = {
//     nim: string;
//     password: string;
//     remember: boolean;
// };

// interface LoginProps {
//     status?: string;
//     canResetPassword: boolean;
// }

// export default function Login({ status, canResetPassword }: LoginProps) {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
//         nim: '',
//         password: '',
//         remember: false,
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <AuthLayout title="Log in to your account" description="Enter your NIM and password below to log in">
//             <Head title="Log in" />

//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="nim">NIM</Label>
//                         <Input
//                             id="nim"
//                             type="nim"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="nim"
//                             value={data.nim}
//                             onChange={(e) => setData('nim', e.target.value)}
//                             placeholder="1234567890"
//                         />
//                         <InputError message={errors.nim} />
//                     </div>

//                     <div className="grid gap-2">
//                         <div className="flex items-center">
//                             <Label htmlFor="password">Password</Label>
//                             {canResetPassword && (
//                                 <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
//                                     Forgot password?
//                                 </TextLink>
//                             )}
//                         </div>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={2}
//                             autoComplete="current-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="flex items-center space-x-3">
//                         <Checkbox
//                             id="remember"
//                             name="remember"
//                             checked={data.remember}
//                             onClick={() => setData('remember', !data.remember)}
//                             tabIndex={3}
//                         />
//                         <Label htmlFor="remember">Remember me</Label>
//                     </div>

//                     <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Log in
//                     </Button>
//                 </div>

//                 <div className="text-muted-foreground text-center text-sm">
//                     Don't have an account?{' '}
//                     <TextLink href={route('register')} tabIndex={5}>
//                         Sign up
//                     </TextLink>
//                 </div>
//             </form>

//             {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
//         </AuthLayout>
//     );
// }

// 


import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { LoaderCircle, Eye, EyeOff, Moon, Sun } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<{
    nim: string;
    password: string;
    remember: boolean;
  }>({
    nim: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head title="Masuk" />

      <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-zinc-900 transition-colors duration-500">
        {/* Left Section */}
        <div className="flex flex-col justify-center px-8 md:px-24 lg:px-32 relative">
          {/* Toggle Dark Mode */}
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 shadow transition"
              title="Toggle mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-zinc-700" />}
            </button>
          </div>

          <div className="w-full max-w-md mx-auto">
            {/* <img src="img/classyy.png" alt="Logo" className="h-14 mb-6" /> */}

            <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">Masuk</h1>
            <p className="text-zinc-600 dark:text-zinc-300 mb-8">Selamat datang di platform ClassyTask</p>

            {/* Alert Status */}
            {status && (
              <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700 dark:bg-green-800 dark:text-green-200 border border-green-300 dark:border-green-600">
                ✅ {status}
              </div>
            )}

<form onSubmit={submit} className="space-y-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 transition duration-300 border border-zinc-200 dark:border-zinc-700">
  {/* NIM */}
  <div className="space-y-2">
    <Label htmlFor="nim" className="text-gray-700 dark:text-gray-200 font-medium">NIM</Label>
    <Input
      id="nim"
      type="text"
      required
      autoFocus
      autoComplete="username"
      value={data.nim}
      onChange={(e) => setData('nim', e.target.value)}
      placeholder="Masukkan NIM anda"
      className="rounded-xl px-4 py-2 bg-zinc-50 dark:bg-zinc-700 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-[#006359] focus:outline-none"
    />
    <InputError message={errors.nim} />
  </div>

  {/* Password */}
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label htmlFor="password" className="text-gray-700 dark:text-gray-200 font-medium">Password</Label>
      {canResetPassword && (
        <TextLink href={route('password.request')} className="text-sm text-[#006359] hover:underline dark:text-[#F9F200]">
          Lupa kata sandi?
        </TextLink>
      )}
    </div>
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        required
        autoComplete="current-password"
        value={data.password}
        onChange={(e) => setData('password', e.target.value)}
        placeholder="********"
        className="rounded-xl px-4 py-2 bg-zinc-50 dark:bg-zinc-700 dark:text-white border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-[#006359] focus:outline-none"
      />
      <button
        type="button"
        className="absolute right-3 top-2.5 text-zinc-500 dark:text-zinc-300"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
    <InputError message={errors.password} />
  </div>

  {/* Checkbox */}
  <div className="flex items-center space-x-2">
    <Checkbox
      id="remember"
      checked={data.remember}
      onClick={() => setData('remember', !data.remember)}
    />
    <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">Ingat saya</Label>
  </div>

  {/* Tombol */}
  <Button
    type="submit"
    className="w-full flex items-center justify-center gap-2 bg-[#006359] hover:bg-[#004f46] text-white dark:bg-[#F9F200] dark:text-black dark:hover:bg-yellow-400 transition-all duration-300 py-2 rounded-xl font-semibold"
    disabled={processing}
  >
    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
    Masuk
  </Button>
</form>

            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                >
                <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400 hover:underline">
                    Belum punya akun? Hubungi ketua kelas
                </div>
            </a>


            <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200">
              <strong className="block mb-1">Sudah punya akun tapi tidak bisa login?</strong>
              Hubungi ketua kelas atau gunakan fitur lupa password.
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-slate-700 to-gray-700 relative">

          <div className="absolute inset-0 bg-[url('/images/bg-pattern.svg')] bg-cover bg-center opacity-10" />
          <div className="h-full flex items-center justify-center">
            <img src="img/classyy.png" alt="Logo" className="h-100 w-120 backdrop-opacity-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

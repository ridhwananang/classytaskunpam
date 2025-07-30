// import { type SharedData } from '@/types';
// import { Head, Link, usePage } from '@inertiajs/react';

// export default function Welcome() {
//     const { auth } = usePage<SharedData>().props;

//     return (
//         <>
//             <Head title="Welcome">
//                 <link rel="preconnect" href="https://fonts.bunny.net" />
//                 <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
//             </Head>
//             <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
               
//                 <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
//                     <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
//                         <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
//                             <h1 className="mb-1 font-medium text-2xl">Selamat datang di ClassyTask!</h1>
//                             <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
//                             Kelola tugas dan jadwal akademikmu dengan mudah. ClassyTask hadir sebagai asisten pribadi untuk membantumu mengingat deadline, mengatur tugas, dan tetap produktif dalam perjalanan studimu. Jangan biarkan tugas menumpuk—atur semuanya dengan lebih rapi dan efisien bersama ClassyTask!
//                             </p>
//                             <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
//                     <nav className="flex items-center justify-end gap-4">
//                         {auth.user ? (
//                             <Link
//                                 href={route('dashboard')}
//                                 className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
//                             >
//                                 Dashboard
//                             </Link>
//                         ) : (
//                             <>
//                                 <Link
//                                     href={route('login')}
//                                     className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
//                                 >
//                                     Log in
//                                 </Link>
//                                 {/* <Link
//                                     href={route('register')}
//                                     className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
//                                 >
//                                     Register
//                                 </Link> */}
//                             </>
//                         )}
//                     </nav>
//                 </header>
//                             {/* <ul className="mb-4 flex flex-col lg:mb-6">
//                                 <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
//                                     <span className="relative bg-white py-1 dark:bg-[#161615]">
//                                         <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
//                                             <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
//                                         </span>
//                                     </span>
//                                     <span>
//                                         Read the
//                                         <a
//                                             href="https://laravel.com/docs"
//                                             target="_blank"
//                                             className="ml-1 inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
//                                         >
//                                             <span>Documentation</span>
//                                             <svg
//                                                 width={10}
//                                                 height={11}
//                                                 viewBox="0 0 10 11"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 className="h-2.5 w-2.5"
//                                             >
//                                                 <path
//                                                     d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
//                                                     stroke="currentColor"
//                                                     strokeLinecap="square"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </span>
//                                 </li>
//                                 <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
//                                     <span className="relative bg-white py-1 dark:bg-[#161615]">
//                                         <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
//                                             <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
//                                         </span>
//                                     </span>
//                                     <span>
//                                         Watch video tutorials at
//                                         <a
//                                             href="https://laracasts.com"
//                                             target="_blank"
//                                             className="ml-1 inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
//                                         >
//                                             <span>Laracasts</span>
//                                             <svg
//                                                 width={10}
//                                                 height={11}
//                                                 viewBox="0 0 10 11"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 className="h-2.5 w-2.5"
//                                             >
//                                                 <path
//                                                     d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
//                                                     stroke="currentColor"
//                                                     strokeLinecap="square"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </span>
//                                 </li>
//                             </ul> */}
//                             {/* <ul className="flex gap-3 text-sm leading-normal">
//                                 <li>
//                                     <a
//                                         href="https://cloud.laravel.com"
//                                         target="_blank"
//                                         className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
//                                     >
//                                         Deploy now
//                                     </a>
//                                 </li>
//                             </ul> */}
//                         </div>
//                         <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#f10707f3] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                           
//                          {/* <h1 className='text-7xl font-bold text-amber-500 text-center flex items-center justify-center'>ClassyTask</h1> */}
                           
//                             <div className="flex items-center justify-center h-full">
//                                 <h1 className="text-7xl font-bold text-amber-300 text-center">ClassyTask</h1><br/>
//                                 {/* <h1 className="text-7xl font-bold text-amber-300 text-center">ClassyTask</h1> */}
//                             </div>
                           

//                             <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
//                         </div>
//                     </main>
//                 </div>
//                 <div className="hidden h-14.5 lg:block"></div>
//             </div>
//         </>
//     );
// }


import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import HeroSection from '@/components/HeroSection';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] lg:justify-center lg:p-8"> */}
                
                {/* NAVIGATION */}
                {/* <header className="w-full max-w-4xl mb-6">
                    <nav className="flex justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-orange-500 px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                        )}
                    </nav>
                </header> */}

                {/* MAIN CONTENT */}
                {/* <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row"> */}
                    
                    {/* LEFT CONTENT
                    <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                        <h1 className="mb-1 font-medium text-2xl">Selamat datang di <span className="text-amber-500">ClassyTask!</span></h1>
                        <p className="mb-4 text-[#706f6c] dark:text-[#A1A09A]">
                            Kelola tugas dan jadwal akademikmu dengan mudah. ClassyTask hadir sebagai asisten pribadi untuk membantumu mengingat deadline, mengatur tugas, dan tetap produktif dalam perjalanan studimu. Jangan biarkan tugas menumpuk—atur semuanya dengan lebih rapi dan efisien bersama ClassyTask!
                        </p>
                        <Link
                            href={auth.user ? route('dashboard') : route('login')}
                            className="mt-4 inline-block rounded-md bg-amber-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400"
                        >
                            {auth.user ? 'Lihat Dashboard' : 'Mulai Sekarang'}
                        </Link>
                    </div> */}

                    {/* RIGHT CONTENT */}
                    {/* <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#f10707f3] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                        <div className="flex h-full items-center justify-center p-6">
                            <h1 className="text-5xl lg:text-7xl font-bold text-amber-300 text-center">ClassyTask</h1>
                        </div>
                        <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                    </div>
                </main>
            </div> */}
            
            <Head title="welcome" />
            <HeroSection />
            {/* konten lainnya */}
        
        </>
    );
}

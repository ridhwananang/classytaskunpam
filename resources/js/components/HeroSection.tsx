import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
import { Link } from "@inertiajs/react";
import Footer from "@/components/footer";

// Hook animasi saat elemen in-view
function useInViewAnimation(): [React.RefObject<HTMLElement | null>, AnimationControls] {
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        controls.start({ opacity: 1, y: 0 });
        window.removeEventListener("scroll", onScroll); // Hapus listener setelah animasi
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll(); // Cek kondisi saat mount, jika elemen sudah terlihat
    return () => window.removeEventListener("scroll", onScroll); // Cleanup listener
  }, [controls]); // ref tidak perlu di dependency array karena stabil, onScroll didefinisikan di dalam effect

  return [ref, controls];
}

const edukasi = [
  { title: "Tips Manajemen Waktu", desc: "Bagi waktu belajar dan istirahat efektif."},
  { title: "Teknik Pomodoro", desc: "Metode Pomodoro untuk fokus maksimal." },
  { title: "Prioritaskan Tugas", desc: "Cara menentukan prioritas tugas dengan tepat." },
];

const testimonials = [
  { name: "Mas Titan Yang Ganteng", quote: "ClassyTask bantu aku atur deadline skripsi dengan gampang!" },
  { name: "Diana", quote: "Suka banget fitur reminder-nya, nggak pernah lupa tugas." },
  { name: "Sary", quote: "Tampilan simpel tapi powerfull, recommended!" },
  { name: "Aan, Fullstack Developer", quote: "Aplikasi ini saya buat lebih efisien dan mudah digunakan oleh teman-teman mahasiswa, saya bangga dapat berkolaborasi dengan teman-teman yang berkonstribusi dalam proyek development aplikasi ini." },
];

export default function HeroSection() {
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // testimonials.length tidak berubah, jadi dependency array kosong aman

  const [edukasiRef, edukasiControls] = useInViewAnimation();
  const [testiRef, testiControls] = useInViewAnimation();

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('/img/web.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 pointer-events-none z-0" />

        {/* Text */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
            <span className="bg-gradient-to-r from-teal-600 via-teal-300 to-teal-600 bg-clip-text text-transparent drop-shadow-md">
              Kelola Tugas dengan Mudah
            </span>
          </h1>
          <p className="text-zinc-200 mb-6 text-lg md:text-xl">
            ClassyTask bantu kamu tetap fokus, ingat jadwal, dan tak lagi panik soal deadline!
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-orange-700 hover:to-red-400 text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
          >
            🚀 Mulai Sekarang
          </Link>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute w-72 h-72 bg-[#118d81] rounded-full blur-3xl opacity-30 animate-pulse -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img
            src="img/classyy.png"
            alt="Task Illustration"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* EDUKASI SECTION */}
      <motion.section
        ref={edukasiRef as React.RefObject<HTMLElement>}
        initial={{ opacity: 0, y: 50 }}
        animate={edukasiControls}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-center"
      >
        {edukasi.map(({ title, desc }, i) => (
          <a
            key={i}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold mb-3 text-teal-700 dark:text-[#F9F200]">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-300 flex-grow">{desc}</p>
            {/* <span className="mt-4 inline-block text-sm text-green-700 hover:text-green-900 font-semibold">
              Baca Selengkapnya →
            </span> */}
          </a>
        ))}
      </motion.section>

      {/* TESTIMONIAL SECTION */}
      <motion.section
        ref={testiRef}
        initial={{ opacity: 0, y: 40 }}
        animate={testiControls}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg text-center relative mb-16"
      >
        <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-[#F9F200]">Apa Kata Mereka?</h2>
        <p className="italic text-zinc-700 dark:text-zinc-300 mb-4">"{testimonials[testiIndex].quote}"</p>
        <span className="font-semibold text-green-700 dark:text-green-400">
          — {testimonials[testiIndex].name}
        </span>

        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === testiIndex ? "bg-[#F9F200]" : "bg-zinc-300 dark:bg-zinc-600"
              }`}
              onClick={() => setTestiIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </motion.section>
      {/* CTA SECTION */}
      {/* <section className="bg-gradient-to-r from-teal-600 to-teal-400 text-white py-5 px-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ridhwan Anang Ma'ruf</h2>
        <p className="mb-2">Fullstack Developer</p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-white text-teal-700 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          Mulai Sekarang
        </Link>
      </section> */}
      <Footer />
    </>
  );
}
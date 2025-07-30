import React from 'react';
import { Link } from '@inertiajs/react';
import { FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left section */}
        <div className="text-sm text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">ClassyTask</span>. All rights reserved.
          </p>
          {/* <p className="text-xs text-gray-400">Made with <FaHeart className="inline text-red-500" /> by Mahasiswa Patah Hati</p> */}
        </div>

        {/* Right section */}
        {/* <div className="flex space-x-4">
          <Link href="/about" className="hover:text-white transition duration-200">Tentang</Link>
          <Link href="/faq" className="hover:text-white transition duration-200">FAQ</Link>
          <a href="mailto:classytask@email.com" className="hover:text-white transition duration-200">
            <FaEnvelope />
          </a>
          <a href="https://github.com/username/classytask" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
            <FaGithub />
          </a>
        </div> */}
      </div>
    </footer>
  );
}

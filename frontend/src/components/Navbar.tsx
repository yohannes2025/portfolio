import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <span className="text-indigo-500">Dev</span>Portfolio
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#services" className="hover:text-indigo-400 transition">
            Services
          </a>
          <a href="#projects" className="hover:text-indigo-400 transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
          <a
            href="#contact"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-medium transition"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: "all 0.2s ease-out",
          }}
          className="md:hidden bg-[#020617] border-t border-slate-800 p-6 flex flex-col gap-6"
        >
          <a href="#services" onClick={() => setIsOpen(false)}>
            Services
          </a>
          <a href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
          <a
            href="#contact"
            className="bg-indigo-600 text-center py-4 rounded-2xl"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}

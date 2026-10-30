// frontend/src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { name: "home", href: "#home" },
  { name: "about", href: "#about" },
  { name: "skills", href: "#skills" },
  { name: "projects", href: "#projects" },
  { name: "contact", href: "#contact" },
];

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
          >
            Yohannes<span className="text-cyan-500">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
                whileHover={{ y: -2 }}
              >
                {t(`nav.${link.name}`)}
              </motion.a>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="md:hidden flex shrink-0 items-center gap-1">
            <LanguageSwitcher />
            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-menu"
              className="p-2 shrink-0 rounded-lg text-slate-700 dark:text-slate-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-lg font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {t(`nav.${link.name}`)}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

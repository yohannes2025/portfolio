export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://github.com/yohannes2025"
            target="_blank"
            className="text-3xl hover:text-indigo-400 transition"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/yohannes-mebrahtu-tekle-98a01322a/"
            target="_blank"
            className="text-3xl hover:text-indigo-400 transition"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            className="text-3xl hover:text-indigo-400 transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com/yohannes.mebrahtu.5"
            target="_blank"
            className="text-3xl hover:text-indigo-400 transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <p className="text-slate-500">
          © 2026 DevPortfolio. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-indigo-400 text-2xl mb-4">Hello, I'm</p>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Full Stack
            <br />
            <span className="text-indigo-500">
              <Typewriter
                words={["Web Developer", "UI/UX Engineer", "Problem Solver"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
              />
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-lg">
            I build exceptional digital experiences with clean code, beautiful
            design, and thoughtful interactions.
          </p>

          <div className="mt-10 flex gap-5">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-indigo-500/30"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border border-slate-400 hover:bg-white hover:text-slate-900 rounded-2xl font-semibold text-lg transition-all"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200"
            alt="Yohannes Mebrahtu"
            className="rounded-3xl shadow-2xl shadow-indigo-500/40 w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import DnaBackground from "./DnaBackground";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-crispr-50/30 to-aqua-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <DnaBackground />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="relative z-10 container-custom section-padding w-full">
        <div className="flex items-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-aqua-600 dark:text-aqua-400 mb-6">
                Pioneering the Future of Gene Editing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              <span className="text-gray-900 dark:text-white">Revolutionizing Genetic Engineering with </span>
              <span className="gradient-text">CRISPR Optimization</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              Discover how CRISPR-Cas9 and next-generation optimization technologies are transforming medicine,
              agriculture, and biotechnology — unlocking precise, safe, and accessible gene editing for all.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#technologies"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-crispr-500 to-aqua-500 text-white font-semibold text-lg shadow-lg shadow-crispr-500/25 hover:shadow-xl hover:shadow-crispr-500/30 hover:scale-105 transition-all duration-300"
              >
                Explore Technology
                <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#applications"
                className="group relative px-8 py-4 rounded-2xl glass text-gray-700 dark:text-gray-200 font-semibold text-lg border border-gray-200 dark:border-gray-700 hover:border-aqua-400 dark:hover:border-aqua-500 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Research Applications
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: "Editing Accuracy", value: "99.7%" },
                { label: "Publications", value: "12,400+" },
                { label: "Research Partners", value: "350+" },
                { label: "Clinical Trials", value: "180+" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block flex-1"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-aqua-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reportSections = [
  {
    title: "Understanding CRISPR-Cas9",
    content: "CRISPR-Cas9 functions as a cellular 'search and replace' tool. A guide RNA matches the target DNA sequence while the Cas9 enzyme creates precise double-strand breaks at the desired location, enabling targeted genetic modifications.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4L20 20M20 4L4 20" strokeWidth="1.5" opacity="0.3" />
        <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />
        <path d="M12 4V8M12 16V20M4 12H8M16 12H20" strokeWidth="1.5" />
      </svg>
    ),
    color: "from-crispr-400 to-emerald-600",
  },
  {
    title: "Optimization Strategies",
    content: "Key factors for high-efficiency CRISPR experiments include algorithmic gRNA design for on-target activity, strict PAM site verification (5'-NGG-3'), and Ribonucleoprotein (RNP) complex delivery which degrades quickly to reduce off-target cutting.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="1.5" />
        <path d="M2 17L12 22L22 17" strokeWidth="1.5" opacity="0.5" />
        <path d="M2 12L12 17L22 12" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
    color: "from-aqua-400 to-cyan-600",
  },
  {
    title: "Healthcare Applications",
    content: "CRISPR has transformed biomedical research through gene therapy for inherited disorders, cancer treatment innovations, personalized medicine, and advanced diagnostic tools — offering improved treatment accuracy and enhanced patient outcomes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="1.5" />
      </svg>
    ),
    color: "from-rose-400 to-pink-600",
  },
  {
    title: "Future Innovations",
    content: "The future includes base editing, prime editing, high-fidelity Cas variants, AI-assisted guide RNA design, enhanced delivery mechanisms, and expanded clinical applications — driving progress across health, food security, and sustainability.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" strokeWidth="1.5" />
        <path d="M18 20V4" strokeWidth="1.5" opacity="0.5" />
        <path d="M6 20V16" strokeWidth="1.5" opacity="0.3" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="6" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    color: "from-yellow-300 to-amber-500",
  },
];

export default function ResearchTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="research-team" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-crispr-600 dark:text-crispr-400 mb-3">
              Research Team
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Our <span className="gradient-text">Research</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 md:p-8 mb-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-crispr-400 to-aqua-500 p-1 flex-shrink-0">
                <img src="/photo.png" alt="Samaira Raina" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Samaira Raina</h3>
                <p className="text-sm text-aqua-500 dark:text-aqua-400">Lead Researcher — Gene Editing & CRISPR Optimization</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="mb-3">
                <strong className="text-gray-900 dark:text-white">Gene Editing with CRISPR Optimization</strong> — This research explores the fundamental mechanisms of CRISPR-Cas9 gene editing and the optimization strategies that enhance its precision, efficiency, and safety for therapeutic and biotechnological applications.
              </p>
              <p>
                The study covers the complete workflow from guide RNA design and Cas9 mechanism to delivery optimization, alongside a comprehensive analysis of applications in healthcare, agriculture, and industrial biotechnology. Key findings highlight that Ribonucleoprotein (RNP) complex delivery and algorithmic gRNA design significantly reduce off-target effects while maintaining high on-target editing efficiency.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {reportSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="glass-card p-4 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} p-2.5 text-white mb-3 group-hover:scale-110 transition-transform`}>
                  {section.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{section.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href="#publications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-crispr-500 to-aqua-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              View Research Publications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
        </motion.div>
      </div>
    </section>
  );
}

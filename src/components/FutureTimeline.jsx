import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2025",
    title: "In Vivo Gene Editing Therapies",
    description: "First approved in vivo CRISPR therapies for liver and blood disorders using LNP delivery systems.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-crispr-400 to-emerald-500",
  },
  {
    year: "2026",
    title: "AI-Designed CRISPR Systems",
    description: "Generative AI designs novel CRISPR systems with optimized properties, predicting guide RNA efficacy and off-target effects with near-perfect accuracy.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-purple-400 to-violet-500",
  },
  {
    year: "2027",
    title: "Personalized Medicine Revolution",
    description: "Patient-specific CRISPR therapies become routine for rare genetic diseases, with custom guide RNAs designed and manufactured within weeks.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "from-rose-400 to-red-500",
  },
  {
    year: "2028",
    title: "Epigenetic Editing Therapies",
    description: "Reversible epigenetic editing enters clinical trials, enabling treatment of complex disorders by modulating gene expression without altering DNA sequence.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-teal-400 to-teal-600",
  },
  {
    year: "2029",
    title: "Multi-Gene Editing Platforms",
    description: "Advanced platforms enable simultaneous editing of multiple genes, opening doors to treating polygenic disorders and engineering complex therapeutic cell therapies.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "from-aqua-400 to-cyan-500",
  },
  {
    year: "2030+",
    title: "Universal Gene Editing Access",
    description: "Affordable, accessible CRISPR therapies become available globally, with decentralized manufacturing and simplified delivery systems reaching underserved populations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-yellow-300 to-amber-500",
  },
];

export default function FutureTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="section-padding bg-white dark:bg-gray-950 overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-crispr-600 dark:text-crispr-400 mb-3">
              What's Next
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              The Future of <span className="gradient-text">Gene Editing</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our roadmap for the next decade of CRISPR innovation and its transformative potential.
            </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-crispr-400 via-aqua-400 to-yellow-400 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative md:flex items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:pb-10`}
              >
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}>
                  <div className="glass-card p-4 inline-block max-w-md">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} p-2.5 text-white mb-3 ${i % 2 === 0 ? "ml-auto" : ""}`}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-10 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-xs shadow-lg z-10`}>
                    {item.year}
                  </div>
                </div>

                <div className="md:hidden glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} p-1.5 text-white`}>
                      {item.icon}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${item.color}`}>
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 glass-card p-6 md:p-8 text-center max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "AI + CRISPR Integration", desc: "Generative design of optimized editors" },
                { label: "Personalized Medicine", desc: "Custom therapies for rare diseases" },
                { label: "Advanced Gene Therapies", desc: "Multi-gene editing platforms" },
                { label: "Global Accessibility", desc: "Decentralized affordable manufacturing" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-crispr-400 to-aqua-400 p-2.5 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-xs">{item.label}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
}

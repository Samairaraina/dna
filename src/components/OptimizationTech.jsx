import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const technologies = [
  {
    title: "High-Fidelity Cas Variants",
    tagline: "Enhanced precision through evolved enzymes",
    description: "Engineered variants of Cas9, such as SpCas9-HF1 and eSpCas9, incorporate mutations that reduce non-specific DNA interactions, dramatically improving targeting accuracy while maintaining on-target efficiency.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "from-crispr-400 to-emerald-600",
    stats: [
      { label: "Off-target reduction", value: "99%" },
      { label: "On-target efficiency", value: "95%" },
    ],
  },
  {
    title: "Base Editing",
    tagline: "Precise single-letter DNA changes without double-strand breaks",
    description: "Base editors fuse a catalytically impaired Cas9 with a deaminase enzyme, enabling direct conversion of one DNA base pair to another without creating double-strand breaks, reducing risk of indels.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    color: "from-aqua-400 to-cyan-600",
    stats: [
      { label: "Base conversion", value: "C·G→T·A" },
      { label: "Efficiency", value: ">80%" },
    ],
  },
  {
    title: "Prime Editing",
    tagline: "Search-and-replace genome editing",
    description: "Prime editing uses a Cas9 nickase fused to a reverse transcriptase, guided by a prime editing guide RNA (pegRNA) to directly write new genetic information into the target site with minimal byproducts.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-yellow-300 to-amber-500",
    stats: [
      { label: "Edit types possible", value: "All transitions" },
      { label: "Indel rate", value: "<1%" },
    ],
  },
  {
    title: "AI-Assisted Guide RNA Design",
    tagline: "Machine learning for optimal targeting",
    description: "Deep learning models predict on-target efficiency and off-target potential of guide RNAs, ranking millions of candidate guides to identify the most specific and effective sequences for each target.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-purple-400 to-violet-600",
    stats: [
      { label: "Accuracy improvement", value: "3.5x" },
      { label: "Candidates screened", value: "10M+" },
    ],
  },
  {
    title: "Advanced Delivery Systems",
    tagline: "Getting CRISPR to the right cells, safely",
    description: "Lipid nanoparticles (LNPs), adeno-associated viruses (AAVs), and virus-like particles (VLPs) are engineered to deliver CRISPR components efficiently to specific tissues with reduced immunogenicity.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.701 2.701 0 003 15.546M21 15.546V8.454c0-1.5-1.5-2.5-3-2.5H6c-1.5 0-3 1-3 2.5v7.092" />
      </svg>
    ),
    color: "from-rose-400 to-pink-600",
    stats: [
      { label: "Delivery efficiency", value: "90%" },
      { label: "Targets", value: "Liver, Lungs, Eyes" },
    ],
  },
  {
    title: "Epigenetic Editing",
    tagline: "Modifying gene expression without altering DNA sequence",
    description: "CRISPR-based epigenetic editors fuse dCas9 with epigenetic modifiers to activate or silence gene expression by modifying DNA methylation and histone marks, offering reversible gene regulation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-teal-400 to-teal-600",
    stats: [
      { label: "Gene regulation", value: "Reversible" },
      { label: "Applications", value: "Therapeutics" },
    ],
  },
];

export default function OptimizationTech() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="technologies" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-aqua-600 dark:text-aqua-400 mb-4">
            Our Technologies
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CRISPR Optimization <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We leverage cutting-edge innovations to overcome the limitations of standard CRISPR,
            making gene editing safer, more precise, and more effective.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`glass-card p-6 cursor-pointer group ${
                expanded === i ? "ring-2 ring-aqua-400/50" : ""
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.color} p-3.5 text-white mb-5 group-hover:scale-110 transition-transform`}>
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{tech.title}</h3>
              <p className="text-sm text-aqua-500 dark:text-aqua-400 mb-3">{tech.tagline}</p>
              <motion.p
                initial={false}
                animate={{ height: expanded === i ? "auto" : "0px", opacity: expanded === i ? 1 : 0 }}
                className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed overflow-hidden"
              >
                {expanded === i && tech.description}
              </motion.p>
              {expanded !== i && (
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{tech.description}</p>
              )}
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {tech.stats.map((stat, j) => (
                  <div key={j}>
                    <div className="text-sm font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-aqua-500 font-medium">
                {expanded === i ? "Tap to collapse" : "Tap for details"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

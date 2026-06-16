import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const challenges = [
  {
    title: "Off-Target Mutations",
    description: "CRISPR can inadvertently edit unintended genomic sites, potentially causing harmful mutations. Optimization dramatically reduces off-target effects while preserving on-target activity.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: "Dramatic",
    statLabel: "Off-target Reduction",
    color: "from-red-400 to-red-600",
  },
  {
    title: "Delivery Limitations",
    description: "Efficiently delivering CRISPR components to target cells remains challenging, especially for in vivo therapeutic applications.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    stat: "Multi-vector",
    statLabel: "Delivery Systems",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Editing Efficiency",
    description: "Standard CRISPR editing efficiency varies widely across cell types and genomic loci. Optimization boosts efficiency to clinically relevant levels.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    stat: "Clinically",
    statLabel: "Relevant Levels",
    color: "from-crispr-400 to-crispr-600",
  },
  {
    title: "Safety Concerns",
    description: "Unintended large deletions, chromosomal rearrangements, and immune responses pose safety risks that optimization strategies address.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stat: "Comprehensive",
    statLabel: "Safety Protocols",
    color: "from-aqua-400 to-aqua-600",
  },
];

const benefits = [
  { label: "Precision", value: 98, tier: "Excellent" },
  { label: "Safety", value: 96, tier: "Excellent" },
  { label: "Efficiency", value: 94, tier: "Very High" },
  { label: "Specificity", value: 97, tier: "Excellent" },
];

export default function WhyOptimization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="section-padding bg-white dark:bg-gray-950" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-3">
              The Challenge
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Optimization <span className="gradient-text">Matters</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              While CRISPR-Cas9 is revolutionary, several challenges limit its therapeutic potential.
              Our optimization technologies address each of these critical barriers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-4 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${challenge.color} p-2.5 text-white mb-3 group-hover:scale-110 transition-transform`}>
                {challenge.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{challenge.description}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold gradient-text">{challenge.stat}</span>
                <span className="text-xs text-gray-400 mb-1">{challenge.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-6 md:p-8"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
            Optimization Impact Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={isInView ? { strokeDashoffset: 2 * Math.PI * 42 * (1 - benefit.value / 100) } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{benefit.tier}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{benefit.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

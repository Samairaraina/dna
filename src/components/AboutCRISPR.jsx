import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CrisprIllustration from "./CrisprIllustration";

const steps = [
  {
    title: "Guide RNA Targeting",
    description: "A synthetic guide RNA (sgRNA) is designed to match the target DNA sequence, directing the Cas9 enzyme to the precise genomic location.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "from-crispr-400 to-crispr-600",
  },
  {
    title: "Cas9 Binding",
    description: "The Cas9 protein binds to the guide RNA and undergoes a conformational change, activating its DNA-cleavage domains.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-aqua-400 to-aqua-600",
  },
  {
    title: "DNA Cutting",
    description: "Cas9 creates a precise double-strand break at the target site, triggering the cell's natural DNA repair mechanisms.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Gene Repair & Modification",
    description: "The cell repairs the break via non-homologous end joining (NHEJ) or homology-directed repair (HDR), enabling gene knockout or precise editing.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-crispr-400 to-aqua-400",
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex items-start gap-6"
    >
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 text-white shadow-lg flex-shrink-0`}>
          {step.icon}
        </div>
        {index < steps.length - 1 && (
          <div className="w-0.5 h-full min-h-[4rem] bg-gradient-to-b from-aqua-400/50 to-transparent mt-2" />
        )}
      </div>
      <div className="glass-card p-6 flex-1 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {index + 1}. {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function AboutCRISPR() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="section-padding bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-crispr-600 dark:text-crispr-400 mb-4">
            Understanding the Science
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What is <span className="gradient-text">CRISPR-Cas9</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            CRISPR-Cas9 is a revolutionary gene-editing technology that allows scientists to precisely
            modify DNA sequences in living organisms. Derived from a bacterial defense system, it has
            become the most powerful tool in genetic engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-3xl">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="sticky top-28"
          >
            <div className="glass-card p-6">
              <CrisprIllustration />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400 italic">CRISPR-Cas9 gene editing mechanism illustration</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Discovered", value: "2012" },
              { label: "Nobel Prize", value: "2020" },
              { label: "Applications", value: "500+" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-bold gradient-text">{item.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

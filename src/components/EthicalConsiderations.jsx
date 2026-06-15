import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const topics = [
  {
    title: "Human Germline Editing",
    description: "Editing the human germline (sperm, eggs, embryos) raises profound ethical questions about consent, unintended consequences, and the potential for eugenics.",
    position: "pro",
    stance: "Currently prohibited in most countries",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Regulatory Oversight",
    description: "Robust regulatory frameworks are essential to ensure CRISPR therapies meet rigorous safety and efficacy standards before clinical translation.",
    position: "neutral",
    stance: "Evolving globally (FDA, EMA, WHO)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Safety Standards",
    description: "Comprehensive preclinical testing, long-term follow-up studies, and standardized protocols are critical to ensure patient safety.",
    position: "pro",
    stance: "Continuous improvement needed",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Global Accessibility",
    description: "Ensuring equitable access to CRISPR therapies worldwide requires addressing affordability, infrastructure, and intellectual property barriers.",
    position: "neutral",
    stance: "Major challenge ahead",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Environmental Concerns",
    description: "Gene drive organisms and environmental release of CRISPR-edited organisms require careful ecological risk assessment and international governance.",
    position: "pro",
    stance: "Strict oversight required",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Informed Consent",
    description: "Patients and research participants must fully understand the risks, benefits, and implications of CRISPR-based treatments and germline edits.",
    position: "neutral",
    stance: "Fundamental right",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function EthicalConsiderations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="ethics" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-4">
            Responsible Innovation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ethical <span className="gradient-text">Considerations</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            As we advance CRISPR technology, we remain committed to responsible innovation, ethical rigor, and inclusive dialogue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crispr-400 to-aqua-400 p-3 text-white flex-shrink-0">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{topic.title}</h3>
                  <span className="text-xs text-gray-400">{topic.stance}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{topic.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Ethical Framework</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { principle: "Transparency", desc: "Open sharing of methods and results" },
              { principle: "Responsibility", desc: "Careful risk-benefit assessment" },
              { principle: "Equity", desc: "Fair access to benefits worldwide" },
              { principle: "Integrity", desc: "Highest scientific and ethical standards" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-lg font-bold gradient-text mb-1">{item.principle}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

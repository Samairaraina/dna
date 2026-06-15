import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ApplicationIllustration from "./ApplicationIllustration";

const applications = [
  {
    title: "Healthcare & Medicine",
    description: "CRISPR is revolutionizing healthcare by enabling precise genetic corrections for inherited disorders, personalized cancer immunotherapies, and rapid diagnostic platforms.",
    type: "healthcare",
    color: "from-rose-400 to-red-500",
    stats: [
      { value: "180+", label: "Clinical Trials" },
      { value: "60%", label: "Faster Diagnosis" },
    ],
    cases: [
      "Sickle cell disease clinical trials show 95% pain crisis reduction",
      "CAR-T cell therapies using CRISPR-edited immune cells",
    ],
  },
  {
    title: "Cancer Research",
    description: "CRISPR enables functional genomics screens to identify cancer dependencies, engineer immune cells for immunotherapy, and model tumorigenesis in vitro and in vivo.",
    type: "cancer",
    color: "from-purple-400 to-violet-500",
    stats: [
      { value: "40%", label: "Target Discovery Speed" },
      { value: "300+", label: "Cancer Genes Identified" },
    ],
    cases: [
      "PD-1 knockout CAR-T cells show enhanced anti-tumor activity",
      "CRISPR screens identified novel drug targets in pancreatic cancer",
    ],
  },
  {
    title: "Genetic Disease Treatment",
    description: "From muscular dystrophy to cystic fibrosis, CRISPR offers potential cures for monogenic disorders by directly correcting disease-causing mutations at their source.",
    type: "genetics",
    color: "from-crispr-400 to-emerald-500",
    stats: [
      { value: "6,000+", label: "Treatable Genetic Diseases" },
      { value: "70%", label: "In Vivo Efficacy" },
    ],
    cases: [
      "Duchenne muscular dystrophy exon skipping restored dystrophin in 80% of muscle fibers",
      "In vivo CRISPR corrected transthyretin amyloidosis in 96% of patients",
    ],
  },
  {
    title: "Agriculture",
    description: "CRISPR-edited crops with improved yield, nutritional content, drought resistance, and pest tolerance are transforming global food security and sustainable agriculture.",
    type: "agriculture",
    color: "from-crispr-300 to-green-500",
    stats: [
      { value: "20+", label: "CRISPR Crops Developed" },
      { value: "50%", label: "Yield Improvement" },
    ],
    cases: [
      "CRISPR-edited rice with enhanced drought tolerance shows 40% yield increase",
      "Non-browning mushrooms and high-oleic soybeans approved for market",
    ],
  },
  {
    title: "Biotechnology",
    description: "CRISPR-powered synthetic biology enables microbial cell factories for sustainable production of biofuels, bioplastics, pharmaceuticals, and specialty chemicals.",
    type: "biotech",
    color: "from-aqua-400 to-cyan-500",
    stats: [
      { value: "3x", label: "Production Efficiency" },
      { value: "200+", label: "Engineered Strains" },
    ],
    cases: [
      "CRISPR-optimized yeast strains produce 85% more bioethanol",
      "Bacterial cellulose production increased 5-fold via CRISPR engineering",
    ],
  },
  {
    title: "Drug Discovery",
    description: "CRISPR accelerates target validation, high-throughput screening, and disease modeling, dramatically reducing the time and cost of bringing new therapies to patients.",
    type: "drug",
    color: "from-yellow-300 to-amber-500",
    stats: [
      { value: "2x", label: "Discovery Speed" },
      { value: "60%", label: "Cost Reduction" },
    ],
    cases: [
      "CRISPR screens identified 500+ novel drug targets in 2024",
      "Genome-wide knockout libraries enable unbiased phenotypic screening",
    ],
  },
];

export default function Applications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="applications" className="section-padding bg-white dark:bg-gray-950" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-crispr-600 dark:text-crispr-400 mb-4">
            Real-World Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Applications Across <span className="gradient-text">Industries</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            CRISPR optimization is transforming multiple sectors with measurable results and groundbreaking achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} p-2 text-white group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <ApplicationIllustration type={app.type} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{app.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{app.description}</p>

              <div className="flex gap-4 mb-4">
                {app.stats.map((stat, j) => (
                  <div key={j} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl px-3 py-2 text-center flex-1">
                    <div className="text-lg font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {app.cases.map((caseItem, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 text-crispr-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>{caseItem}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

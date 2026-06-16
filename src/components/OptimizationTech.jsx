import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import TechnologiesModal from "./TechnologiesModal";

const technologies = [
  {
    title: "High-Fidelity Cas Variants",
    tagline: "Wild-type Cas9 cuts at too many off-target sites",
    description: "Standard Cas9 tolerates mismatches between the guide RNA and DNA, creating double-strand breaks at partially homologous sequences across the genome — a major barrier to therapeutic use. Engineered variants remodel the Cas9-DNA interface to destabilize binding at mismatched sites while preserving on-target activity. The approach was validated when SpCas9-HF1, developed through rational mutagenesis of residues that contact DNA, abolished off-target cleavage at every tested site while maintaining full on-target activity in multiple human cell lines.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" opacity="0.25" />
        <line x1="5" y1="5" x2="19" y2="19" strokeWidth="1.5" opacity="0.3" />
        <line x1="19" y1="5" x2="5" y2="19" strokeWidth="1.5" opacity="0.3" />
        <path d="M12 4L12 8M12 16L12 20M4 12L8 12M16 12L20 12" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    color: "from-crispr-400 to-emerald-600",
    stats: [
      { label: "Key advance", value: "Rational redesign" },
      { label: "Wild-type issue", value: "Mismatch tolerance" },
    ],
  },
  {
    title: "Base Editing",
    tagline: "Double-strand breaks trigger indels and rearrangements",
    description: "CRISPR-Cas9 relies on generating double-strand breaks, which the cell repairs through error-prone pathways — introducing uncontrolled insertions and deletions alongside the intended edit. Base editors decouple editing from double-strand breaks by fusing a deaminase enzyme to a catalytically impaired Cas9 that nicks only one strand. This directly converts one DNA base to another (C→T or A→G) within a small editing window. David Liu's lab first demonstrated cytidine base editing in 2016, achieving efficient C→T conversion in human cells with minimal indels — a fundamentally new paradigm for precision genome editing.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="6" x2="6" y2="18" strokeWidth="1.8" />
        <line x1="18" y1="6" x2="18" y2="18" strokeWidth="1.8" />
        <line x1="6" y1="10" x2="18" y2="10" strokeWidth="1.2" opacity="0.3" />
        <line x1="6" y1="14" x2="18" y2="14" strokeWidth="1.2" opacity="0.3" />
        <rect x="9" y="8" width="6" height="3" rx="0.5" strokeWidth="1.2" opacity="0.4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <path d="M9 16L12 19L15 16" strokeWidth="1.5" />
        <path d="M9 13L12 10L15 13" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    color: "from-aqua-400 to-cyan-600",
    stats: [
      { label: "Conversion types", value: "C→T / A→G" },
      { label: "Key benefit", value: "No DSB required" },
    ],
  },
  {
    title: "Prime Editing",
    tagline: "Base editors can only do transition mutations",
    description: "Base editors are chemically limited — they can perform only four of the twelve possible base conversions and cannot make insertions or deletions. Prime editing uses a Cas9 nickase fused to a reverse transcriptase, guided by a prime editing guide RNA (pegRNA) that both specifies the target site and encodes the desired edit on its 3' extension. The RT copies the edit template directly into the genome, enabling any base-to-base conversion, plus small insertions and deletions. When published in Nature in 2019, prime editing corrected disease-associated mutations in human cells with minimal byproducts, achieving the versatility of HDR without requiring a donor template.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8C4 8 10 4 12 12" strokeWidth="1.5" />
        <path d="M20 16C20 16 14 20 12 12" strokeWidth="1.5" />
        <circle cx="4" cy="8" r="1.5" strokeWidth="1.3" />
        <circle cx="20" cy="16" r="1.5" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
        <line x1="12" y1="8" x2="12" y2="6" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="16" x2="12" y2="18" strokeWidth="1.2" opacity="0.4" />
        <line x1="8" y1="12" x2="6" y2="12" strokeWidth="1.2" opacity="0.4" />
        <line x1="16" y1="12" x2="18" y2="12" strokeWidth="1.2" opacity="0.4" />
      </svg>
    ),
    color: "from-yellow-300 to-amber-500",
    stats: [
      { label: "Edit scope", value: "All 12 conversions" },
      { label: "Advantage", value: "No donor template" },
    ],
  },
  {
    title: "AI-Assisted Guide RNA Design",
    tagline: "Most guide RNAs fail or cut off-target",
    description: "Traditional rule-based guide design misses context-dependent sequence features that determine real-world editing outcomes, and fails to predict off-target effects at genomically similar sites. Deep learning models trained on large-scale editing outcome datasets learn the sequence determinants of on-target efficiency and off-target activity across mismatches, bulges, and DNA accessibility. These models guide millions of candidate sequences per target and rank them by predicted specificity. DeepCRISPR and related models have become standard tools in the field, reducing the experimental screening burden and enabling genome-wide tiling studies that were previously impractical.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4C6 4 11 6 13 12C15 18 20 20 20 20" strokeWidth="1.5" />
        <path d="M18 4C18 4 13 6 11 12C9 18 4 20 4 20" strokeWidth="1.5" opacity="0.5" />
        <circle cx="13" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="11" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="4" cy="20" r="1.2" strokeWidth="1.2" />
        <circle cx="20" cy="20" r="1.2" strokeWidth="1.2" />
        <circle cx="6" cy="4" r="1.2" strokeWidth="1.2" />
        <circle cx="18" cy="4" r="1.2" strokeWidth="1.2" />
      </svg>
    ),
    color: "from-purple-400 to-violet-600",
    stats: [
      { label: "Approach", value: "Deep learning ranking" },
      { label: "Scale", value: "Millions per target" },
    ],
  },
  {
    title: "Advanced Delivery Systems",
    tagline: "Naked CRISPR components cannot enter cells on their own",
    description: "CRISPR components (Cas9 mRNA, guide RNA, or ribonucleoproteins) are large, charged molecules that cannot cross cell membranes without a carrier. For in vivo applications, the delivery vehicle must protect its cargo from degradation, target the right tissue, enter cells, and release its payload in the cytoplasm or nucleus. Three complementary platforms have emerged: lipid nanoparticles encapsulate mRNA for transient Cas9 expression in the liver; adeno-associated viruses package gRNA and donor templates with serotypes that preferentially transduce specific tissues; and virus-like particles deliver pre-formed RNP complexes with the efficiency of viral entry but without viral genome integration. Each platform has reached clinical trials.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.5" strokeWidth="1.2" opacity="0.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M5 5L8 8M19 19L16 16M19 5L16 8M5 19L8 16" strokeWidth="1.2" opacity="0.4" />
        <path d="M12 3L12 5M12 19L12 21M3 12L5 12M19 12L21 12" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    color: "from-rose-400 to-pink-600",
    stats: [
      { label: "Platforms", value: "LNP / AAV / VLP" },
      { label: "Cargo types", value: "mRNA, RNP, gRNA" },
    ],
  },
  {
    title: "Epigenetic Editing",
    tagline: "Permanent DNA changes carry irreversible risks",
    description: "Making permanent changes to the genome is inappropriate for many clinical indications where transient gene modulation suffices — metabolic disorders, inflammation, or pain. It also carries risks of permanent off-target alterations. Epigenetic editors repurpose dCas9 as a delivery platform for chromatin-modifying enzymes — turning genes on (via TET1 demethylation or p300 acetylation) or off (via KRAB-mediated H3K9me3 deposition) without altering the underlying DNA sequence. These modifications are reversible and titratable, offering safer alternatives for non-genetic diseases. In preclinical models, dCas9-p300 reactivation of silenced UBE3A in Angelman syndrome neurons restored protein function — a milestone for reversible epigenetic therapies.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6H20" strokeWidth="1.8" />
        <path d="M4 12H20" strokeWidth="1.8" opacity="0.3" />
        <path d="M4 18H20" strokeWidth="1.8" opacity="0.15" />
        <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="14" cy="6" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="17" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="10" cy="18" r="1.5" fill="currentColor" opacity="0.3" />
        <path d="M9 6L9 4M16 6L16 4" strokeWidth="1.2" opacity="0.5" />
        <path d="M17 12L19 12" strokeWidth="1.2" opacity="0.5" />
        <path d="M10 18L8 18" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
    color: "from-teal-400 to-teal-600",
    stats: [
      { label: "Mechanism", value: "Chromatin modification" },
      { label: "Key property", value: "Reversible" },
    ],
  },
];

export default function OptimizationTech() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expanded, setExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="technologies" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-aqua-600 dark:text-aqua-400 mb-3">
              Our Technologies
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              CRISPR Optimization <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We leverage cutting-edge innovations to overcome the limitations of standard CRISPR,
              making gene editing safer, more precise, and more effective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="glass-card p-4 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} p-3 text-white mb-3 group-hover:scale-110 transition-transform`}>
                {tech.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">{tech.title}</h3>
              <p className="text-xs text-aqua-500 dark:text-aqua-400 mb-2">{tech.tagline}</p>
              <motion.p
                initial={false}
                animate={{ height: expanded === i ? "auto" : "0px", opacity: expanded === i ? 1 : 0 }}
                className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed overflow-hidden"
              >
                {expanded === i && tech.description}
              </motion.p>
              {expanded !== i && (
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{tech.description}</p>
              )}
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                {tech.stats.map((stat, j) => (
                  <div key={j}>
                    <div className="text-xs font-bold gradient-text">{stat.value}</div>
                    <div className="text-[10px] text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-aqua-500 font-medium">
                {expanded === i ? "Tap to collapse" : "Tap for details"}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-crispr-500 to-aqua-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            View All Technologies
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>

      <TechnologiesModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

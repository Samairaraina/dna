import { motion, AnimatePresence } from "framer-motion";

const allTechnologies = [
  {
    title: "High-Fidelity Cas Variants",
    tagline: "Wild-type Cas9 cuts at too many off-target sites",
    description: "Standard Cas9 tolerates mismatches between the guide RNA and DNA, creating double-strand breaks at partially homologous sequences across the genome — a major barrier to therapeutic use. Engineered variants remodel the Cas9-DNA interface to destabilize binding at mismatched sites while preserving on-target activity.",
    color: "from-crispr-400 to-emerald-600",
    details: [
      "Reduced non-specific DNA contacts through rational protein engineering",
      "SpCas9-HF1 eliminates off-target cleavage at nearly all tested sites",
      "eSpCas9 uses alanine substitutions to neutralize positively charged residues",
      "HypaCas9 incorporates additional mutations for enhanced discrimination",
      "Compatible with base editing and prime editing platforms",
    ],
  },
  {
    title: "Base Editing",
    tagline: "Double-strand breaks trigger indels and rearrangements",
    description: "CRISPR-Cas9 relies on generating double-strand breaks, which the cell repairs through error-prone pathways — introducing uncontrolled insertions and deletions alongside the intended edit. Base editors decouple editing from double-strand breaks by fusing a deaminase enzyme to a catalytically impaired Cas9 that nicks only one strand.",
    color: "from-aqua-400 to-cyan-600",
    details: [
      "Cytidine base editors (CBE): C•G → T•A conversions",
      "Adenine base editors (ABE): A•T → G•C conversions",
      "No double-strand break required, minimizing chromosomal rearrangements",
      "Indel frequency dramatically reduced compared to traditional CRISPR",
      "Active in both dividing and non-dividing cells",
    ],
  },
  {
    title: "Prime Editing",
    tagline: "Base editors can only do transition mutations",
    description: "Base editors are chemically limited — they can perform only four of the twelve possible base conversions and cannot make insertions or deletions. Prime editing uses a Cas9 nickase fused to a reverse transcriptase, guided by a prime editing guide RNA (pegRNA) that both specifies the target site and encodes the desired edit on its 3' extension.",
    color: "from-yellow-300 to-amber-500",
    details: [
      "Cas9 nickase (H840A) fused to engineered reverse transcriptase",
      "pegRNA both specifies target site and encodes desired edit",
      "Capable of all 12 possible base-to-base conversions",
      "Small insertions and deletions without requiring a donor template",
      "Minimal off-target editing and reduced byproduct formation",
    ],
  },
  {
    title: "AI-Assisted Guide RNA Design",
    tagline: "Most guide RNAs fail or cut off-target",
    description: "Traditional rule-based guide design misses context-dependent sequence features that determine real-world editing outcomes, and fails to predict off-target effects at genomically similar sites. Deep learning models trained on large-scale editing outcome datasets learn the sequence determinants of on-target efficiency and off-target activity across mismatches, bulges, and DNA accessibility.",
    color: "from-purple-400 to-violet-600",
    details: [
      "Deep neural networks trained on large-scale editing outcome datasets",
      "Ensemble models predict off-target effects across mismatches and bulges",
      "Genome-wide specificity scoring in under a minute",
      "Continuous learning from experimental validation data",
      "Supports all Cas variants and editing modalities",
    ],
  },
  {
    title: "Advanced Delivery Systems",
    tagline: "Naked CRISPR components cannot enter cells on their own",
    description: "CRISPR components (Cas9 mRNA, guide RNA, or ribonucleoproteins) are large, charged molecules that cannot cross cell membranes without a carrier. Three complementary platforms have emerged: lipid nanoparticles, adeno-associated viruses, and virus-like particles.",
    color: "from-rose-400 to-pink-600",
    details: [
      "Lipid nanoparticles enable efficient mRNA and RNP delivery to liver hepatocytes",
      "AAV serotypes achieve tissue-specific targeting (AAV9 for CNS, AAV2 for retina)",
      "Virus-like particles combine viral entry efficiency with non-viral safety",
      "Antibody shielding and PEGylation reduce immune clearance",
      "Multi-dose compatible with transient Cas expression",
    ],
  },
  {
    title: "Epigenetic Editing",
    tagline: "Permanent DNA changes carry irreversible risks",
    description: "Making permanent changes to the genome is inappropriate for many clinical indications where transient gene modulation suffices — metabolic disorders, inflammation, or pain. Epigenetic editors repurpose dCas9 as a delivery platform for chromatin-modifying enzymes, altering gene expression without changing the underlying DNA sequence.",
    color: "from-teal-400 to-teal-600",
    details: [
      "dCas9-TET1 for targeted DNA demethylation and gene activation",
      "dCas9-KRAB for targeted gene silencing via H3K9me3 deposition",
      "dCas9-p300 for H3K27 acetylation and enhancer activation",
      "Reversible and titratable — no permanent genomic changes",
      "Potential for treating triplet repeat disorders and imprinting diseases",
    ],
  },
];

export default function TechnologiesModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 sm:inset-x-auto sm:top-12 sm:max-w-3xl sm:mx-auto z-50 overflow-y-auto rounded-2xl glass shadow-2xl max-h-[90vh]"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Technologies</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Complete portfolio of CRISPR optimization platforms</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0" aria-label="Close">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {allTechnologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} p-2.5 text-white flex-shrink-0 mt-0.5`}>
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tech.title}</h3>
                            <p className="text-sm text-aqua-500 dark:text-aqua-400 mt-0.5">{tech.tagline}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">{tech.description}</p>
                        <ul className="mt-4 space-y-2">
                          {tech.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <svg className="w-4 h-4 text-aqua-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

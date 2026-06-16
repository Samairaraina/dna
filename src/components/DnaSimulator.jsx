import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const NUC_COLORS = {
  A: { color: "#4ade80", label: "Adenine" },
  T: { color: "#f43f5e", label: "Thymine" },
  C: { color: "#60a5fa", label: "Cytosine" },
  G: { color: "#facc15", label: "Guanine" },
  "—": { color: "#333", label: "Deleted" },
};

const configs = {
  cas9: {
    id: "cas9",
    name: "CRISPR-Cas9",
    tagline: "Double-strand break mediated gene knockout",
    accent: "#ef4444",
    color: "from-red-400 to-rose-600",
    borderColor: "border-red-500/30",
    bgGlow: "shadow-red-500/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" strokeWidth="1.5" />
      </svg>
    ),
    originalSeq: "ATCGGATCGAATCGTAA",
    knockoutStart: 6,
    knockoutEnd: 9,
    steps: [
      { id: "scan", label: "gRNA Scanning", desc: "Guide RNA searches for PAM sequence" },
      { id: "target", label: "Target Site Found", desc: "Complementary binding confirmed" },
      { id: "bind", label: "Cas9 Binding", desc: "Cas9 nuclease domain activates" },
      { id: "cleave", label: "Double-Strand Break", desc: "RuvC + HNH domains cut both strands" },
      { id: "knockout", label: "Gene Knockout", desc: "NHEJ repair disrupts gene function" },
    ],
    stats: {
      accuracy: 82,
      offTarget: "Moderate",
      mechanism: "NHEJ / HDR",
      efficiency: "Cell-type dependent",
    },
    explanation: "CRISPR-Cas9 creates a double-strand break at the target site. The cell repairs it via error-prone NHEJ, causing frameshifts that knockout the gene.",
    resultLabel: "Gene knockout — frameshift induced",
    labelColor: "text-red-400",
  },

  base: {
    id: "base",
    name: "Base Editing",
    tagline: "Single-nucleotide conversion without DNA breaks",
    accent: "#3b82f6",
    color: "from-blue-400 to-cyan-500",
    borderColor: "border-blue-500/30",
    bgGlow: "shadow-blue-500/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="6" x2="6" y2="18" strokeWidth="1.8" />
        <line x1="18" y1="6" x2="18" y2="18" strokeWidth="1.8" />
        <path d="M9 16L12 19L15 16" strokeWidth="1.5" />
        <path d="M9 13L12 10L15 13" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    originalSeq: "ATCGGACCGAATCG",
    editIndex: 7,
    targetBase: "C",
    resultBase: "T",
    steps: [
      { id: "target", label: "Target Base Identified", desc: "Deaminase window positioned over target" },
      { id: "bind", label: "Base Editor Binding", desc: "dCas9-deaminase fusion docks at site" },
      { id: "convert", label: "Chemical Conversion", desc: "Cytidine deamination: C→U (read as T)" },
      { id: "done", label: "Precision Edit Complete", desc: "No double-strand break created" },
    ],
    stats: {
      accuracy: 94,
      offTarget: "Low",
      mechanism: "Deamination",
      efficiency: "High in dividing & non-dividing cells",
    },
    explanation: "Base editors fuse a deaminase to dCas9, chemically converting one DNA base to another without cutting either strand. C→T and A→G edits are now routine.",
    resultLabel: "Point mutation corrected — no DSB",
    labelColor: "text-blue-400",
  },

  prime: {
    id: "prime",
    name: "Prime Editing",
    tagline: "Search-and-replace with programmable template",
    accent: "#f59e0b",
    color: "from-amber-400 to-yellow-500",
    borderColor: "border-amber-500/30",
    bgGlow: "shadow-amber-500/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8C4 8 10 4 12 12" strokeWidth="1.5" />
        <path d="M20 16C20 16 14 20 12 12" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    originalSeq: "ATCGGATCGAATCG",
    editRange: [6, 9],
    rewriteBases: ["T", "T", "G", "G"],
    steps: [
      { id: "pegRNA", label: "pegRNA Attachment", desc: "Prime editing guide RNA binds target" },
      { id: "nick", label: "Single-Strand Nick", desc: "Cas9 nickase cuts only the PAM strand" },
      { id: "write1", label: "Rewrite Base 1", desc: "RT copies edit template to nicked strand" },
      { id: "write2", label: "Rewrite Base 2", desc: "Extension continues across edit window" },
      { id: "done", label: "Search-and-Replace Complete", desc: "DNA repair incorporates the edit" },
    ],
    stats: {
      accuracy: 97,
      offTarget: "Very Low",
      mechanism: "Reverse Transcription",
      efficiency: "High versatility",
    },
    explanation: "Prime editing uses a Cas9 nickase fused to reverse transcriptase. The pegRNA both specifies the target and encodes the edit, enabling all 12 base conversions plus small indels.",
    resultLabel: "Multi-base rewrite — no donor template needed",
    labelColor: "text-amber-400",
  },

  epigenetic: {
    id: "epigenetic",
    name: "Epigenetic Editing",
    tagline: "Gene regulation without altering DNA sequence",
    accent: "#a855f7",
    color: "from-purple-400 to-violet-500",
    borderColor: "border-purple-500/30",
    bgGlow: "shadow-purple-500/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6H20" strokeWidth="1.8" />
        <path d="M4 12H20" strokeWidth="1.8" opacity="0.3" />
        <path d="M4 18H20" strokeWidth="1.8" opacity="0.15" />
        <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="17" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    originalSeq: "ATCGGATCGAATCG",
    steps: [
      { id: "target", label: "Target Locus Identified", desc: "dCas9 guides epigenetic modifier to gene" },
      { id: "bind", label: "Regulator Attachment", desc: "TET1 / KRAB / p300 domain binds promoter" },
      { id: "modify", label: "Epigenetic Mark Deposition", desc: "Methylation / acetylation marks placed" },
      { id: "regulate", label: "Expression Modulated", desc: "Gene activity changed — sequence unchanged" },
    ],
    stats: {
      accuracy: 91,
      offTarget: "Low",
      mechanism: "Chromatin Modification",
      efficiency: "Reversible and titratable",
    },
    explanation: "Epigenetic editors fuse chromatin-modifying enzymes to dCas9 — turning genes on (TET1, p300) or off (KRAB) via methylation and histone marks. The DNA sequence never changes.",
    resultLabel: "Gene expression modulated — DNA unchanged",
    labelColor: "text-purple-400",
  },
};

function Cas9Sequence({ seq, step, knockoutStart, knockoutEnd }) {
  const showKnockout = step >= 5;
  const cleavageFlash = step === 4;

  const displaySeq = showKnockout
    ? seq.slice(0, knockoutStart) + "—".repeat(knockoutEnd - knockoutStart) + seq.slice(knockoutEnd)
    : seq;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-2 py-4 rounded-xl bg-gray-950/60 border border-gray-800/50 relative">
      {displaySeq.split("").map((base, i) => {
        const inKnockout = i >= knockoutStart && i < knockoutEnd;
        const isScanPhase = step === 1 && i >= knockoutStart - 2 && i <= knockoutEnd;
        const isTargeted = step >= 2 && inKnockout;
        const info = NUC_COLORS[base] || { color: "#888", label: base };
        return (
          <motion.div
            key={`${i}-${base}`}
            className={`relative flex items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-lg font-mono font-bold text-sm sm:text-base select-none
              ${isTargeted ? "z-10" : ""}
              ${inKnockout && showKnockout ? "opacity-30" : ""}
            `}
            style={{
              backgroundColor: isTargeted ? `${configs.cas9.accent}20` : `${info.color}15`,
              color: inKnockout && showKnockout ? "#555" : info.color,
              border: isTargeted
                ? `2px solid ${configs.cas9.accent}`
                : `1px solid ${info.color}30`,
              boxShadow: isTargeted ? `0 0 12px ${configs.cas9.accent}40` : "none",
            }}
            animate={
              cleavageFlash && inKnockout
                ? { scale: [1, 1.2, 0.8, 1.1, 1], backgroundColor: [`${configs.cas9.accent}20`, `${configs.cas9.accent}60`, `${configs.cas9.accent}30`, `${configs.cas9.accent}50`, `${configs.cas9.accent}20`] }
                : isScanPhase
                ? { scale: [1, 1.05, 1] }
                : {}
            }
            transition={cleavageFlash ? { duration: 0.6 } : { duration: 1, repeat: Infinity }}
          >
            {base}
            {cleavageFlash && inKnockout && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-red-400"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
                transition={{ duration: 0.8, repeat: 2 }}
              />
            )}
          </motion.div>
        );
      })}
      {cleavageFlash && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-4xl" style={{ color: configs.cas9.accent, textShadow: `0 0 30px ${configs.cas9.accent}` }}>⚡</span>
        </motion.div>
      )}
    </div>
  );
}

function BaseSequence({ seq, step, editIndex, targetBase, resultBase }) {
  const isZoom = step >= 1;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-2 py-4 rounded-xl bg-gray-950/60 border border-gray-800/50 relative">
      {seq.split("").map((base, i) => {
        const isEdit = i === editIndex;
        const isConverted = step >= 3 && isEdit;
        const displayBase = isConverted ? resultBase : base;
        const info = NUC_COLORS[displayBase] || { color: "#888", label: displayBase };
        const dim = !isEdit && isZoom;

        return (
          <motion.div
            key={`${i}-${base}`}
            className={`relative flex items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-lg font-mono font-bold text-sm sm:text-base select-none
              ${dim ? "opacity-20" : ""}
              ${isEdit ? "z-10" : ""}
            `}
            style={{
              backgroundColor: isEdit
                ? `${configs.base.accent}20`
                : `${info.color}15`,
              color: info.color,
              border: isEdit
                ? `2px solid ${configs.base.accent}`
                : `1px solid ${info.color}30`,
              boxShadow: isEdit ? `0 0 20px ${configs.base.accent}40` : "none",
            }}
            animate={
              isEdit
                ? {
                    scale: isZoom ? [1, 1.3, 1] : 1,
                  }
                : {}
            }
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {isEdit && step === 3 ? (
              <motion.span
                key={resultBase}
                initial={{ scale: 2, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {displayBase}
              </motion.span>
            ) : (
              displayBase
            )}
            {isEdit && step === 2 && (
              <motion.div
                className="absolute -inset-2 rounded-xl border-2 border-dashed"
                style={{ borderColor: `${configs.base.accent}50` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function PrimeSequence({ seq, step, editRange, rewriteBases }) {
  const [start, end] = editRange;
  const writeProgress = step >= 3 ? (step === 3 ? 1 : step === 4 ? 2 : rewriteBases.length) : 0;

  const displaySeq = seq.split("").map((base, i) => {
    if (i >= start && i < start + rewriteBases.length) {
      const rewriteIdx = i - start;
      if (step >= 5) return rewriteBases[rewriteIdx];
      if (step >= 3 && rewriteIdx < writeProgress) return rewriteBases[rewriteIdx];
    }
    return base;
  });

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-2 py-4 rounded-xl bg-gray-950/60 border border-gray-800/50 relative">
      {displaySeq.map((base, i) => {
        const inRange = i >= start && i < start + rewriteBases.length;
        const rewriteIdx = inRange ? i - start : -1;
        const alreadyRewritten = rewriteIdx >= 0 && rewriteIdx < writeProgress;
        const currentlyWriting = step === 3 + rewriteIdx && rewriteIdx < rewriteBases.length;
        const info = NUC_COLORS[base] || { color: "#888", label: base };
        const isDim = step >= 3 && !inRange && Math.abs(i - start) > 2;

        return (
          <motion.div
            key={`${i}-${base}`}
            className={`relative flex items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-lg font-mono font-bold text-sm sm:text-base select-none
              ${inRange && step >= 2 ? "z-10" : ""}
              ${isDim ? "opacity-20" : ""}
            `}
            style={{
              backgroundColor: inRange
                ? alreadyRewritten
                  ? `${configs.prime.accent}30`
                  : step >= 2
                  ? `${configs.prime.accent}15`
                  : `${info.color}15`
                : `${info.color}15`,
              color: info.color,
              border: inRange && currentlyWriting
                ? `2px solid ${configs.prime.accent}`
                : `1px solid ${info.color}30`,
              boxShadow: currentlyWriting ? `0 0 16px ${configs.prime.accent}50` : "none",
            }}
            animate={currentlyWriting ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            {currentlyWriting ? (
              <motion.span
                key={`w-${base}`}
                initial={{ scale: 2, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                {base}
              </motion.span>
            ) : (
              base
            )}
          </motion.div>
        );
      })}
      {step === 1 && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-mono"
          style={{ color: configs.prime.accent }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>pegRNA</span>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L6.707 8.707a1 1 0 01-1.414-1.414l4-4A1 1 0 0110 3z" /></svg>
        </motion.div>
      )}
    </div>
  );
}

function EpiSequence({ seq, step }) {
  const markPositions = [3, 7, 10];
  const numMarks = step >= 4 ? markPositions.length : step >= 3 ? 2 : step >= 2 ? 1 : 0;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-2 py-4 rounded-xl bg-gray-950/60 border border-gray-800/50 relative">
      {seq.split("").map((base, i) => {
        const hasMark = markPositions.slice(0, numMarks).includes(i);
        const info = NUC_COLORS[base] || { color: "#888", label: base };

        return (
          <motion.div
            key={`${i}-${base}`}
            className="relative flex items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-lg font-mono font-bold text-sm sm:text-base select-none"
            style={{
              backgroundColor: hasMark ? `${configs.epigenetic.accent}25` : `${info.color}10`,
              color: info.color,
              border: hasMark
                ? `1px solid ${configs.epigenetic.accent}50`
                : `1px solid ${info.color}20`,
              boxShadow: hasMark ? `0 0 10px ${configs.epigenetic.accent}30` : "none",
            }}
          >
            {base}
            <AnimatePresence>
              {hasMark && (
                <motion.div
                  key={`mark-${i}`}
                  initial={{ scale: 0, y: -15, opacity: 0 }}
                  animate={{ scale: 1, y: -22, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke={configs.epigenetic.accent} strokeWidth="1.5" fill={`${configs.epigenetic.accent}30`} />
                    <path d="M5 8L7 10L11 6" stroke={configs.epigenetic.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function SequenceView({ config, step }) {
  const { id } = config;

  if (id === "cas9") {
    return <Cas9Sequence seq={config.originalSeq} step={step} knockoutStart={config.knockoutStart} knockoutEnd={config.knockoutEnd} />;
  }
  if (id === "base") {
    return <BaseSequence seq={config.originalSeq} step={step} editIndex={config.editIndex} targetBase={config.targetBase} resultBase={config.resultBase} />;
  }
  if (id === "prime") {
    return <PrimeSequence seq={config.originalSeq} step={step} editRange={config.editRange} rewriteBases={config.rewriteBases} />;
  }
  if (id === "epigenetic") {
    return <EpiSequence seq={config.originalSeq} step={step} />;
  }
  return null;
}

function getStepCount(config) {
  return config.steps.length;
}

function getSequenceResult(config, step) {
  const total = getStepCount(config);
  if (step < total) return null;

  if (config.id === "cas9") {
    const { originalSeq, knockoutStart, knockoutEnd } = config;
    return originalSeq.slice(0, knockoutStart) + "—".repeat(knockoutEnd - knockoutStart) + originalSeq.slice(knockoutEnd);
  }
  if (config.id === "base") {
    const seq = config.originalSeq.split("");
    seq[config.editIndex] = config.resultBase;
    return seq.join("");
  }
  if (config.id === "prime") {
    const [start] = config.editRange;
    const seq = config.originalSeq.split("");
    config.rewriteBases.forEach((b, i) => { seq[start + i] = b; });
    return seq.join("");
  }
  if (config.id === "epigenetic") {
    return config.originalSeq + " (methylated)";
  }
  return null;
}

function Particles({ accent, count = 8, active }) {
  if (!active) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
          initial={{ x: -10, y: 40 + Math.random() * 200, opacity: 0 }}
          animate={{ x: 420, y: 40 + Math.random() * 200, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5, ease: "linear" }}
        />
      ))}
    </>
  );
}

function LabelMarker({ base, i, config, step }) {
  if (config.id === "cas9" && step >= 2 && step < 5) {
    const inRange = i >= config.knockoutStart && i < config.knockoutEnd;
    if (inRange) {
      return (
        <div className="flex justify-center">
          <span className="text-[10px] font-mono font-bold" style={{ color: config.accent }}>▼</span>
        </div>
      );
    }
  }
  if (config.id === "base" && step >= 1 && i === config.editIndex) {
    return (
      <div className="flex justify-center">
        <span className="text-[10px] font-mono font-bold" style={{ color: config.accent }}>
          {step === 1 ? "●" : step === 2 ? "○" : "✓"}
        </span>
      </div>
    );
  }
  if (config.id === "prime" && step >= 1) {
    const [start] = config.editRange;
    if (i === start) {
      return (
        <div className="flex justify-center">
          <span className="text-[10px] font-mono font-bold" style={{ color: config.accent }}>
            {step === 1 ? "pegRNA" : step >= 5 ? "✓" : "✎"}
          </span>
        </div>
      );
    }
  }
  if (config.id === "epigenetic" && step >= 2 && [3, 7, 10].includes(i)) {
    return (
      <div className="flex justify-center">
        <span className="text-[10px] font-mono font-bold" style={{ color: config.accent }}>◈</span>
      </div>
    );
  }
  return <div className="w-10 sm:w-12" />;
}

export default function DnaSimulator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMethod, setSelectedMethod] = useState("prime");
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const config = configs[selectedMethod];
  const totalSteps = getStepCount(config);
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  useEffect(() => {
    setCurrentStep(0);
    setCompleted(false);
    setShowResult(false);
    setIsEditing(false);
  }, [selectedMethod]);

  const runEditing = useCallback(() => {
    if (isEditing) return;
    setIsEditing(true);
    setCompleted(false);
    setShowResult(false);
    setCurrentStep(0);

    const timings = [
      { step: 1, delay: 700 },
      { step: 2, delay: 1900 },
      { step: 3, delay: 3200 },
      { step: 4, delay: 4600 },
    ];

    if (totalSteps === 5) {
      timings.push({ step: 5, delay: 6000 });
    }

    timings.forEach(({ step, delay }) => {
      setTimeout(() => setCurrentStep(step), delay);
    });

    const finalDelay = totalSteps === 5 ? 7200 : 5800;
    setTimeout(() => {
      setIsEditing(false);
      setCompleted(true);
      setShowResult(true);
    }, finalDelay);
  }, [isEditing, totalSteps]);

  const reset = () => {
    setIsEditing(false);
    setCompleted(false);
    setShowResult(false);
    setCurrentStep(0);
  };

  const step = config.steps[Math.min(currentStep, totalSteps) - 1] || null;

  return (
    <section id="simulator" className="section-padding bg-gray-950 overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-aqua-400 mb-3">
            Interactive Lab
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            DNA Editing <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Each CRISPR technology has a fundamentally different mechanism. Select one and watch it work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-2">
            <div className="text-[10px] text-gray-600 uppercase tracking-wider font-mono mb-2">Editing Method</div>
            {Object.values(configs).map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.08 * Object.values(configs).indexOf(m) }}
                  onClick={() => { if (!isEditing) { setSelectedMethod(m.id); } }}
                  disabled={isEditing}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? `${m.borderColor} shadow-lg ${m.bgGlow}`
                      : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                  } ${isEditing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  style={isSelected ? { backgroundColor: `${m.accent}08` } : {}}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} p-2 text-white flex-shrink-0`}>
                      {m.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-semibold ${isSelected ? "text-white" : "text-gray-300"}`}>
                        {m.name}
                      </div>
                      <div className="text-[9px] text-gray-500 truncate leading-tight">{m.tagline}</div>
                    </div>
                    {isSelected && (
                      <motion.div
                        layoutId="indicator"
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: m.accent }}
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}

            <div className="pt-2">
              <div className="text-[10px] text-gray-600 uppercase tracking-wider font-mono mb-2">Mechanism</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{config.explanation}</div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="glass-card p-4 sm:p-5 bg-gray-900/80 border-gray-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Sequence Viewer</span>
                  <span className="text-[9px] font-mono text-gray-600">hg38 :: chr11:5,224,500-5,224,514</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isEditing ? config.accent : completed ? config.accent : "#4b5563",
                      boxShadow: isEditing || completed ? `0 0 6px ${config.accent}` : "none",
                    }}
                  />
                  <span className="text-[9px] font-mono text-gray-500">
                    {isEditing ? "EDITING" : completed ? "COMPLETE" : "READY"}
                  </span>
                </div>
              </div>

              <div className="relative overflow-x-auto pb-1">
                <SequenceView config={config} step={currentStep} />
                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 min-w-max px-2">
                  {config.originalSeq.split("").map((base, i) => (
                    <LabelMarker key={i} base={base} i={i} config={config} step={currentStep} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-gray-800 text-[9px] font-mono text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: "#4ade80" }} />
                  A
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: "#f43f5e" }} />
                  T
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: "#60a5fa" }} />
                  C
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: "#facc15" }} />
                  G
                </div>
                {selectedMethod === "cas9" && (
                  <span className="text-gray-600">| Knockout: —</span>
                )}
                {selectedMethod === "epigenetic" && (
                  <span className="text-gray-600">| Sequence unchanged</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card p-4 sm:p-5 bg-gray-900/80 border-gray-800 relative overflow-hidden">
                <Particles accent={config.accent} active={isEditing} />
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Editing Progress</div>
                <div className="flex items-center justify-between mb-2">
                  {config.steps.map((s, i) => {
                    const stepNum = i + 1;
                    const isActive = currentStep === stepNum;
                    const isDone = currentStep > stepNum;
                    return (
                      <div key={s.id} className="flex flex-col items-center gap-1">
                        <motion.div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-500"
                          style={{
                            backgroundColor: isDone ? `${config.accent}25` : isActive ? `${config.accent}20` : "transparent",
                            borderColor: isDone || isActive ? config.accent : "#374151",
                            color: isDone || isActive ? config.accent : "#6b7280",
                            boxShadow: isActive ? `0 0 12px ${config.accent}40` : "none",
                          }}
                          animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {isDone ? "✓" : stepNum}
                        </motion.div>
                        <span
                          className="text-[8px] font-mono text-center leading-tight max-w-14"
                          style={{ color: isDone ? config.accent : isActive ? config.accent : "#6b7280" }}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${config.accent}, ${config.accent}88)` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercent}%` }}
                  />
                </div>
                {step && (
                  <motion.p
                    key={step.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-gray-500 mt-2 italic"
                  >
                    {step.desc}
                  </motion.p>
                )}
              </div>

              <div className="glass-card p-4 sm:p-5 bg-gray-900/80 border-gray-800">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Live Statistics</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Editing Accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ background: `linear-gradient(90deg, ${config.accent}, ${config.accent}88)` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${config.stats.accuracy}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold" style={{ color: config.accent }}>
                        {config.stats.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Off-Target Risk</span>
                    <span className="text-[11px] font-mono font-bold" style={{ color: config.stats.offTarget === "Very Low" ? "#4ade80" : config.stats.offTarget === "Low" ? "#22d3ee" : "#facc15" }}>
                      {config.stats.offTarget}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Mechanism</span>
                    <span className="text-[11px] text-gray-300">{config.stats.mechanism}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Efficiency</span>
                    <span className="text-[11px] text-gray-300">{config.stats.efficiency}</span>
                  </div>
                </div>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 pt-3 border-t border-gray-800"
                  >
                    <div className={`text-[10px] font-mono font-bold ${config.labelColor}`}>
                      {config.resultLabel}
                    </div>
                    {selectedMethod !== "epigenetic" && (
                      <div className="text-[10px] font-mono text-gray-500 mt-1">
                        Original: {config.originalSeq}<br />
                        Result:   {getSequenceResult(config, currentStep)}
                      </div>
                    )}
                    {selectedMethod === "epigenetic" && (
                      <div className="text-[10px] font-mono text-gray-500 mt-1">
                        Sequence: {config.originalSeq} (unchanged)<br />
                        Expression: {currentStep >= 4 ? "↑↑ Regulated" : "—"}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={runEditing}
                disabled={isEditing || completed}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 ${
                  completed
                    ? "border text-gray-400 cursor-default"
                    : isEditing
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "text-white shadow-lg hover:shadow-xl"
                }`}
                style={{
                  background: completed ? "transparent" : isEditing ? "" : `linear-gradient(135deg, ${config.accent}, ${config.accent}88)`,
                  borderColor: completed ? `${config.accent}40` : "transparent",
                  borderWidth: completed ? 1 : 0,
                }}
              >
                {completed ? `✓ ${config.name} Complete` : isEditing ? "Editing in Progress..." : `Run ${config.name}`}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={reset}
                disabled={isEditing}
                className="px-4 py-2.5 rounded-xl glass text-gray-300 text-xs font-medium border border-gray-700 hover:border-gray-500 transition-all disabled:opacity-30"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

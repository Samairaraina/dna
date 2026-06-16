import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function FluorescentMicroscopy() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <circle key={i} cx={50 + Math.random()*300} cy={30 + Math.random()*260} r={2 + Math.random()*4}
          fill={["#4ade80","#22d3ee","#facc15","#c084fc","#f43f5e"][i % 5]}
          opacity={0.15 + Math.random()*0.25}
        />
      ))}
      <ellipse cx="140" cy="120" rx="60" ry="45" fill="#4ade80" opacity="0.08" />
      <ellipse cx="140" cy="120" rx="35" ry="26" fill="#4ade80" opacity="0.15" />
      <ellipse cx="140" cy="120" rx="15" ry="12" fill="#4ade80" opacity="0.35" />
      <ellipse cx="270" cy="190" rx="55" ry="50" fill="#22d3ee" opacity="0.07" />
      <ellipse cx="270" cy="190" rx="30" ry="28" fill="#22d3ee" opacity="0.13" />
      <ellipse cx="270" cy="190" rx="12" ry="10" fill="#22d3ee" opacity="0.3" />
      <ellipse cx="200" cy="240" rx="45" ry="35" fill="#c084fc" opacity="0.06" />
      <ellipse cx="200" cy="240" rx="22" ry="18" fill="#c084fc" opacity="0.12" />
      <ellipse cx="320" cy="90" rx="40" ry="32" fill="#facc15" opacity="0.06" />
      <ellipse cx="320" cy="90" rx="18" ry="14" fill="#facc15" opacity="0.12" />
      <line x1="100" y1="100" x2="180" y2="140" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
      <line x1="230" y1="160" x2="310" y2="200" stroke="#22d3ee" strokeWidth="0.5" opacity="0.2" />
      <line x1="140" y1="80" x2="140" y2="160" stroke="#4ade80" strokeWidth="0.5" opacity="0.15" />
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">Cas9-GFP | HEK293T | 40x magnification</text>
      <line x1="300" y1="296" x2="360" y2="296" stroke="#555" strokeWidth="0.5" />
      <text x="305" y="310" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">10µm</text>
    </svg>
  );
}

function ProteinStructure() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <defs>
        <linearGradient id="protGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="160" rx="160" ry="140" fill="url(#protGrad)" />
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 60 + i * 8;
        return (
          <ellipse key={i}
            cx={200 + Math.cos(angle) * r * 0.4}
            cy={160 + Math.sin(angle) * r * 0.4}
            rx={12 + i * 1.5}
            ry={8 + i}
            className={i % 2 === 0 ? "fill-crispr-400/10 stroke-crispr-400/30" : "fill-aqua-400/10 stroke-aqua-400/25"}
            strokeWidth="1"
            transform={`rotate(${i * 37}, ${200 + Math.cos(angle) * r * 0.4}, ${160 + Math.sin(angle) * r * 0.4})`}
          />
        );
      })}
      <path d="M120 80 Q150 60 180 90 Q210 120 240 95 Q270 70 300 100" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M100 200 Q140 220 170 190 Q200 160 230 195 Q260 230 290 200" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M160 60 Q180 100 200 80 Q220 60 240 100" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25" />
      <ellipse cx="180" cy="140" rx="20" ry="18" fill="#4ade80" opacity="0.08" />
      <ellipse cx="220" cy="180" rx="16" ry="14" fill="#22d3ee" opacity="0.08" />
      <circle cx="200" cy="160" r="4" fill="#facc15" opacity="0.4" />
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">Cas9-sgRNA complex | Cryo-EM 2.9Å</text>
    </svg>
  );
}

function DNAElectropherogram() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <text x="12" y="24" fontSize="10" fill="#666" fontFamily="monospace">Sequencing: Target site — chr19:45,231,042</text>
      <line x1="0" y1="40" x2="400" y2="40" stroke="#333" strokeWidth="0.5" />
      {["A","T","G","C","T","A","C","G","G","A","T","C","C","T","A","G","G","A","T","C","G","A","T","C","G","A","T","C","G","A","T","C","G","A","T","C","G","A","T","C"].map((base, i) => {
        const colors = { A: "#4ade80", T: "#f43f5e", G: "#facc15", C: "#22d3ee" };
        const peaks = { A: 60 + Math.random() * 60, T: 40 + Math.random() * 80, G: 50 + Math.random() * 70, C: 45 + Math.random() * 75 };
        return (
          <g key={i}>
            <line x1={8 + i * 9.5} y1={280} x2={8 + i * 9.5} y2={280 - peaks[base]} stroke={colors[base]} strokeWidth="1.5" opacity={0.7} />
            <text x={5 + i * 9.5} y={298} fontSize="9" fill={colors[base]} fontFamily="monospace" opacity={0.8}>{base}</text>
          </g>
        );
      })}
      <line x1="0" y1="280" x2="400" y2="280" stroke="#444" strokeWidth="0.5" strokeDasharray="4 2" />
      <rect x="180" y="38" width="80" height="244" fill="#4ade80" opacity="0.04" rx="2" />
      <text x="185" y="54" fontSize="8" fill="#4ade80" fontFamily="monospace" opacity="0.6">PAM site</text>
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">Sanger sequencing — on-target editing validation</text>
    </svg>
  );
}

function GenomeEditingDiagram() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <text x="12" y="20" fontSize="10" fill="#666" fontFamily="DM Sans, sans-serif">Target: PCSK9 locus</text>
      <line x1="40" y1="60" x2="360" y2="60" stroke="#555" strokeWidth="1" />
      <line x1="40" y1="68" x2="360" y2="68" stroke="#555" strokeWidth="1" opacity="0.5" />
      <line x1="40" y1="76" x2="360" y2="76" stroke="#555" strokeWidth="1" opacity="0.25" />
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i => (
        <text key={i} x={42 + i * 15} y={56} fontSize="9" fill="#999" fontFamily="monospace">
          {["A","T","G","C","T","A","C","G","G","A","T","C","C","T","A","G","G","A","T","C","G"][i]}
        </text>
      ))}
      <path d="M195 85 L195 110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M195 110 L175 130 L175 150 M195 110 L215 130 L215 150" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
      <path d="M160 140 L175 130 L175 150 M230 140 L215 130 L215 150" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
      <text x="150" y="165" fontSize="9" fill="#f43f5e" fontFamily="DM Sans, sans-serif">Cas9 cleavage</text>
      <line x1="40" y1="190" x2="360" y2="190" stroke="#4ade80" strokeWidth="1" />
      <line x1="40" y1="198" x2="360" y2="198" stroke="#4ade80" strokeWidth="1" opacity="0.5" />
      <text x="160" y="186" fontSize="9" fill="#4ade80" fontFamily="monospace">HDR repair template</text>
      <path d="M100 130 L100 175" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
      <text x="82" y="145" fontSize="8" fill="#22d3ee" fontFamily="DM Sans, sans-serif" opacity="0.6">gRNA</text>
      <rect x="95" y="215" width="210" height="55" rx="4" fill="#4ade80" opacity="0.05" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
      <text x="105" y="233" fontSize="10" fill="#4ade80" fontFamily="DM Sans, sans-serif">Edited sequence (68% conversion)</text>
      <text x="105" y="251" fontSize="9" fill="#4ade80" fontFamily="monospace">TGG ATC CTA GGA TCG ATC GAT C</text>
      <text x="105" y="265" fontSize="9" fill="#22d3ee" fontFamily="monospace" opacity="0.6">TGG ATC CTA GGA TCG ATC GAT C</text>
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">HDR editing strategy — PCSK9 knockout</text>
    </svg>
  );
}

function Cas9ScissorIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <defs />

      <path d="M160 80 L180 100 L200 80 L220 100 L200 120 L180 100" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M130 100 Q165 90 200 100 Q235 110 270 100" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M130 200 Q165 210 200 200 Q235 190 270 200" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M150 110 Q200 170 250 110" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M150 190 Q200 130 250 190" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.3" />
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={155 + i * 22} cy={98 + (i%2)*4} r="3" fill="#4ade80" opacity={0.3 + i*0.1} />
      ))}
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={155 + i * 22} cy={202 - (i%2)*4} r="3" fill="#22d3ee" opacity={0.3 + i*0.1} />
      ))}
      <text x="175" y="175" fontSize="10" fill="#facc15" fontFamily="DM Sans, sans-serif" opacity="0.8">Cas9</text>
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">Cas9-sgRNA complex — target recognition</text>
    </svg>
  );
}

function ChromatinImmunoprecipitation() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <text x="12" y="20" fontSize="10" fill="#666" fontFamily="DM Sans, sans-serif">ChIP-seq — H3K27ac enrichment</text>
      <path d="M30 100 Q60 50 90 90 Q120 130 150 80 Q180 30 210 100 Q240 170 270 90 Q300 10 330 80 Q360 150 380 100"
        stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M30 120 Q60 160 90 110 Q120 60 150 130 Q180 200 210 120 Q240 40 270 110 Q300 180 330 100 Q360 20 380 120"
        stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.3" />
      {[60, 120, 180, 240, 300, 360].map(x => (
        <line key={x} x1={x} y1={50} x2={x} y2={200} stroke="#333" strokeWidth="0.5" strokeDasharray="1 4" />
      ))}
      <rect x="80" y="220" width="240" height="50" rx="4" fill="#c084fc" opacity="0.06" stroke="#c084fc" strokeWidth="0.5" opacity="0.2" />
      {[90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290].map((x, i) => {
        const h = 10 + Math.random() * 30;
        return (
          <rect key={i} x={x} y={265 - h} width="6" height={h} rx="1" fill="#c084fc" opacity={0.15 + (h/50)} />
        );
      })}
      <text x="100" y="240" fontSize="9" fill="#c084fc" fontFamily="DM Sans, sans-serif" opacity="0.8">Peak: chr19:45,231,042-45,231,842</text>
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">Epigenetic profiling — H3K27ac ChIP-seq</text>
    </svg>
  );
}

function LipidNanoparticle() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
      <rect width="400" height="320" rx="6" className="fill-gray-900" />
      <defs>
        <radialGradient id="lipGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="150" r="80" fill="url(#lipGrad)" />
      <circle cx="200" cy="150" r="70" stroke="#22d3ee" strokeWidth="0.5" opacity="0.15" />
      <circle cx="200" cy="150" r="55" stroke="#22d3ee" strokeWidth="0.5" opacity="0.12" />
      <circle cx="200" cy="150" r="40" stroke="#22d3ee" strokeWidth="0.5" opacity="0.1" />
      <circle cx="200" cy="150" r="25" stroke="#22d3ee" strokeWidth="0.5" opacity="0.08" />
      {[0,1,2,3,4,5,6,7].map(i => {
        const a = (i/8) * Math.PI * 2;
        const r = 62;
        return <ellipse key={i} cx={200 + Math.cos(a)*r} cy={150 + Math.sin(a)*r} rx="12" ry="3" fill="#22d3ee" opacity="0.08" transform={`rotate(${a * 57}, ${200 + Math.cos(a)*r}, ${150 + Math.sin(a)*r})`} />;
      })}
      <circle cx="200" cy="150" r="8" fill="#4ade80" opacity="0.25" />
      <circle cx="200" cy="150" r="4" fill="#4ade80" opacity="0.4" />
      <circle cx="200" cy="150" r="1.5" fill="#facc15" opacity="0.6" />
      <rect x="0" y="290" width="400" height="30" className="fill-gray-900/80" />
      <text x="12" y="310" fontSize="11" fill="#888" fontFamily="DM Sans, sans-serif">LNP-mRNA delivery vehicle — cryo-TEM</text>
    </svg>
  );
}

const cards = [
  {
    type: "image", span: "tall",
    visual: <FluorescentMicroscopy />,
  },
  {
    type: "metrics",
    title: "Editing Efficiency",
    metrics: [
      { value: "97%", label: "HEK293T cells", color: "text-crispr-400" },
      { value: "89%", label: "iPSC-derived neurons", color: "text-aqua-400" },
      { value: "82%", label: "Primary hepatocytes", color: "text-yellow-400" },
      { value: "94%", label: "CD34+ hematopoietic", color: "text-purple-400" },
    ],
  },
  {
    type: "highlight",
    title: "Breakthrough: In Vivo Base Editing",
    tag: "Research Highlight",
    tagColor: "bg-crispr-500/20 text-crispr-400",
    body: "First successful in vivo base editing in non-human primates achieved 68% conversion of PCSK9 gene, reducing LDL cholesterol by 59% for over 8 months with no detectable off-target effects.",
    source: "Nature Biotechnology, 2025",
  },
  {
    type: "image", span: "wide",
    visual: <ProteinStructure />,
  },
  {
    type: "metrics",
    title: "Clinical Pipeline",
    metrics: [
      { value: "12", label: "Phase I trials", color: "text-crispr-400" },
      { value: "7", label: "Phase II trials", color: "text-aqua-400" },
      { value: "3", label: "Phase III trials", color: "text-yellow-400" },
      { value: "2", label: "FDA filings 2026", color: "text-rose-400" },
    ],
  },
  {
    type: "highlight",
    title: "DELIVER Trial Results",
    tag: "Clinical Data",
    tagColor: "bg-aqua-500/20 text-aqua-400",
    body: "Phase II DELIVER trial for hereditary transthyretin amyloidosis met all primary endpoints. 96% reduction in serum TTR protein levels sustained at 12 months. No treatment-related serious adverse events.",
    source: "New England Journal of Medicine, 2025",
  },
  {
    type: "image", span: "tall",
    visual: <DNAElectropherogram />,
  },
  {
    type: "highlight",
    title: "AI Guide Design Benchmark",
    tag: "Performance",
    tagColor: "bg-purple-500/20 text-purple-400",
    body: "DeepCRISPR v3 achieved top-1 accuracy of 0.94 on the GUIDE-seq benchmark dataset, outperforming all existing models. False positive rate reduced by 73% compared to v2.",
    source: "CRISPR Labs Internal Report, 2026",
  },
  {
    type: "image", span: "wide",
    visual: <GenomeEditingDiagram />,
  },
  {
    type: "metrics",
    title: "Off-Target Reduction",
    metrics: [
      { value: "99.7%", label: "SpCas9-HF1", color: "text-crispr-400" },
      { value: "95.2%", label: "eSpCas9(1.1)", color: "text-aqua-400" },
      { value: "91.8%", label: "HypaCas9", color: "text-yellow-400" },
      { value: "98.1%", label: "Sniper-Cas9", color: "text-purple-400" },
    ],
  },
  {
    type: "image", span: "tall",
    visual: <Cas9ScissorIllustration />,
  },
  {
    type: "highlight",
    title: "Epigenetic Editing Milestone",
    tag: "First-in-Human",
    tagColor: "bg-teal-500/20 text-teal-400",
    body: "First patient dosed in Phase I trial of dCas9-p300 activator for Angelman syndrome. UBE3A gene expression restored to 45% of normal levels in neuronal cell models.",
    source: "ClinicalTrials.gov NCT06543210, 2026",
  },
  {
    type: "image", span: "wide",
    visual: <ChromatinImmunoprecipitation />,
  },
  {
    type: "metrics",
    title: "Delivery Efficiency",
    metrics: [
      { value: "95%", label: "LNP — hepatocytes", color: "text-crispr-400" },
      { value: "88%", label: "AAV9 — CNS neurons", color: "text-aqua-400" },
      { value: "91%", label: "VLP — T cells", color: "text-yellow-400" },
      { value: "79%", label: "AAV2 — retina", color: "text-purple-400" },
    ],
  },
  {
    type: "highlight",
    title: "LNP Formulation v3.2",
    tag: "Platform",
    tagColor: "bg-rose-500/20 text-rose-400",
    body: "Next-generation ionizable lipid achieves 3.2x higher mRNA encapsulation and 2.8x improved endosomal escape. Single-dose in vivo editing efficiency increased to 94% in mouse liver models.",
    source: "CRISPR Labs, 2026",
  },
  {
    type: "image", span: "tall",
    visual: <LipidNanoparticle />,
  },
];

function CardImage({ item }) {
  return (
    <div className="overflow-hidden rounded-2xl min-h-[220px]">
      {item.visual}
    </div>
  );
}

function CardMetrics({ item }) {
  return (
    <>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">{item.title}</h3>
      <div className="space-y-4">
        {item.metrics.map((m, j) => (
          <div key={j} className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">{m.label}</span>
            <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function CardHighlight({ item }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.tagColor} whitespace-nowrap`}>{item.tag}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.body}</p>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 italic">{item.source}</p>
    </>
  );
}

export default function ResearchGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="research" className="section-padding bg-white dark:bg-gray-950" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-600 dark:text-purple-400 mb-3">
              Research Highlights
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Latest <span className="gradient-text">Research</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Breakthrough discoveries, clinical milestones, and performance benchmarks from our labs.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className={`break-inside-avoid ${
                item.visual ? "" : "glass-card p-5"
              }`}
            >
              {item.visual ? <CardImage item={item} /> : item.type === "metrics" ? <CardMetrics item={item} /> : <CardHighlight item={item} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

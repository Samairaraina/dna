import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Theme ── */
const T = {
  bg: "#0B1020",
  card: "#141B34",
  primary: "#00D4FF",
  secondary: "#6C63FF",
  text: "#FFFFFF",
  border: "rgba(255,255,255,0.08)",
};

/* ── Base pair data ── */
const BASE_INFO = {
  A: { name: "Adenine", type: "Purine", pairs: "T", bonds: 2, color: T.primary, desc: "A purine base that pairs with Thymine via two hydrogen bonds. Central to energy transfer (ATP, NADH)." },
  T: { name: "Thymine", type: "Pyrimidine", pairs: "A", bonds: 2, color: "#facc15", desc: "A pyrimidine base that pairs with Adenine. Replaced by Uracil in RNA." },
  G: { name: "Guanine", type: "Purine", pairs: "C", bonds: 3, color: T.secondary, desc: "A purine base that pairs with Cytosine via three hydrogen bonds. Forms G-quadruplex structures." },
  C: { name: "Cytosine", type: "Pyrimidine", pairs: "G", bonds: 3, color: "#4ade80", desc: "A pyrimidine base that pairs with Guanine. Subject to epigenetic methylation." },
};

const FACTS = [
  "Human DNA contains about 3 billion base pairs, yet 99.9% is identical between any two people.",
  "If stretched end-to-end, all DNA in your body would reach the Sun and back ~600 times.",
  "DNA stores data at 215 petabytes per gram — a teaspoon could hold all data on Earth.",
  "CRISPR-Cas9 was adapted from a natural bacterial immune system that remembers viral invaders.",
  "A single base pair mutation in the HBB gene causes sickle cell disease.",
  "Telomeres (chromosome caps) shorten with age; their length is linked to lifespan.",
  "DNA's double helix was discovered by Watson & Crick in 1953, based on Rosalind Franklin's X-ray data.",
  "Epigenetic tags on DNA can be influenced by diet, stress, and environment — and can be inherited.",
];

const DISEASE_MUTATIONS = [
  { name: "Sickle Cell Anemia", gene: "HBB", change: "A → T", pos: 17, desc: "A single A→T substitution causes abnormal hemoglobin." },
  { name: "Cystic Fibrosis", gene: "CFTR", change: "ΔF508", pos: 25, desc: "Deletion of phenylalanine at position 508 disrupts chloride transport." },
  { name: "Huntington's Disease", gene: "HTT", change: "CAG repeat", pos: 33, desc: "Expanded CAG repeats (>40) cause progressive neurodegeneration." },
  { name: "BRCA1 Breast Cancer", gene: "BRCA1", change: "frameshift", pos: 41, desc: "Loss-of-function mutations impair DNA repair, raising cancer risk." },
];

const MODULES = [
  { id: "basics", label: "DNA Basics", done: true },
  { id: "bases", label: "Base Pairs", done: true },
  { id: "mutations", label: "Mutations", done: false },
  { id: "crispr", label: "CRISPR", done: false },
  { id: "replication", label: "Replication", done: false },
];

const MODES = [
  { id: "normal", label: "Normal DNA", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
  { id: "mutated", label: "Mutated DNA", icon: "M12 9v2m0 4h.01" },
  { id: "editing", label: "Gene Editing", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
  { id: "replication", label: "Replication", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
];

/* ── 3D Scene ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[6, 6, 6]} intensity={2} color={T.primary} />
      <pointLight position={[-6, -4, -6]} intensity={1.5} color={T.secondary} />
      <pointLight position={[0, 8, 0]} intensity={0.8} color={T.secondary} />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={0.5} intensity={0.3} color={T.primary} />
    </>
  );
}

function Particles({ count = 250 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) p[i] = (Math.random() - 0.5) * 22;
    return p;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.012;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.04;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={T.primary} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function Nucleotide({ position, color, base, isHovered, isSelected, isMutated, isEdited, isReplicating, onClick, onHover, onUnhover, index }) {
  const [hovered, setHovered] = useState(false);
  const handlePointerOver = (e) => { e.stopPropagation(); setHovered(true); onHover?.(base, index, position); document.body.style.cursor = "pointer"; };
  const handlePointerOut = () => { setHovered(false); onUnhover?.(); document.body.style.cursor = "auto"; };
  const scale = hovered || isSelected ? 1.7 : isMutated ? 1.3 : isEdited ? 1.2 : isReplicating ? 1.15 : 1;
  const eIntensity = isEdited ? 1.0 : hovered ? 0.8 : isSelected ? 0.6 : isMutated ? 0.5 : isReplicating ? 0.3 : 0.15;
  return (
    <group position={position}>
      <Float speed={1 + Math.random() * 0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={(e) => { e.stopPropagation(); onClick?.(base, index); }} scale={scale}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <MeshDistortMaterial color={isEdited ? "#f472b6" : isMutated ? "#f87171" : color} roughness={0.1} metalness={isEdited ? 0.7 : 0.3} distort={isEdited ? 0.3 : hovered ? 0.2 : 0.1} speed={2} emissive={isEdited ? "#f472b6" : isMutated ? "#f87171" : color} emissiveIntensity={eIntensity} />
        </mesh>
      </Float>
    </group>
  );
}

function DnaModel({ radius, height, turns, count, mode, mutationTarget, selectedIndex, hoveredBase, onBaseClick, onBaseHover, onBaseUnhover, replicationProgress, geneHighlight }) {
  const pairs = useMemo(() => {
    const p = []; const seq = [];
    for (let i = 0; i < count; i++) {
      const t = i / count, angle = t * turns * Math.PI * 2, y = t * height - height / 2;
      const x1 = Math.cos(angle) * radius, z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius, z2 = Math.sin(angle + Math.PI) * radius;
      const bases = ["A", "T", "G", "C"], b1 = bases[i % 4], b2 = BASE_INFO[b1].pairs;
      seq.push(b1); p.push({ pos1: [x1, y, z1], pos2: [x2, y, z2], b1, b2, angle, y, index: i });
    }
    return { pairs: p, sequence: seq.join("") };
  }, [radius, height, turns, count]);

  const replicationOffset = useMemo(() => mode !== "replication" || !replicationProgress ? 0 : replicationProgress * 1.8, [mode, replicationProgress]);
  const isReplicating = mode === "replication";

  return (
    <group>
      {pairs.pairs.map((p, i) => {
        let pos1 = p.pos1, pos2 = p.pos2;
        if (isReplicating) pos2 = [p.pos2[0] + replicationOffset, p.pos2[1], p.pos2[2]];
        const isMut = mutationTarget && i >= mutationTarget.start && i <= mutationTarget.end;
        const isSel = i === selectedIndex;
        const isHL = geneHighlight && i >= geneHighlight.start && i <= geneHighlight.end;
        const bondColor = isHL ? T.primary : isMut ? "#f87171" : BASE_INFO[p.b1].color;
        const bondOpacity = isHL ? 0.5 : isMut ? 0.35 : isReplicating ? 0.1 : 0.2;
        return (
          <group key={i}>
            <mesh position={[(pos1[0] + pos2[0]) / 2, (pos1[1] + pos2[1]) / 2, (pos1[2] + pos2[2]) / 2]} rotation={[0, 0, Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0])]}>
              <cylinderGeometry args={[0.025, 0.025, isReplicating ? 0.4 : radius * 1.4, 4]} />
              <meshPhysicalMaterial color={bondColor} transparent opacity={bondOpacity} emissive={isHL ? T.primary : isMut ? "#f87171" : BASE_INFO[p.b1].color} emissiveIntensity={isHL ? 0.6 : isMut ? 0.4 : 0.05} />
            </mesh>
            {isReplicating && (
              <mesh position={pos1} rotation={[0, 0, Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0])]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
                <meshPhysicalMaterial color="#facc15" transparent opacity={0.3} />
              </mesh>
            )}
            <Nucleotide position={pos1} color={BASE_INFO[p.b1].color} base={p.b1} index={i} isHovered={hoveredBase?.index === i && hoveredBase?.strand === 1} isSelected={isSel} isMutated={isMut && mode === "mutated"} isEdited={isMut && mode === "editing"} isReplicating={isReplicating} onClick={onBaseClick} onHover={onBaseHover} onUnhover={onBaseUnhover} />
            <Nucleotide position={pos2} color={BASE_INFO[p.b2].color} base={p.b2} index={i} isHovered={hoveredBase?.index === i && hoveredBase?.strand === 2} isSelected={isSel} isMutated={isMut && mode === "mutated"} isEdited={isMut && mode === "editing"} isReplicating={isReplicating} onClick={onBaseClick} onHover={onBaseHover} onUnhover={onBaseUnhover} />
          </group>
        );
      })}
    </group>
  );
}

function Backbones({ radius, height, turns, mode, replicationProgress }) {
  const helixPoints = useCallback((offset) => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80, angle = t * turns * Math.PI * 2 + offset, y = t * height - height / 2;
      const r = mode === "replication" && offset > 0 ? radius + replicationProgress * 1.8 : radius;
      pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [radius, height, turns, mode, replicationProgress]);

  const curve1 = useMemo(() => helixPoints(0), [helixPoints]);
  const curve2 = useMemo(() => helixPoints(Math.PI), [helixPoints]);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve1, 120, 0.03, 6, false]} />
        <meshPhysicalMaterial color={T.primary} transparent opacity={0.3} roughness={0.2} metalness={0.5} emissive={T.primary} emissiveIntensity={0.12} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 120, 0.03, 6, false]} />
        <meshPhysicalMaterial color={T.secondary} transparent opacity={0.3} roughness={0.2} metalness={0.5} emissive={T.secondary} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function CrisprGuide() {
  const ref = useRef();
  useFrame(({ clock }) => { if (ref.current) ref.current.position.y = -2.5 + (Math.sin(clock.elapsedTime * 0.3) * 0.5 + 0.5) * 5; });
  return (
    <group ref={ref}>
      <mesh position={[2.8, 0, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshPhysicalMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[2.2, -0.15, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshPhysicalMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[2.4 + i * 0.12, 0.1 + Math.sin(i) * 0.04, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhysicalMaterial color={T.secondary} emissive={T.secondary} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ mode, mutationTarget, selectedIndex, hoveredBase, onBaseClick, onBaseHover, onBaseUnhover, replicationProgress, geneHighlight }) {
  return (
    <>
      <SceneLights />
      <Particles />
      <group rotation={[0.2, 0.4, 0]}>
        <Backbones radius={2} height={6} turns={3} mode={mode} replicationProgress={replicationProgress} />
        <DnaModel radius={2} height={6} turns={3} count={36} mode={mode} mutationTarget={mutationTarget} selectedIndex={selectedIndex} hoveredBase={hoveredBase} onBaseClick={onBaseClick} onBaseHover={onBaseHover} onBaseUnhover={onBaseUnhover} replicationProgress={replicationProgress} geneHighlight={geneHighlight} />
        {mode === "editing" && <CrisprGuide />}
      </group>
      <OrbitControls enablePan={false} minDistance={3} maxDistance={12} autoRotate={mode !== "replication"} autoRotateSpeed={mode === "editing" ? 0.5 : 1} enableDamping dampingFactor={0.08} />
    </>
  );
}

/* ── UI Components ── */
function GlassCard({ children, className = "" }) {
  return <div className={`rounded-xl p-4 ${className}`} style={{ background: T.card, border: `1px solid ${T.border}`, backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>{children}</div>;
}

function ModeButton({ m, active, onClick }) {
  const activeGrad = m.id === "normal" ? `linear-gradient(135deg, ${T.primary}, ${T.secondary})` : m.id === "mutated" ? "linear-gradient(135deg, #f87171, #fb923c)" : m.id === "editing" ? "linear-gradient(135deg, #a855f7, #ec4899)" : "linear-gradient(135deg, #facc15, #eab308)";
  return (
    <button onClick={() => onClick(m.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300" style={{ background: active ? activeGrad : "transparent", color: active ? "#fff" : "rgba(255,255,255,0.5)", border: active ? "none" : `1px solid ${T.border}` }}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg>
      {m.label}
    </button>
  );
}

function InfoPanel({ base, index, onClose }) {
  if (!base) return null;
  const info = BASE_INFO[base];
  if (!info) return null;
  return (
    <GlassCard className="text-sm space-y-2 animate-fade-in-up">
      <div className="flex items-center justify-between"><span className="text-white font-bold text-base" style={{ color: T.text }}>{info.name}</span>
        <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold" style={{ background: info.color + "30", color: info.color }}>{base}</span>
        <span className="text-gray-400 text-[10px]">{info.type} · Pairs with <span style={{ color: info.color }}>{info.pairs}</span> ({info.bonds} H-bonds)</span>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed">{info.desc}</p>
      <div className="pt-1 border-t" style={{ borderColor: T.border }}><span className="text-[10px] text-gray-500">Position: {index}</span></div>
    </GlassCard>
  );
}

function DidYouKnow({ fact, onNext }) {
  return (
    <GlassCard>
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">🧬</span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: T.primary }}>Did You Know?</div>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{fact}</p>
        </div>
        <button onClick={onNext} className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 p-1" style={{ color: T.primary }}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></button>
      </div>
    </GlassCard>
  );
}

function DiseaseList({ diseases, onSelect }) {
  return (
    <GlassCard>
      <h4 className="text-xs font-semibold mb-3" style={{ color: T.text }}>Real-World Disease Mutations</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {diseases.map((d, i) => (
          <button key={i} onClick={() => onSelect?.(d)} className="text-left p-2 rounded-lg transition-all group" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}` }}>
            <div className="text-xs font-medium group-hover:text-red-400 transition-colors" style={{ color: T.text }}>{d.name}</div>
            <div className="text-[10px] mt-0.5 font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{d.gene} · {d.change}</div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleChange = (e) => { const v = e.target.value.toUpperCase().replace(/[^ATGC]/g, ""); setQuery(v); onSearch(v); };
  return (
    <div className="relative">
      <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input type="text" value={query} onChange={handleChange} placeholder="Search A, T, G, C..." className="w-full pl-8 pr-2.5 py-1.5 rounded-lg text-xs font-mono text-white placeholder-opacity-50 focus:outline-none transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, color: T.text }} maxLength={20} />
    </div>
  );
}

function ProgressTracker({ modules }) {
  const done = modules.filter((m) => m.done).length;
  return (
    <GlassCard className="hidden md:block">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.primary }}>Progress</span>
        <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{done}/{modules.length}</span>
      </div>
      <div className="flex gap-1">
        {modules.map((m) => (
          <div key={m.id} className="h-1.5 flex-1 rounded-full transition-all" style={{ background: m.done ? T.primary : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <div className="flex gap-1.5 mt-1.5 flex-wrap">
        {modules.map((m) => (
          <span key={m.id} className="text-[9px]" style={{ color: m.done ? T.primary : "rgba(255,255,255,0.25)" }}>{m.label}</span>
        ))}
      </div>
    </GlassCard>
  );
}

/* ── Main ── */
export default function DnaExplorer() {
  const [mode, setMode] = useState("normal");
  const [selectedBase, setSelectedBase] = useState(null);
  const [hoveredBase, setHoveredBase] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mutationTarget, setMutationTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [replicationProgress, setReplicationProgress] = useState(0);
  const [showAiExplain, setShowAiExplain] = useState(false);
  const [geneHighlight, setGeneHighlight] = useState(null);

  const nextFact = useCallback(() => setFactIndex((i) => (i + 1) % FACTS.length), []);

  useEffect(() => {
    if (mode === "replication") {
      const start = Date.now();
      const interval = setInterval(() => { const elapsed = (Date.now() - start) / 1000; setReplicationProgress(Math.min(elapsed / 4, 1)); if (elapsed >= 4) clearInterval(interval); }, 50);
      return () => clearInterval(interval);
    } else setReplicationProgress(0);
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode); setSelectedBase(null); setSelectedIndex(null); setGeneHighlight(newMode === "mutated" ? { start: 14, end: 18 } : newMode === "editing" ? { start: 22, end: 26 } : null);
    if (newMode === "mutated") setMutationTarget({ start: 14, end: 18 });
    else if (newMode === "editing") setMutationTarget({ start: 22, end: 26 });
    else setMutationTarget(null);
  };

  const handleBaseClick = (base, index) => { setSelectedBase(base); setSelectedIndex(index === selectedIndex ? null : index); };
  const handleBaseHover = (base, index, position) => setHoveredBase({ base, index, position });
  const handleBaseUnhover = () => setHoveredBase(null);

  const handleDiseaseSelect = (disease) => {
    setMode("mutated"); setMutationTarget({ start: disease.pos - 2, end: disease.pos + 2 }); setGeneHighlight({ start: disease.pos - 2, end: disease.pos + 2 }); setSelectedBase("T");
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "min(85vh, 700px)", background: T.bg, border: `1px solid ${T.border}` }}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex flex-wrap items-center gap-2" style={{ background: `linear-gradient(to bottom, ${T.bg}dd, transparent)` }}>
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}` }}>
          {MODES.map((m) => <ModeButton key={m.id} m={m} active={mode === m.id} onClick={handleModeChange} />)}
        </div>
        <div className="hidden sm:block flex-1 min-w-[100px] max-w-[180px]"><SearchBar onSearch={setSearchQuery} /></div>
        <button onClick={() => setShowAiExplain(!showAiExplain)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: showAiExplain ? T.secondary : "transparent", color: "#fff", border: `1px solid ${showAiExplain ? T.secondary : T.border}` }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          {showAiExplain ? "Hide AI" : "AI Explain"}
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} dpr={[1, 1.5]} style={{ background: T.bg }}>
        <fog attach="fog" args={[T.bg, 10, 20]} />
        <Scene mode={mode} mutationTarget={mutationTarget} selectedIndex={selectedIndex} hoveredBase={hoveredBase} onBaseClick={handleBaseClick} onBaseHover={handleBaseHover} onBaseUnhover={handleBaseUnhover} replicationProgress={replicationProgress} geneHighlight={geneHighlight} />
      </Canvas>

      {/* Right panel stack */}
      <div className="absolute top-14 right-3 z-20 flex flex-col gap-2 max-w-[250px] w-full pointer-events-none">
        {selectedBase && <div className="pointer-events-auto"><InfoPanel base={selectedBase} index={selectedIndex} onClose={() => { setSelectedBase(null); setSelectedIndex(null); }} /></div>}
        {showAiExplain && <div className="pointer-events-auto"><GlassCard className="text-xs space-y-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          <p className="leading-relaxed"><strong style={{ color: T.text }}>DNA</strong> is a molecule carrying genetic instructions. Two strands form a <strong style={{ color: T.primary }}>double helix</strong> with four bases: Adenine (<strong style={{ color: BASE_INFO.A.color }}>A</strong>), Thymine (<strong style={{ color: BASE_INFO.T.color }}>T</strong>), Guanine (<strong style={{ color: BASE_INFO.G.color }}>G</strong>), and Cytosine (<strong style={{ color: BASE_INFO.C.color }}>C</strong>).</p>
          <p className="leading-relaxed"><strong style={{ color: "#facc15" }}>Mutations</strong> are sequence changes — some cause disease. <strong style={{ color: T.secondary }}>CRISPR</strong> edits DNA at precise locations.</p>
        </GlassCard></div>}
      </div>

      {/* Replication overlay */}
      {mode === "replication" && replicationProgress >= 1 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <GlassCard className="px-8 py-6 text-center max-w-sm">
            <div className="text-4xl mb-3">🧬</div>
            <h3 className="text-lg font-bold mb-1" style={{ color: T.text }}>Replication Complete</h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Two identical DNA molecules formed. Each strand served as a template for a new complementary strand.</p>
          </GlassCard>
        </div>
      )}

      {/* Bottom row */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col md:flex-row gap-2 items-end">
        <div className="md:w-64 flex-shrink-0"><DidYouKnow fact={FACTS[factIndex]} onNext={nextFact} /></div>
        <div className="flex-1 min-w-0 hidden md:flex gap-2">
          <div className="flex-1"><DiseaseList diseases={DISEASE_MUTATIONS} onSelect={handleDiseaseSelect} /></div>
          <div className="w-36 flex-shrink-0"><ProgressTracker modules={MODULES} /></div>
        </div>
      </div>

      {/* Gene highlight legend */}
      {geneHighlight && mode === "mutated" && (
        <div className="absolute top-14 left-3 z-20">
          <GlassCard className="px-3 py-1.5">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="w-2 h-2 rounded-full" style={{ background: T.primary, boxShadow: `0 0 6px ${T.primary}` }} />
              <span style={{ color: "rgba(255,255,255,0.6)" }}>Gene region highlighted</span>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

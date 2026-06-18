import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

/* ── Base pair data ── */
const BASE_INFO = {
  A: { name: "Adenine", type: "Purine", pairs: "T", bonds: 2, color: "#4ade80", desc: "A purine base that pairs with Thymine via two hydrogen bonds. Central to energy transfer (ATP, NADH)." },
  T: { name: "Thymine", type: "Pyrimidine", pairs: "A", bonds: 2, color: "#facc15", desc: "A pyrimidine base that pairs with Adenine. Replaced by Uracil in RNA." },
  G: { name: "Guanine", type: "Purine", pairs: "C", bonds: 3, color: "#22d3ee", desc: "A purine base that pairs with Cytosine via three hydrogen bonds. Forms G-quadruplex structures." },
  C: { name: "Cytosine", type: "Pyrimidine", pairs: "G", bonds: 3, color: "#c084fc", desc: "A pyrimidine base that pairs with Guanine. Subject to epigenetic methylation." },
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

/* ── Mode config ── */
const MODES = [
  { id: "normal", label: "Normal DNA", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", color: "from-crispr-400 to-aqua-400" },
  { id: "mutated", label: "Mutated DNA", icon: "M12 9v2m0 4h.01", color: "from-red-400 to-orange-400" },
  { id: "editing", label: "Gene Editing", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", color: "from-purple-400 to-pink-400" },
  { id: "replication", label: "Replication", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: "from-yellow-300 to-yellow-500" },
];

/* ── Scene lighting ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 6, 6]} intensity={1.8} color="#4ade80" />
      <pointLight position={[-6, -4, -6]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#22d3ee" />
    </>
  );
}

/* ── Particle field ── */
function Particles({ count = 200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) p[i] = (Math.random() - 0.5) * 20;
    return p;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ── Nucleotide sphere ── */
function Nucleotide({ position, color, base, isHovered, isSelected, isMutated, isEdited, isReplicating, onClick, onHover, onUnhover, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover?.(base, index, position);
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    setHovered(false);
    onUnhover?.();
    document.body.style.cursor = "auto";
  };

  const scale = hovered || isSelected ? 1.7 : isMutated ? 1.3 : isEdited ? 1.2 : isReplicating ? 1.15 : 1;
  const emissiveIntensity = isEdited ? 1.0 : hovered ? 0.8 : isSelected ? 0.6 : isMutated ? 0.5 : isReplicating ? 0.3 : 0.15;

  return (
    <group position={position}>
      <Float speed={1 + Math.random() * 0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={(e) => { e.stopPropagation(); onClick?.(base, index); }} scale={scale}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <MeshDistortMaterial
            color={isEdited ? "#f472b6" : isMutated ? "#f87171" : color}
            roughness={0.15}
            metalness={isEdited ? 0.7 : 0.3}
            distort={isEdited ? 0.3 : hovered ? 0.2 : 0.1}
            speed={2}
            emissive={isEdited ? "#f472b6" : isMutated ? "#f87171" : color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ── DNA double helix ── */
function DnaModel({ radius, height, turns, count, mode, mutationTarget, selectedIndex, hoveredBase, onBaseClick, onBaseHover, onBaseUnhover, replicationProgress }) {
  const pairs = useMemo(() => {
    const p = [];
    const seq = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * turns * Math.PI * 2;
      const y = t * height - height / 2;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const bases = ["A", "T", "G", "C"];
      const b1 = bases[i % 4];
      const b2 = BASE_INFO[b1].pairs;
      seq.push(b1);
      p.push({ pos1: [x1, y, z1], pos2: [x2, y, z2], b1, b2, angle, y, index: i });
    }
    return { pairs: p, sequence: seq.join("") };
  }, [radius, height, turns, count]);

  /* Replication: move strand2 outward */
  const replicationOffset = useMemo(() => {
    if (mode !== "replication" || !replicationProgress) return 0;
    return replicationProgress * 1.8;
  }, [mode, replicationProgress]);

  const strandRef = useRef();
  useFrame(({ clock }) => {
    if (strandRef.current) {
      const opacity = 0.25 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
      strandRef.current.children.forEach((child) => {
        if (child.material) child.material.opacity = opacity;
      });
    }
  });

  const isReplicating = mode === "replication";

  return (
    <group ref={strandRef}>
      {pairs.pairs.map((p, i) => {
        let pos1 = p.pos1;
        let pos2 = p.pos2;
        if (isReplicating) {
          pos2 = [p.pos2[0] + replicationOffset, p.pos2[1], p.pos2[2]];
        }
        const isMut = mutationTarget && i >= mutationTarget.start && i <= mutationTarget.end;
        const isSel = i === selectedIndex;
        return (
          <group key={i}>
            <mesh position={[
              (pos1[0] + pos2[0]) / 2,
              (pos1[1] + pos2[1]) / 2,
              (pos1[2] + pos2[2]) / 2,
            ]} rotation={[0, 0, Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0])]}>
              <cylinderGeometry args={[0.025, 0.025, isReplicating ? 0.4 : radius * 1.4, 4]} />
              <meshPhysicalMaterial
                color={isMut ? "#f87171" : BASE_INFO[p.b1].color}
                transparent
                opacity={isReplicating ? 0.1 : 0.2}
                emissive={isMut ? "#f87171" : BASE_INFO[p.b1].color}
                emissiveIntensity={isMut ? 0.4 : 0.05}
              />
            </mesh>
            {isReplicating && (
              <mesh position={pos1} rotation={[0, 0, Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0])]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
                <meshPhysicalMaterial color="#facc15" transparent opacity={0.3} />
              </mesh>
            )}
            <Nucleotide
              position={pos1}
              color={BASE_INFO[p.b1].color}
              base={p.b1}
              index={i}
              isHovered={hoveredBase?.index === i && hoveredBase?.strand === 1}
              isSelected={isSel}
              isMutated={isMut && mode === "mutated"}
              isEdited={isMut && mode === "editing"}
              isReplicating={isReplicating}
              onClick={onBaseClick}
              onHover={onBaseHover}
              onUnhover={onBaseUnhover}
            />
            <Nucleotide
              position={pos2}
              color={BASE_INFO[p.b2].color}
              base={p.b2}
              index={i}
              isHovered={hoveredBase?.index === i && hoveredBase?.strand === 2}
              isSelected={isSel}
              isMutated={isMut && mode === "mutated"}
              isEdited={isMut && mode === "editing"}
              isReplicating={isReplicating}
              onClick={onBaseClick}
              onHover={onBaseHover}
              onUnhover={onBaseUnhover}
            />
          </group>
        );
      })}
    </group>
  );
}

/* ── Strand backbones ── */
function Backbones({ radius, height, turns, mode, replicationProgress }) {
  const helixPoints = useCallback((offset) => {
    const pts = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * turns * Math.PI * 2 + offset;
      const y = t * height - height / 2;
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
        <meshPhysicalMaterial color="#4ade80" transparent opacity={0.35} roughness={0.2} metalness={0.5} emissive="#4ade80" emissiveIntensity={0.15} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 120, 0.03, 6, false]} />
        <meshPhysicalMaterial color="#22d3ee" transparent opacity={0.35} roughness={0.2} metalness={0.5} emissive="#22d3ee" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

/* ── CRISPR guide RNA visual ── */
function CrisprGuide({ progress }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = -2.5 + (progress || Math.sin(clock.elapsedTime * 0.3) * 0.5 + 0.5) * 5;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[2.8, 0, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshPhysicalMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[2.2, -0.15, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshPhysicalMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.4} />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[2.4 + i * 0.12, 0.1 + Math.sin(i) * 0.04, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhysicalMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Scene orchestrator ── */
function Scene({ mode, mutationTarget, selectedIndex, hoveredBase, onBaseClick, onBaseHover, onBaseUnhover, replicationProgress }) {
  return (
    <>
      <SceneLights />
      <Particles />
      <group rotation={[0.2, 0.4, 0]}>
        <Backbones radius={2} height={6} turns={3} mode={mode} replicationProgress={replicationProgress} />
        <DnaModel
          radius={2}
          height={6}
          turns={3}
          count={36}
          mode={mode}
          mutationTarget={mutationTarget}
          selectedIndex={selectedIndex}
          hoveredBase={hoveredBase}
          onBaseClick={onBaseClick}
          onBaseHover={onBaseHover}
          onBaseUnhover={onBaseUnhover}
          replicationProgress={replicationProgress}
        />
        {mode === "editing" && <CrisprGuide />}
      </group>
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        autoRotate={mode !== "replication"}
        autoRotateSpeed={mode === "editing" ? 0.5 : 1}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

/* ── UI Components ── */
function GlassPanel({ children, className = "" }) {
  return (
    <div className={`glass rounded-xl p-4 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function ModeButton({ mode, active, onClick }) {
  return (
    <button
      onClick={() => onClick(mode.id)}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
        active
          ? `bg-gradient-to-r ${mode.color} text-white shadow-lg shadow-black/20`
          : "glass text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={mode.icon} />
      </svg>
      {mode.label}
    </button>
  );
}

function InfoPanel({ base, index, mode, mutationTarget, onClose }) {
  if (!base) return null;
  const info = BASE_INFO[base];
  if (!info) return null;
  return (
    <GlassPanel className="text-sm space-y-2 animate-fade-in-up w-full">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-base">{info.name}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold" style={{ background: info.color + "30", color: info.color }}>{base}</span>
        <span className="text-gray-400 text-[10px]">{info.type} · Pairs with <span style={{ color: info.color }}>{info.pairs}</span> ({info.bonds} H-bonds)</span>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed">{info.desc}</p>
      <div className="pt-1 border-t border-white/5 text-[10px] text-gray-500">Position: {index}</div>
    </GlassPanel>
  );
}

function DidYouKnow({ fact, onNext }) {
  return (
    <GlassPanel className="w-full">
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">🧬</span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-aqua-400 font-semibold uppercase tracking-wider mb-1">Did You Know?</div>
          <p className="text-gray-300 text-xs leading-relaxed">{fact}</p>
        </div>
        <button onClick={onNext} className="text-gray-500 hover:text-aqua-400 transition-colors flex-shrink-0 p-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
      </div>
    </GlassPanel>
  );
}

function DiseaseList({ diseases, onSelect }) {
  return (
    <GlassPanel className="w-full">
      <h4 className="text-xs font-semibold text-white mb-3">Real-World Disease Mutations</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {diseases.map((d, i) => (
          <button
            key={i}
            onClick={() => onSelect?.(d)}
            className="text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/30 transition-all group"
          >
            <div className="text-xs font-medium text-white group-hover:text-red-400 transition-colors">{d.name}</div>
            <div className="text-[10px] text-gray-500 font-mono mt-0.5">{d.gene} · {d.change}</div>
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    const v = e.target.value.toUpperCase().replace(/[^ATGC]/g, "");
    setQuery(v);
    onSearch(v);
  };
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search sequence (A, T, G, C)..."
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-aqua-500/50 transition-colors font-mono"
        maxLength={20}
      />
    </div>
  );
}

function AiExplainButton({ onClick }) {
  const [explaining, setExplaining] = useState(false);
  return (
    <button
      onClick={() => { setExplaining(!explaining); onClick?.(!explaining); }}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
        explaining
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "glass text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      {explaining ? "AI Explanation Active" : "AI Explain"}
    </button>
  );
}

/* ── Main component ── */
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

  /* Cycle facts */
  const nextFact = useCallback(() => setFactIndex((i) => (i + 1) % FACTS.length), []);

  /* Handle mode change */
  useEffect(() => {
    if (mode === "replication") {
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const prog = Math.min(elapsed / 4, 1);
        setReplicationProgress(prog);
        if (prog >= 1) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setReplicationProgress(0);
    }
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSelectedBase(null);
    setSelectedIndex(null);
    if (newMode === "mutated") {
      setMutationTarget({ start: 14, end: 18 });
    } else if (newMode === "editing") {
      setMutationTarget({ start: 22, end: 26 });
    } else {
      setMutationTarget(null);
    }
  };

  const handleBaseClick = (base, index) => {
    setSelectedBase(base);
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleBaseHover = (base, index, position) => {
    setHoveredBase({ base, index, position });
  };

  const handleBaseUnhover = () => {
    setHoveredBase(null);
  };

  const handleDiseaseSelect = (disease) => {
    setMode("mutated");
    setMutationTarget({ start: disease.pos - 2, end: disease.pos + 2 });
    setSelectedBase("T");
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-card" style={{ height: "min(85vh, 700px)" }}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex flex-wrap items-center gap-2 bg-gradient-to-b from-gray-950/80 to-transparent">
        <div className="flex items-center gap-1.5 bg-gray-950/70 backdrop-blur-md rounded-xl p-1 border border-white/5">
          {MODES.map((m) => (
            <ModeButton key={m.id} mode={m} active={mode === m.id} onClick={handleModeChange} />
          ))}
        </div>
        <div className="hidden sm:block flex-1 min-w-[120px] max-w-[200px]">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <AiExplainButton onClick={setShowAiExplain} />
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} dpr={[1, 1.5]} style={{ background: "#020617" }}>
        <fog attach="fog" args={["#020617", 10, 20]} />
        <Scene
          mode={mode}
          mutationTarget={mutationTarget}
          selectedIndex={selectedIndex}
          hoveredBase={hoveredBase}
          onBaseClick={handleBaseClick}
          onBaseHover={handleBaseHover}
          onBaseUnhover={handleBaseUnhover}
          replicationProgress={replicationProgress}
        />
      </Canvas>

      {/* Right side panel stack */}
      <div className="absolute top-16 right-3 z-20 flex flex-col gap-2 max-w-[260px] w-full pointer-events-none">
        {/* Info panel on base click */}
        {selectedBase && (
          <div className="pointer-events-auto">
            <InfoPanel base={selectedBase} index={selectedIndex} mode={mode} mutationTarget={mutationTarget} onClose={() => { setSelectedBase(null); setSelectedIndex(null); }} />
          </div>
        )}
        {/* AI Explanation panel */}
        {showAiExplain && (
          <div className="pointer-events-auto">
            <GlassPanel className="text-sm space-y-2 text-gray-300">
              <p className="text-xs leading-relaxed">
                <strong className="text-white">DNA</strong> (deoxyribonucleic acid) is a molecule that carries genetic instructions. 
                It consists of two strands forming a <strong className="text-aqua-400">double helix</strong>. 
                Each strand is made of <strong className="text-crispr-400">nucleotides</strong> containing one of four bases: 
                Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).
              </p>
              <p className="text-xs leading-relaxed">
                <strong className="text-yellow-400">Mutations</strong> are changes in the DNA sequence. 
                Some cause disease; others are harmless. <strong className="text-purple-400">CRISPR</strong> 
                is a tool that can edit specific DNA locations with precision.
              </p>
            </GlassPanel>
          </div>
        )}
      </div>

      {/* Replication overlay */}
      {mode === "replication" && replicationProgress >= 1 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="glass rounded-2xl px-8 py-6 text-center animate-fade-in-up max-w-sm">
            <div className="text-4xl mb-3">🧬</div>
            <h3 className="text-lg font-bold text-white mb-1">Replication Complete</h3>
            <p className="text-xs text-gray-400">Two identical DNA molecules formed. Each strand served as a template for a new complementary strand.</p>
          </div>
        </div>
      )}

      {/* Bottom row: Did You Know (left) + Disease cards (right) */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col md:flex-row gap-2">
        <div className="md:w-72 flex-shrink-0">
          <DidYouKnow fact={FACTS[factIndex]} onNext={nextFact} />
        </div>
        <div className="flex-1 min-w-0 hidden md:block">
          <DiseaseList diseases={DISEASE_MUTATIONS} onSelect={handleDiseaseSelect} />
        </div>
      </div>
    </div>
  );
}

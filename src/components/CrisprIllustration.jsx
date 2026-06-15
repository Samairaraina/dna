export default function CrisprIllustration() {
  return (
    <svg viewBox="0 0 500 320" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="c1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="c3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* DNA strand (left side) */}
      <g className="opacity-40">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const y = 30 + i * 30;
          const phase = i * 0.6;
          return (
            <g key={i}>
              <line x1={60 + Math.sin(phase) * 20} y1={y} x2={60 - Math.sin(phase) * 20} y2={y} stroke="#4ade80" strokeWidth="1.5" />
              <circle cx={60 + Math.sin(phase) * 20} cy={y} r="3" fill="#4ade80" />
              <circle cx={60 - Math.sin(phase) * 20} cy={y} r="3" fill="#22d3ee" />
            </g>
          );
        })}
      </g>

      {/* Cas9 protein - scissor shape */}
      <g transform="translate(160, 100)">
        <path d="M0 60 Q30 30 60 0" stroke="url(#c1)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M60 60 Q30 30 0 0" stroke="url(#c1)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="0" r="8" fill="url(#c1)" className="opacity-80" />
        <circle cx="0" cy="0" r="8" fill="url(#c1)" className="opacity-80" />
        <rect x="25" y="20" width="10" height="40" rx="3" fill="url(#c1)" className="opacity-60" />
      </g>

      {/* Guide RNA - curved line */}
      <path d="M130 140 Q110 120 120 90 Q130 60 160 70" stroke="url(#c2)" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="6 3" />
      <text x="100" y="110" className="text-[8px] fill-yellow-400 opacity-60">gRNA</text>

      {/* Target DNA sequence */}
      <g transform="translate(180, 20)">
        <rect x="0" y="0" width="260" height="40" rx="8" className="fill-white/10 dark:fill-white/5" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 2" className="opacity-30" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <rect key={i} x={6 + i * 19} y="5" width="15" height="30" rx="3" fill={i % 2 === 0 ? "#4ade80" : "#22d3ee"} className="opacity-40" />
        ))}
        {/* Cut site indicator */}
        <line x1="120" y1="-5" x2="120" y2="45" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" className="opacity-60" />
        <text x="115" y="-8" className="text-[9px] fill-yellow-400 opacity-70">Cut site</text>
      </g>

      {/* DNA repair result - right side */}
      <g transform="translate(180, 170)">
        <rect x="0" y="0" width="260" height="40" rx="8" className="fill-white/10 dark:fill-white/5" stroke="#22d3ee" strokeWidth="1" className="opacity-30" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <rect key={i} x={6 + i * 22} y="5" width="18" height="30" rx="3" fill="#22d3ee" className="opacity-50" />
        ))}
        {/* Repaired segment highlight */}
        <rect x="82" y="2" width="66" height="36" rx="5" stroke="#4ade80" strokeWidth="2" fill="none" className="opacity-70" strokeDasharray="3 2" />
      </g>

      {/* Arrow connecting cut to repair */}
      <g className="opacity-50">
        <path d="M300 105 Q340 140 300 170" stroke="#facc15" strokeWidth="2" strokeLinecap="round" fill="none" markerEnd="url(#arrow)" />
        <polygon points="298,168 305,165 302,174" fill="#facc15" />
      </g>

      {/* Labels */}
      <text x="30" y="290" className="text-[10px] fill-gray-400">DNA double helix</text>
      <text x="180" y="70" className="text-[10px] fill-gray-400">Target DNA sequence</text>
      <text x="180" y="220" className="text-[10px] fill-gray-400">Edited / repaired DNA</text>
      <text x="320" y="145" className="text-[10px] fill-yellow-500">Gene editing</text>

      {/* Cas9 label */}
      <text x="150" y="160" className="text-[9px] fill-aqua-400">Cas9</text>
    </svg>
  );
}

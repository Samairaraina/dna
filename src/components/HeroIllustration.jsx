export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 500" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="h1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="h3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Double helix */}
      <g filter="url(#glow)">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
          const y = 40 + i * 32;
          const phase = i * 0.5;
          const x1 = 160 + Math.sin(phase) * 50;
          const x2 = 160 - Math.sin(phase) * 50;
          return (
            <g key={i}>
              <ellipse cx="160" cy={y} rx="50" ry="4" className="opacity-20" stroke="url(#h1)" strokeWidth="1.5" fill="none" />
              <circle cx={x1} cy={y} r="4" fill="#4ade80" className="opacity-40" />
              <circle cx={x2} cy={y} r="4" fill="#22d3ee" className="opacity-40" />
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#facc15" strokeWidth="1" className="opacity-20" />
            </g>
          );
        })}
      </g>

      {/* Molecular nodes */}
      <g className="opacity-30">
        <circle cx="80" cy="100" r="20" fill="url(#h1)" />
        <circle cx="300" cy="80" r="15" fill="url(#h3)" />
        <circle cx="50" cy="300" r="12" fill="url(#h2)" />
        <circle cx="320" cy="350" r="18" fill="url(#h1)" />
        <circle cx="100" cy="420" r="14" fill="url(#h3)" />
        <circle cx="280" cy="200" r="10" fill="url(#h2)" />
      </g>

      {/* Connecting lines */}
      <g className="opacity-20">
        <line x1="80" y1="100" x2="160" y2="140" stroke="#4ade80" strokeWidth="1" />
        <line x1="300" y1="80" x2="210" y2="104" stroke="#22d3ee" strokeWidth="1" />
        <line x1="50" y1="300" x2="110" y2="280" stroke="#facc15" strokeWidth="1" />
        <line x1="320" y1="350" x2="210" y2="360" stroke="#4ade80" strokeWidth="1" />
        <line x1="100" y1="420" x2="160" y2="400" stroke="#22d3ee" strokeWidth="1" />
        <line x1="280" y1="200" x2="210" y2="232" stroke="#facc15" strokeWidth="1" />
      </g>

      {/* Central molecular structure */}
      <g className="opacity-25">
        <circle cx="160" cy="250" r="60" stroke="url(#h1)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <circle cx="160" cy="250" r="40" stroke="url(#h2)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
        <circle cx="160" cy="250" r="20" fill="url(#h3)" />
        <circle cx="160" cy="250" r="8" fill="#22d3ee" className="opacity-60" />
      </g>

      {/* Floating particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={`p${i}`} cx={40 + i * 60} cy={450 - i * 20} r="2" fill="#4ade80" className="opacity-30" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={`q${i}`} cx={320 + i * 20} cy={40 + i * 30} r="1.5" fill="#22d3ee" className="opacity-25" />
      ))}
    </svg>
  );
}

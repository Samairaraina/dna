const illustrations = {
  healthcare: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className="fill-rose-50 dark:fill-rose-900/20" stroke="#f43f5e" strokeWidth="1" className="opacity-30" />
      <path d="M60 38v44M38 60h44" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
      <circle cx="60" cy="60" r="8" fill="#f43f5e" className="opacity-30" />
    </svg>
  ),
  cancer: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="60" cy="60" r="54" className="fill-purple-50 dark:fill-purple-900/20" stroke="#a855f7" strokeWidth="1" className="opacity-30" />
      <circle cx="60" cy="60" r="20" stroke="#a855f7" strokeWidth="2.5" fill="none" className="opacity-50" strokeDasharray="4 3" />
      <circle cx="60" cy="60" r="8" fill="#a855f7" className="opacity-40" />
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <circle key={i}
            cx={60 + Math.cos(angle) * 35}
            cy={60 + Math.sin(angle) * 35}
            r="4" fill="#c084fc" className="opacity-30"
          />
        );
      })}
    </svg>
  ),
  genetics: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="60" cy="60" r="54" className="fill-emerald-50 dark:fill-emerald-900/20" stroke="#10b981" strokeWidth="1" className="opacity-30" />
      <path d="M40 40 Q60 55 80 40 Q60 65 40 80 Q60 65 80 80" stroke="#4ade80" strokeWidth="2" fill="none" className="opacity-50" />
      <circle cx="40" cy="40" r="4" fill="#4ade80" className="opacity-50" />
      <circle cx="80" cy="40" r="4" fill="#22d3ee" className="opacity-50" />
      <circle cx="40" cy="80" r="4" fill="#4ade80" className="opacity-50" />
      <circle cx="80" cy="80" r="4" fill="#22d3ee" className="opacity-50" />
    </svg>
  ),
  agriculture: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="60" cy="60" r="54" className="fill-green-50 dark:fill-green-900/20" stroke="#22c55e" strokeWidth="1" className="opacity-30" />
      <path d="M60 85 V50 M50 60 L60 50 L70 60" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
      <circle cx="60" cy="40" r="12" fill="#86efac" className="opacity-30" />
      <path d="M45 55 Q60 45 75 55" stroke="#facc15" strokeWidth="1.5" fill="none" className="opacity-40" />
    </svg>
  ),
  biotech: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="60" cy="60" r="54" className="fill-cyan-50 dark:fill-cyan-900/20" stroke="#06b6d4" strokeWidth="1" className="opacity-30" />
      <path d="M40 80 L60 40 L80 80" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
      <circle cx="60" cy="40" r="5" fill="#22d3ee" className="opacity-50" />
      <circle cx="40" cy="80" r="5" fill="#4ade80" className="opacity-50" />
      <circle cx="80" cy="80" r="5" fill="#4ade80" className="opacity-50" />
    </svg>
  ),
  drug: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="60" cy="60" r="54" className="fill-amber-50 dark:fill-amber-900/20" stroke="#f59e0b" strokeWidth="1" className="opacity-30" />
      <rect x="45" y="30" width="30" height="60" rx="6" stroke="#facc15" strokeWidth="2" className="opacity-50" fill="none" />
      <rect x="50" y="35" width="20" height="24" rx="3" fill="#facc15" className="opacity-30" />
      <rect x="50" y="64" width="20" height="8" rx="2" fill="#facc15" className="opacity-20" />
      <rect x="50" y="76" width="20" height="8" rx="2" fill="#facc15" className="opacity-20" />
    </svg>
  ),
};

export default function ApplicationIllustration({ type, className = "w-14 h-14" }) {
  return (
    <div className={className}>
      {illustrations[type] || illustrations.healthcare}
    </div>
  );
}

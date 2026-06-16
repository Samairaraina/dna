const illustrations = {
  healthcare: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
  cancer: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 3C12 3 6 8 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 8 12 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  genetics: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6 4C6 4 12 8 6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 20C18 20 12 16 18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="14" y1="10" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="6" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="20" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  agriculture: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 22C12 22 17 17 17 11C17 8.2 14.8 6 12 6C9.2 6 7 8.2 7 11C7 12.5 7.5 14 8.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M14 3L12 2L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  ),
  biotech: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="7" x2="14" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="10" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  drug: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="2" width="8" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
};

export default function ApplicationIllustration({ type, className = "w-full h-full" }) {
  return illustrations[type] || illustrations.healthcare;
}

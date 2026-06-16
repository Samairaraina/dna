import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { path: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { path: "/research", label: "Research", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { path: "/dashboard", label: "Dashboard", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { path: "/publications", label: "Publications", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { path: "/team", label: "Team", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { path: "/contact", label: "Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function Sidebar({ dark, toggleTheme, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();

  const isActive = (path) => path === "/" ? pathname === "/" : pathname.startsWith(path);

  const nav = (
    <div className="flex flex-col h-full">
      <Link to="/" className="flex items-center gap-3 px-5 py-7 border-b border-white/5" onClick={() => setMobileOpen?.(false)}>
        <svg className="w-9 h-9 flex-shrink-0" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" className="fill-crispr-500/20" />
          <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 20c0 4.4-3.6 8-8 8s-8-3.6-8-8" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 14l12 12M14 26l12-12" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="3" className="fill-aqua-400" />
        </svg>
        <div className="leading-tight">
          <span className="text-base font-bold text-white block">CRISPR<span className="text-aqua-400">Labs</span></span>
          <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Research Portal</span>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen?.(false)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-crispr-500/20 via-aqua-500/10 to-transparent border border-white/5"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <svg className={`w-5 h-5 flex-shrink-0 relative ${active ? "text-aqua-400" : "text-gray-500 group-hover:text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              <span className="relative">{link.label}</span>
              {active && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-aqua-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all"
        >
          {dark ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
          <span className="relative">{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-gray-950 border-r border-white/5">
          {nav}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative flex flex-col w-64 max-w-[80vw] min-h-full bg-gray-950 shadow-2xl"
          >
            {nav}
          </motion.aside>
        </div>
      )}
    </>
  );
}

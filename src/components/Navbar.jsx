import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Research", path: "/research" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Publications", path: "/publications" },
  { label: "Team", path: "/team" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg" : "bg-white/0 dark:bg-gray-950/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo className="w-9 h-9" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              CRISPR<span className="text-aqua-500">Labs</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-crispr-600 dark:text-crispr-400 bg-crispr-50 dark:bg-crispr-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-crispr-600 dark:hover:text-crispr-400 hover:bg-crispr-50 dark:hover:bg-crispr-900/20"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2.5 rounded-xl glass hover:shadow-lg transition-all"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass hover:shadow-lg transition-all"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl glass hover:shadow-lg transition-all"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? "text-crispr-600 dark:text-crispr-400 bg-crispr-50 dark:bg-crispr-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-crispr-600 dark:hover:text-crispr-400 hover:bg-crispr-50 dark:hover:bg-crispr-900/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setMobileOpen(false)} />
      )}
    </nav>
  );
}

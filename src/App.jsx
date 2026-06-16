import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTheme } from "./hooks/useTheme";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import PublicationsPage from "./pages/PublicationsPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>CRISPR Labs | Gene Editing Optimization</title>
        <meta name="description" content="Revolutionizing Genetic Engineering with CRISPR Optimization." />
        <meta property="og:title" content="CRISPR Labs - Gene Editing Optimization" />
        <meta property="og:description" content="Revolutionizing Genetic Engineering with CRISPR Optimization" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="CRISPR, gene editing, biotechnology, CRISPR-Cas9, genetic engineering, base editing, prime editing" />
        <link rel="canonical" href="https://crispr-labs.com" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Sidebar dark={dark} toggleTheme={toggle} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <ScrollToTop />

        <div className="lg:pl-64">
          <div className="sticky top-0 z-30 lg:hidden bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between px-4 h-14">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-sm font-bold text-gray-900 dark:text-white">CRISPR<span className="text-aqua-500">Labs</span></span>
              <div className="w-10" />
            </div>
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

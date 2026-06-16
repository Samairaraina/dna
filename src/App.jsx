import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DnaSimulator from "./components/DnaSimulator";
import AboutCRISPR from "./components/AboutCRISPR";
import WhyOptimization from "./components/WhyOptimization";
import OptimizationTech from "./components/OptimizationTech";
import Applications from "./components/Applications";
import ResearchDashboard from "./components/ResearchDashboard";
import FutureTimeline from "./components/FutureTimeline";
import EthicalConsiderations from "./components/EthicalConsiderations";
import ResearchGrid from "./components/ResearchGrid";
import ResearchTeam from "./components/ResearchTeam";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const href = this.getAttribute("href");
          if (href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    };
    handleScroll();
  }, []);

  return (
    <>
      <Helmet>
        <title>CRISPR Labs | Gene Editing Optimization</title>
        <meta name="description" content="Revolutionizing Genetic Engineering with CRISPR Optimization. Discover cutting-edge gene editing technologies for medicine, agriculture, and biotechnology." />
        <meta property="og:title" content="CRISPR Labs - Gene Editing Optimization" />
        <meta property="og:description" content="Revolutionizing Genetic Engineering with CRISPR Optimization" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="CRISPR, gene editing, biotechnology, CRISPR-Cas9, genetic engineering, base editing, prime editing" />
        <link rel="canonical" href="https://crispr-labs.com" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar dark={dark} toggleTheme={toggle} />
        <Hero />
        <DnaSimulator />
        <AboutCRISPR />
        <WhyOptimization />
        <OptimizationTech />
        <Applications />
        <ResearchDashboard />
        <FutureTimeline />
        <EthicalConsiderations />
        <ResearchGrid />
        <ResearchTeam />
        <Publications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;

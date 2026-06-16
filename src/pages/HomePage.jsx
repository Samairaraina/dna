import Hero from "../components/Hero";
import DnaSimulator from "../components/DnaSimulator";
import AboutCRISPR from "../components/AboutCRISPR";
import WhyOptimization from "../components/WhyOptimization";
import OptimizationTech from "../components/OptimizationTech";
import Applications from "../components/Applications";
import FutureTimeline from "../components/FutureTimeline";
import EthicalConsiderations from "../components/EthicalConsiderations";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function HomePage() {
  return (
    <>
      <PageLayout path="/" noBreadcrumbs fullWidth>
        <Hero />
        <DnaSimulator />
        <AboutCRISPR />
        <WhyOptimization />
        <OptimizationTech />
        <Applications />
        <FutureTimeline />
        <EthicalConsiderations />
      </PageLayout>
      <Footer />
    </>
  );
}

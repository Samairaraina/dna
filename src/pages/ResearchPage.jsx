import ResearchGrid from "../components/ResearchGrid";
import ResearchVideo from "../components/ResearchVideo";
import DnaExplorer from "../components/DnaExplorer";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function ResearchPage() {
  return (
    <>
      <PageLayout path="/research">
        <div className="grid grid-cols-1">
          <ResearchVideo />
          <section className="py-10 md:py-16">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-600 dark:text-purple-400 mb-3">
                3D Molecular Viewer
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Interactive DNA <span className="gradient-text">Explorer</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm">
                Explore the double helix structure of DNA. Drag to rotate, scroll to zoom, and inspect the base pair organization.
              </p>
            </div>
            <DnaExplorer />
          </section>
          <ResearchGrid />
        </div>
      </PageLayout>
      <Footer />
    </>
  );
}

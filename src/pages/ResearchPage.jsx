import ResearchGrid from "../components/ResearchGrid";
import ResearchVideo from "../components/ResearchVideo";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function ResearchPage() {
  return (
    <>
      <PageLayout path="/research">
        <div className="grid grid-cols-1">
          <ResearchVideo />
          <ResearchGrid />
        </div>
      </PageLayout>
      <Footer />
    </>
  );
}

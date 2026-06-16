import ResearchGrid from "../components/ResearchGrid";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function ResearchPage() {
  return (
    <>
      <PageLayout path="/research">
        <div className="grid grid-cols-1">
          <ResearchGrid />
        </div>
      </PageLayout>
      <Footer />
    </>
  );
}

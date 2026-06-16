import ResearchTeam from "../components/ResearchTeam";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function TeamPage() {
  return (
    <>
      <PageLayout path="/team">
        <ResearchTeam />
      </PageLayout>
      <Footer />
    </>
  );
}

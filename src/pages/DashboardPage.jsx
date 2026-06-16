import ResearchDashboard from "../components/ResearchDashboard";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function DashboardPage() {
  return (
    <>
      <PageLayout path="/dashboard">
        <div className="-mx-6 lg:-mx-10">
          <ResearchDashboard />
        </div>
      </PageLayout>
      <Footer />
    </>
  );
}

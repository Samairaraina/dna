import Publications from "../components/Publications";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function PublicationsPage() {
  return (
    <>
      <PageLayout path="/publications">
        <Publications />
      </PageLayout>
      <Footer />
    </>
  );
}

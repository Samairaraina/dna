import Contact from "../components/Contact";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

export default function ContactPage() {
  return (
    <>
      <PageLayout path="/contact">
        <Contact />
      </PageLayout>
      <Footer />
    </>
  );
}

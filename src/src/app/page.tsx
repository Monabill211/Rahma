import Navbar from "@/components/Navbar";
import PortfolioHero from "@/components/Hero";
import ServicesSection from "@/components/Services";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main id="home" className="w-full">
      <Navbar />
      <PortfolioHero />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

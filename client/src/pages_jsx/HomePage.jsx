import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Services from "@/components/home/Services";
import BeforeAfter from "@/components/home/BeforeAfter";
import Products from "@/components/home/Products";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import About from "@/components/home/About";
import ContactSection from "@/components/home/ContactSection";
import Cta from "@/components/home/Cta";
import HomePageForm from "@/components/HomePageForm";
import { useEffect, useState } from "react";
const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    document.title = "OM Vinayaga Associates | Building Doctor Franchise";
    // Show the form after a short delay when the page loads
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <Benefits />
      <Services />
      <BeforeAfter />
      <Products />
      <Testimonials />
      <Faq />
      <About />
      <ContactSection />
      <Cta />
      {/* Pass showForm as isOpen prop and handle close event */}
      <HomePageForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};
export default HomePage;

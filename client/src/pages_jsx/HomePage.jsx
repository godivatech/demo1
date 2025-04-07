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
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "OM Vinayaga Associates | Building Doctor Franchise";
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
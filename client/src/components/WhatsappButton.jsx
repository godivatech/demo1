import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../data/company";

const WhatsappButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center ${
        showButton ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
};

export default WhatsappButton;
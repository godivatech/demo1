import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../data/company";
import { pulse } from "../utils/animations";

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
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 sm:right-6 md:right-6 lg:right-6 z-50"
        >
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-full"
            variants={pulse}
            initial="initial"
            animate="animate"
            style={{ opacity: 0.4 }}
          />
          <motion.div
            className="relative bg-green-500 text-white p-4 w-14 h-14 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsappButton;
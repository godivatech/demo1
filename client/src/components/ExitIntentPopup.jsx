import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { COMPANY_NAME, CONTACT } from "../data/company";
import { intentSchema } from "@/data/schema";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Urgent Consultation",
    message: "I need help with building repairs",
    consent: false,
  });

  const { toast } = useToast();

  // Track mouse movements to detect when the user is about to leave
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger if the mouse is leaving the top of the page
      if (e.clientY <= 20 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);

        // Store in session that we've shown the popup
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Check if the popup has already been shown in this session
    const popupShown = sessionStorage.getItem("exitIntentShown") === "true";

    if (popupShown) {
      setHasShown(true);
    } else {
      // Only add listener if not yet shown
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isOpen, hasShown]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using Zod schema
    try {
      const validatedData = intentSchema.parse(formData);

      setIsSubmitting(true);
      await apiRequest("POST", "/api/intents", validatedData);

      // Reset form and show success
      setFormData({
        name: "",
        phone: "",
        service: "Urgent Consultation",
        message: "I need help with building repairs",
        consent: false,
      });

      toast({
        title: "Request submitted!",
        description: "Our team will contact you shortly.",
      });

      // Invalidate intents cache to refresh admin panel
      queryClient.invalidateQueries(["intents"]);

      // Close popup
      setIsOpen(false);
    } catch (error) {
      if (error.errors) {
        // Zod validation error
        const errorMessages = error.errors
          .map((err) => `${err.message}`)
          .join(", ");
        toast({
          title: "Form validation error",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        // API or other error
        toast({
          title: "Failed to submit",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white w-full max-w-md rounded-lg shadow-xl mx-4"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold">Don't leave yet!</h3>
            <p className="text-gray-600 mt-2">
              We can help solve your building problems quickly.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="flex items-start mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label htmlFor="consent" className="ml-2 text-xs text-gray-600">
                  I agree that {COMPANY_NAME} can contact me regarding my
                  building repair needs.
                </label>
              </div>

              <div className="flex flex-col space-y-3 mt-4">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-md font-medium transition flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request a Call Back"}
                </button>

                <div className="flex space-x-3">
                  <a
                    href={`tel:${CONTACT.phone[0]}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md font-medium transition flex items-center justify-center text-sm"
                  >
                    <FaPhone className="mr-2" /> Call Now
                  </a>
                  <a
                    href={CONTACT.whatsapp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-md font-medium transition flex items-center justify-center text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ExitIntentPopup;

import { CONTACT } from "@/lib/constants";

const WhatsappButton = () => {
  return (
    <a 
      href={CONTACT.social.whatsapp}
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp text-white text-3xl"></i>
    </a>
  );
};

export default WhatsappButton;

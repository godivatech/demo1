import { Link } from "wouter";
import { CONTACT } from "@/lib/constants";

const Cta = () => {
  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full -ml-16 -mb-16"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">Ready to Solve Your Building Problems?</h2>
          <p className="text-white text-opacity-90 text-lg mb-8">Contact our experts today for a free consultation and site assessment. We'll help you find the perfect solution for your building repair needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-md font-medium transition text-center">
              Book A Site Visit
            </Link>
            <a 
              href={`tel:${CONTACT.phone[0].replace(/\s+/g, '')}`}
              className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white border border-white px-8 py-4 rounded-md font-medium transition flex items-center justify-center"
            >
              <i className="fas fa-phone-alt mr-2"></i> Call Now: {CONTACT.phone[0]}
            </a>
          </div>
          <div className="mt-8">
            <a 
              href={CONTACT.social.whatsapp}
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp text-xl mr-2"></i> Connect on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
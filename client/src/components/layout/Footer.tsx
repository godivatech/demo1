import { Link } from "wouter";
import { COMPANY_NAME, COMPANY_TITLE, CONTACT, COMPANY_DESCRIPTION, SERVICES } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-[#2b4c7e] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="mr-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <i className="fas fa-building"></i>
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-lg text-white">{COMPANY_NAME}</h4>
                <p className="text-xs text-gray-300">{COMPANY_TITLE}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{COMPANY_DESCRIPTION}</p>
            <div className="flex space-x-4">
              <a href={`https://www.facebook.com/${CONTACT.social.facebook}`} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/80 transition" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={`https://twitter.com/${CONTACT.social.twitter}`} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/80 transition" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={`https://www.instagram.com/${CONTACT.social.instagram}`} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/80 transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.slug}`} className="text-gray-300 hover:text-primary transition">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <span className="text-gray-300">{CONTACT.address}</span>
              </li>
              {CONTACT.phone.map((phone, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="text-gray-300 hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-gray-300 text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

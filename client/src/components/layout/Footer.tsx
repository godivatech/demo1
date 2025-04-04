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
              <a href={`https://www.facebook.com/${CONTACT.social.facebook}`} className="text-gray-300 hover:text-white transition" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={`https://twitter.com/${CONTACT.social.twitter}`} className="text-gray-300 hover:text-white transition" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={`https://www.instagram.com/${CONTACT.social.instagram}`} className="text-gray-300 hover:text-white transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-primary transition">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-primary transition">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-primary transition">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-primary transition">Contact Us</a>
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
                  <Link href={`/services#${service.slug}`}>
                    <a className="text-gray-300 hover:text-primary transition">{service.title}</a>
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
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span className="text-gray-300">{CONTACT.address}</span>
              </li>
              {CONTACT.phone.map((phone, index) => (
                <li key={index} className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-primary"></i>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary"></i>
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
            <Link href="/privacy-policy">
              <a className="text-gray-400 hover:text-gray-300 text-sm">Privacy Policy</a>
            </Link>
            <Link href="/terms-of-service">
              <a className="text-gray-400 hover:text-gray-300 text-sm">Terms of Service</a>
            </Link>
            <Link href="/sitemap">
              <a className="text-gray-400 hover:text-gray-300 text-sm">Sitemap</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

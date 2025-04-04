import { Link } from 'wouter';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';
import { COMPANY_NAME, COMPANY_TITLE, CONTACT, SOCIAL_MEDIA } from '../../data/company';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-orange-500">{COMPANY_NAME}</h2>
            <p className="text-sm mb-2">{COMPANY_TITLE}</p>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for all building repair and maintenance needs in Madurai and surrounding areas.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a 
                href={SOCIAL_MEDIA.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href={SOCIAL_MEDIA.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href={SOCIAL_MEDIA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href={CONTACT.whatsapp}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <div>
                  {CONTACT.phone.map((phone, index) => (
                    <p key={index} className="text-sm">
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-orange-500 transition-colors">
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-sm hover:text-orange-500 transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <p className="text-sm">{CONTACT.address}</p>
              </li>
              <li className="flex items-start">
                <FaClock className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <p className="text-sm">{CONTACT.workingHours}</p>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-orange-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#waterproofing" className="text-sm hover:text-orange-500 transition-colors">
                  Waterproofing Solutions
                </Link>
              </li>
              <li>
                <Link to="/services#structural-repairs" className="text-sm hover:text-orange-500 transition-colors">
                  Structural Repairs
                </Link>
              </li>
              <li>
                <Link to="/services#sealants" className="text-sm hover:text-orange-500 transition-colors">
                  Sealants & Adhesives
                </Link>
              </li>
              <li>
                <Link to="/services#coatings" className="text-sm hover:text-orange-500 transition-colors">
                  Waterproof Coatings
                </Link>
              </li>
              <li>
                <Link to="/services#consultation" className="text-sm hover:text-orange-500 transition-colors">
                  Technical Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {COMPANY_NAME}. All Rights Reserved.
            </p>
            <div className="mt-2 md:mt-0">
              <a href="#" className="text-xs text-gray-400 hover:text-orange-500 mx-2 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-orange-500 mx-2 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
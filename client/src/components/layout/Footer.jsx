import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react";
import {
  COMPANY_NAME,
  COMPANY_TITLE,
  CONTACT,
  SOCIAL_MEDIA,
} from "../../data/company";
import logo from "@/assets/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Company Logo" className="h-16 w-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for all building repair and maintenance needs
              in Madurai and surrounding areas.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href={SOCIAL_MEDIA.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a
                href={SOCIAL_MEDIA.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} strokeWidth={2} />
              </a>
              <a
                href={SOCIAL_MEDIA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={2} />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone
                  className="mt-1 mr-3 text-secondary flex-shrink-0"
                  size={18}
                  strokeWidth={2.5}
                />
                <div>
                  {CONTACT.phone.map((phone, index) => (
                    <p key={index} className="text-sm">
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </li>
              <li className="flex items-start">
                <Mail
                  className="mt-1 mr-3 text-secondary flex-shrink-0"
                  size={18}
                  strokeWidth={2.5}
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin
                  className="mt-1 mr-3 text-secondary flex-shrink-0"
                  size={18}
                  strokeWidth={2.5}
                />
                <div>
                  {CONTACT.addresses ? (
                    CONTACT.addresses.map((address, index) => (
                      <p key={index} className="text-sm mb-2">
                        {address}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm">{CONTACT.address}</p>
                  )}
                </div>
              </li>
              <li className="flex items-start">
                <Clock
                  className="mt-1 mr-3 text-secondary flex-shrink-0"
                  size={18}
                  strokeWidth={2.5}
                />
                <p className="text-sm">{CONTACT.workingHours}</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services#waterproofing"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Waterproofing Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/services#structural-repairs"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Structural Repairs
                </Link>
              </li>
              <li>
                <Link
                  to="/services#sealants"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Sealants & Adhesives
                </Link>
              </li>
              <li>
                <Link
                  to="/services#coatings"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Waterproof Coatings
                </Link>
              </li>
              <li>
                <Link
                  to="/services#consultation"
                  className="text-sm hover:text-primary transition-colors"
                >
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
            <div className="flex flex-col md:flex-row items-center">
              <p className="text-sm text-gray-400 md:mr-4">
                © {currentYear} {COMPANY_NAME}. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1 md:mt-0">
                Designed and developed by{" "}
                <a
                  href="https://www.godivatech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary text-primary transition-colors"
                >
                  Godiva Tech
                </a>
              </p>
            </div>
            {/*  <div className="mt-3 md:mt-0">
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-orange-500 mx-2 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-orange-500 mx-2 transition-colors"
              >
                Terms of Service
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

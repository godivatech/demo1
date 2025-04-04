import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { COMPANY_NAME, COMPANY_TITLE, CONTACT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white shadow-lg py-2" 
        : "bg-white/80 backdrop-blur-md py-3"
    )}>
      {/* Top Bar with Contact Info - visible on larger screens */}
      <div className="hidden md:block border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <i className="fas fa-phone text-primary mr-2"></i>
                <a href={`tel:${CONTACT.phone[0].replace(/\s+/g, '')}`} className="hover:text-primary">
                  {CONTACT.phone[0]}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-envelope text-primary mr-2"></i>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                  {CONTACT.email}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <a href={`https://www.facebook.com/${CONTACT.social.facebook}`} className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white hover:bg-primary/90">
                  <i className="fab fa-facebook-f text-xs"></i>
                </a>
                <a href={`https://twitter.com/${CONTACT.social.twitter}`} className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white hover:bg-primary/90">
                  <i className="fab fa-twitter text-xs"></i>
                </a>
                <a href={`https://www.instagram.com/${CONTACT.social.instagram}`} className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white hover:bg-primary/90">
                  <i className="fab fa-instagram text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer py-1">
              <div className="relative mr-3">
                <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-white">
                  <i className="fas fa-building text-xl"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#2b4c7e] rounded-full flex items-center justify-center text-white text-xs">
                  <i className="fas fa-tools"></i>
                </div>
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-lg md:text-xl text-gray-800">{COMPANY_NAME}</h1>
                <p className="text-xs md:text-sm text-primary font-medium">{COMPANY_TITLE}</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.path}
                  className={cn(
                    "relative px-4 py-2 font-medium mx-1 transition-colors group",
                    location === item.path 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.title}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                    location === item.path 
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}></span>
                </Link>
              ))}
            </div>

            <div className="ml-6 flex items-center space-x-2">
              <a 
                href={`tel:${CONTACT.phone[0].replace(/\s+/g, '')}`}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-primary transition-colors"
                title="Call Us"
              >
                <i className="fas fa-phone"></i>
              </a>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 font-medium">
                  <i className="fas fa-calendar-check mr-2"></i> Book Service
                </Button>
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary focus:outline-none p-2 bg-gray-100 rounded-md" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-white absolute w-full left-0 transition-all duration-300 ease-in-out border-t border-gray-100 overflow-hidden shadow-lg",
        mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-3 space-y-4">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={cn(
                "flex items-center font-medium px-3 py-3 rounded-md transition-colors",
                location === item.path 
                  ? "text-white bg-primary" 
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              )}
              onClick={closeMobileMenu}
            >
              <i className={cn(
                "mr-3 fas",
                item.path === "/" ? "fa-home" :
                item.path === "/services" ? "fa-tools" :
                item.path === "/products" ? "fa-box" :
                item.path === "/about" ? "fa-info-circle" : "fa-envelope"
              )}></i>
              {item.title}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center px-3 py-2 text-gray-700">
              <i className="fas fa-phone text-primary mr-3"></i>
              <a href={`tel:${CONTACT.phone[0].replace(/\s+/g, '')}`}>
                {CONTACT.phone[0]}
              </a>
            </div>
            <div className="flex items-center px-3 py-2 text-gray-700">
              <i className="fas fa-envelope text-primary mr-3"></i>
              <a href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
          </div>
          
          <Link 
            href="/contact"
            className="flex items-center justify-center bg-primary text-white text-center px-4 py-3 rounded-md font-medium"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-calendar-check mr-2"></i> Book Service
          </Link>
          
          <div className="flex justify-center space-x-4 py-2">
            <a href={`https://www.facebook.com/${CONTACT.social.facebook}`} className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href={`https://twitter.com/${CONTACT.social.twitter}`} className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={`https://www.instagram.com/${CONTACT.social.instagram}`} className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { COMPANY_NAME, COMPANY_TITLE } from "@/lib/constants";
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

  return (
    <header className={cn(
      "fixed w-full bg-white z-50 transition-all duration-300",
      isScrolled ? "shadow-md" : "bg-opacity-95"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="mr-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <i className="fas fa-building text-xl"></i>
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-lg md:text-xl text-primary">{COMPANY_NAME}</h1>
              <p className="text-xs md:text-sm text-secondary font-medium">{COMPANY_TITLE}</p>
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={cn(
              "font-medium transition",
              location === "/" ? "text-primary" : "text-gray-600 hover:text-primary"
            )}>
              Home
            </a>
          </Link>
          <Link href="/services">
            <a className={cn(
              "font-medium transition",
              location === "/services" ? "text-primary" : "text-gray-600 hover:text-primary"
            )}>
              Services
            </a>
          </Link>
          <Link href="/products">
            <a className={cn(
              "font-medium transition",
              location === "/products" ? "text-primary" : "text-gray-600 hover:text-primary"
            )}>
              Products
            </a>
          </Link>
          <Link href="/about">
            <a className={cn(
              "font-medium transition",
              location === "/about" ? "text-primary" : "text-gray-600 hover:text-primary"
            )}>
              About
            </a>
          </Link>
          <Link href="/contact">
            <a className={cn(
              "font-medium transition",
              location === "/contact" ? "text-primary" : "text-gray-600 hover:text-primary"
            )}>
              Contact
            </a>
          </Link>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90">Book Service</Button>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-primary focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link href="/">
              <a 
                className={cn(
                  "block font-medium px-3 py-2 rounded-md",
                  location === "/" 
                    ? "text-primary bg-primary/10" 
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
                onClick={closeMobileMenu}
              >
                Home
              </a>
            </Link>
            <Link href="/services">
              <a 
                className={cn(
                  "block font-medium px-3 py-2 rounded-md",
                  location === "/services" 
                    ? "text-primary bg-primary/10" 
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
                onClick={closeMobileMenu}
              >
                Services
              </a>
            </Link>
            <Link href="/products">
              <a 
                className={cn(
                  "block font-medium px-3 py-2 rounded-md",
                  location === "/products" 
                    ? "text-primary bg-primary/10" 
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
                onClick={closeMobileMenu}
              >
                Products
              </a>
            </Link>
            <Link href="/about">
              <a 
                className={cn(
                  "block font-medium px-3 py-2 rounded-md",
                  location === "/about" 
                    ? "text-primary bg-primary/10" 
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
                onClick={closeMobileMenu}
              >
                About
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className={cn(
                  "block font-medium px-3 py-2 rounded-md",
                  location === "/contact" 
                    ? "text-primary bg-primary/10" 
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className="block bg-primary text-white text-center px-4 py-2 rounded-md font-medium"
                onClick={closeMobileMenu}
              >
                Book Service
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { COMPANY_NAME, COMPANY_TITLE } from '../../data/company';
import { cn } from '../../utils/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex flex-col">
              <span className="text-xl font-bold text-orange-600">{COMPANY_NAME}</span>
              <span className="text-xs text-gray-600">{COMPANY_TITLE}</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-orange-600',
                    location === link.path
                      ? 'text-orange-600'
                      : 'text-gray-700'
                  )}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-orange-600 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-lg">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a
                    className={cn(
                      'text-sm block py-2 px-4 rounded-md font-medium transition-colors hover:bg-orange-50 hover:text-orange-600',
                      location === link.path
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_NAME, COMPANY_TITLE } from '../../data/company';
import { cn } from '../../utils/utils';
import { fadeIn, fadeInDown, fadeInRight } from '../../utils/animations';

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
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeInDown(0, 0.5)}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex flex-col cursor-pointer" 
              variants={fadeIn(0.1, 0.5)}
            >
              <span className="text-xl font-bold text-orange-600">{COMPANY_NAME}</span>
              <span className="text-xs text-gray-600">{COMPANY_TITLE}</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex space-x-8"
            variants={fadeIn(0.2, 0.5)}
          >
            {navLinks.map((link, index) => (
              <Link key={link.path} to={link.path}>
                <motion.span
                  variants={fadeInRight(0.1 * (index + 1), 0.5)}
                  className={cn(
                    'text-sm font-medium transition-colors cursor-pointer hover:text-orange-600',
                    location === link.path
                      ? 'text-orange-600'
                      : 'text-gray-700'
                  )}
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            variants={fadeIn(0.3, 0.5)}
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-orange-600 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-4 pb-2"
          >
            <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-lg">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link to={link.path}>
                    <span
                      className={cn(
                        'text-sm block py-2 px-4 rounded-md font-medium transition-colors cursor-pointer hover:bg-orange-50 hover:text-orange-600',
                        location === link.path
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-700'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
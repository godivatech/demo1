import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Building, Hammer, ShoppingBag, Users, Phone, Lock } from 'lucide-react';
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
    { name: 'Home', path: '/', icon: <Building size={16} className="text-white group-hover:text-black transition-colors" /> },
    { name: 'Services', path: '/services', icon: <Hammer size={16} className="text-white group-hover:text-black transition-colors" /> },
    { name: 'Products', path: '/products', icon: <ShoppingBag size={16} className="text-white group-hover:text-black transition-colors" /> },
    { name: 'About', path: '/about', icon: <Users size={16} className="text-white group-hover:text-black transition-colors" /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={16} className="text-white group-hover:text-black transition-colors" /> },
  ];

  // Admin link removed as per client request
  // const adminLink = { name: 'Admin', path: '/admin', icon: <Lock size={16} /> };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeInDown(0, 0.5)}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 shadow-sm py-3'
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
            className="hidden md:flex items-center space-x-6"
            variants={fadeIn(0.2, 0.5)}
          >
            {navLinks.map((link, index) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  variants={fadeInRight(0.1 * (index + 1), 0.5)}
                  className={cn(
                    'flex items-center gap-1.5 text-sm font-medium transition-all cursor-pointer hover:text-orange-600 px-3 py-2 rounded-md group',
                    location === link.path
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:bg-orange-50/50'
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.div>
              </Link>
            ))}
            
            {/* Admin link removed as per client request */}
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            variants={fadeIn(0.3, 0.5)}
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-orange-600 focus:outline-none group"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? 
              <X size={24} className="text-white group-hover:text-black transition-colors" /> : 
              <Menu size={24} className="text-white group-hover:text-black transition-colors" />
            }
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-4 pb-2 absolute left-0 right-0 bg-white px-4"
          >
            <div className="flex flex-col space-y-1 bg-white rounded-lg p-3 shadow-lg">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Link to={link.path}>
                    <span
                      className={cn(
                        'text-sm flex items-center gap-2 py-2.5 px-4 rounded-md font-medium transition-colors cursor-pointer hover:bg-orange-50 hover:text-orange-600 group',
                        location === link.path
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-700'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Admin Link for Mobile - Removed as per client request */}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
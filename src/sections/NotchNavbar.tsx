import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, MapPin, Phone } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Properties', href: '#properties', icon: Building2 },
  { label: 'Locations', href: '#locations', icon: MapPin },
  { label: 'Contact', href: '#contact', icon: Phone },
];

export const NotchNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg'
            : 'bg-white/10 backdrop-blur-md'
        }`}
        style={{
          borderRadius: '9999px',
          padding: '8px 16px',
        }}
      >
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a
            href="#home"
            className={`font-display font-bold text-lg transition-colors ${
              isScrolled ? 'text-blueprint-blue' : 'text-white'
            }`}
          >
            Propertyfie
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-blueprint-blue'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <a
            href="#contact"
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isScrolled
                ? 'bg-blueprint-blue text-white hover:bg-blue-700'
                : 'bg-white text-blueprint-blue hover:bg-white/90'
            }`}
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl shadow-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blueprint-blue transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotchNavbar;

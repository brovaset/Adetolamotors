import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-green-600 p-2 rounded-lg shadow-lg">
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-base sm:text-xl text-black">
              ADETOLA MOTORS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-green-600 transition-colors">
              {t('home')}
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-green-600 transition-colors">
              {t('about')}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-green-600 transition-colors">
              {t('services')}
            </button>
            <button onClick={() => scrollToSection('vehicles')} className="text-gray-700 hover:text-green-600 transition-colors">
              {t('vehicles')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition-colors">
              {t('contact')}
            </button>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-sm">{language.toUpperCase()}</span>
            </Button>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50"
              style={{ top: '80px', zIndex: -1 }}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-xl"
            >
              <nav className="flex flex-col p-4 gap-2">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium active:bg-gray-100"
                >
                  {t('home')}
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium active:bg-gray-100"
                >
                  {t('about')}
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium active:bg-gray-100"
                >
                  {t('services')}
                </button>
                <button
                  onClick={() => scrollToSection('vehicles')}
                  className="text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium active:bg-gray-100"
                >
                  {t('vehicles')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium active:bg-gray-100"
                >
                  {t('contact')}
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
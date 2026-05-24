import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Heart, Laptop } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'CGPA', id: 'cgpa' },
  { label: 'Projects', id: 'projects' },
  { label: 'Research', id: 'research' },
  { label: 'Activities', id: 'activities' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ darkMode, toggleDarkMode, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3'
          : 'bg-transparent py-5'
      }`}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Branded Greeting */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 group text-left"
          id="navbar-logo"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 p-[1.5px] shadow-sm transform group-hover:rotate-6 transition-transform duration-300">
            <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-950 flex items-center justify-center">
              <Laptop className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
          </div>
          <div>
            <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
              TASHPIA
            </span>
            <span className="block text-[9px] font-mono tracking-wider text-pink-500 dark:text-pink-400 uppercase font-semibold">
              Software Eng.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/5 dark:bg-slate-100/5 border border-slate-950/5 dark:border-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
                id={`nav-link-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    transition={{ type: 'spring', damping: 25, stiffness: 380 }}
                    className="absolute inset-0 bg-white dark:bg-slate-900 shadow-sm rounded-full -z-1 border border-purple-500/10 dark:border-purple-500/20"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Responsive Toggle */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Switcher */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-800"
            aria-label="Toggle theme mode"
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </motion.button>

          {/* Hire Me Desktop Action */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full shadow-md shadow-purple-500/10 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300"
            id="navbar-contact-action"
          >
            Say Hello 
            <Heart className="w-3.5 h-3.5 fill-pink-300 stroke-pink-300 animate-pulse" />
          </button>

          {/* Mobile Menu Action */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 md:hidden transition-colors"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-slate-200 dark:border-slate-800/80 mt-3 absolute w-full left-0 shadow-lg px-6 py-4 flex flex-col gap-2 overflow-hidden"
            id="mobile-nav-drawer"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 w-full text-center py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-semibold shadow-md"
              id="mobile-nav-drawer-hire"
            >
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

// Import Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import CgpaChart from './components/CgpaChart';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Default to gorgeous high-contrast dark theme
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize dark mode class on document.documentElement
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark theme for that immersive "Feminine Tech Slate" feel
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // sticky navbar padding
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

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'about', 'skills', 'education', 'cgpa', 'projects', 'activities', 'contact'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.15,
          rootMargin: '-80px 0px -50% 0px', // adjustment for comfortable offset scanning
        }
      );
      observer.observe(el);

      return { el, observer };
    });

    // Tracking scroll height for Floating Scroll To Top button and progress bar
    const handleScrollTopState = () => {
      setShowScrollTop(window.scrollY > 400);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScrollTopState);

    return () => {
      window.removeEventListener('scroll', handleScrollTopState);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-purple-500/20 selection:text-purple-900 dark:selection:text-purple-300 transition-colors duration-300 relative font-sans"
            id="portfolio-root-container"
          >
            {/* Scroll Progress Indicator Bar */}
            <div 
              className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 z-50 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
              id="scroll-progress-bar"
            />
            {/* Top Navigation sticky bar */}
            <Navbar
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              activeSection={activeSection}
            />

            {/* Core Section Assemblies */}
            <Hero
              onContactClick={() => scrollToSection('contact')}
              onProjectsClick={() => scrollToSection('projects')}
            />
            
            <About />
            
            <Skills />
            
            <Education />
            
            <CgpaChart />
            
            <Projects />
            
            <Experience />
            
            <Contact />
            
            <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

            {/* Floating back to top button anchor inside viewport */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-500/10 cursor-pointer flex items-center justify-center outline-none border border-purple-500/20"
                  aria-label="Scroll to top of viewport"
                  id="floating-scroll-top-btn"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

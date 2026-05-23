import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <footer
      className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 overflow-hidden relative"
      id="main-footer"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
        
        {/* Scroll To Top interactive action cursor */}
        <button
          onClick={onScrollToTop}
          className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-purple-400 hover:text-white hover:bg-purple-600 hover:scale-110 transition-all cursor-pointer shadow-lg shadow-purple-500/5"
          aria-label="Scroll back to top of page"
          id="scroll-to-top-footer-btn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Content columns alignment */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
          
          {/* Logo Brand column */}
          <div className="flex flex-col md:items-start items-center text-center md:text-left space-y-2">
            <div>
              <span className="font-display font-black text-xl tracking-tight text-white">
                TASHPIA AFROZ
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-pink-500 uppercase font-bold">
                Software Engineering student
              </span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs font-light">
              Designing premium computational solutions and interactive human interfaces. Savar, Dhaka, Bangladesh.
            </p>
          </div>

          {/* Quick links selection column */}
          <div className="flex flex-col items-center space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white font-bold">
              Quick Connections
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium justify-center">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Education', id: 'education' },
                { label: 'CGPA', id: 'cgpa' },
                { label: 'Projects', id: 'projects' },
                { label: 'Activities', id: 'activities' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollToSection(link.id)}
                  className="hover:text-purple-400 transition-colors text-slate-400 text-[11px] font-mono cursor-pointer"
                  id={`footer-quick-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Network profiles column */}
          <div className="flex flex-col md:items-end items-center text-center md:text-right space-y-3.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white font-bold">
              Digital Workspace Connect
            </span>
            
            <div className="flex items-center gap-3">
              <a
                href="mailto:tashpianijhum17@gmail.com"
                className="p-2.5 rounded-full bg-slate-900 hover:bg-purple-600 hover:text-white transition-all text-slate-400"
                aria-label="Email Tashpia"
                id="footer-email-icon"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://bd.linkedin.com/in/tashpia-afroz-nijhum-44a54b2a5"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 hover:bg-purple-600 hover:text-white transition-all text-slate-400"
                aria-label="LinkedIn Profile"
                id="footer-linkedin-icon"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/TASHPIA"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-50 hover:text-slate-950 transition-all text-slate-400"
                aria-label="GitHub Profile"
                id="footer-github-icon"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
            
            <span className="block text-[10px] font-mono text-slate-600 tracking-tight">
              Phone: +880 1319519600
            </span>
          </div>

        </div>

        {/* Copyright notice and credit footer */}
        <div className="w-full pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
          <p>© {currentYear} Tashpia Afroz Nijhum. All Engineering Rights Reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>by</span>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('home');
              }}
              className="text-purple-400 hover:underline hover:text-purple-300 font-bold"
            >
              Tashpia Afroz Nijhum
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

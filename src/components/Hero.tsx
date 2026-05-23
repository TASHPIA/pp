import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Mail, Download, Layers, ShieldCheck, Award, Heart, CheckCircle2, X, Sparkles } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

const SUBTITLES = [
  'Software Engineering Student',
  'Future Web Developer',
  'Tech Enthusiast',
  'Creative Problem Solver',
];

export default function Hero({ onContactClick, onProjectsClick }: HeroProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse trajectory tracker for 3D depth-parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale down movement amplitude for organic, buttery look
      const x = (e.clientX - window.innerWidth / 2) / 35;
      const y = (e.clientY - window.innerHeight / 2) / 35;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = SUBTITLES[subtitleIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing
        setSubText(currentWord.substring(0, subText.length + 1));
        if (subText === currentWord) {
          // Finished typing, hold
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setSubText(currentWord.substring(0, subText.length - 1));
        if (subText === '') {
          setIsDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
          setTypingSpeed(100);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, subtitleIndex, typingSpeed]);

  const handlePrintCv = () => {
    window.print();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 md:py-0 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#070311] text-slate-900 dark:text-white transition-colors duration-300 select-none perspective-2000"
    >
      {/* Immersive radial gradient glows with parallax reactive offset */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: mousePosition.x * -1.5, y: mousePosition.y * -1.5 }}
          transition={{ type: 'spring', damping: 40, stiffness: 80 }}
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/15 dark:bg-purple-600/10 blur-[120px] animate-float-slow" 
        />
        <motion.div 
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          transition={{ type: 'spring', damping: 50, stiffness: 70 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/15 dark:bg-pink-600/10 blur-[130px] animate-float-medium" 
        />
        <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] rounded-full bg-blue-500/10 dark:bg-indigo-500/5 blur-[100px] animate-float-fast" />

        {/* 3D Glass Floating Particle Shapes */}
        <motion.div 
          animate={{ x: mousePosition.x * 2.5, y: mousePosition.y * 2.5 }}
          className="absolute top-[15%] left-[10%] w-16 h-16 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/25 dark:border-white/10 shadow-lg blur-[1px] rotate-12 animate-float-slow pointer-events-none backdrop-blur-xs flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-pink-400/20" />
        </motion.div>

        <motion.div 
          animate={{ x: mousePosition.x * -1.8, y: mousePosition.y * -1.8 }}
          className="absolute bottom-[20%] right-[10%] w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500/10 to-pink-500/10 border border-purple-400/20 shadow-xl blur-[2px] -rotate-12 animate-float-medium pointer-events-none"
        />

        {/* Floating background mathematical particle shapes for software engineer vibe */}
        <div className="absolute top-1/4 right-[12%] opacity-20 dark:opacity-30 animate-float-slow text-[11px] font-mono text-purple-600 dark:text-purple-400">
          {'<div className="cube-mesh-3d">'}
        </div>
        <div className="absolute bottom-1/3 left-[6%] opacity-15 dark:opacity-20 animate-float-medium text-[11px] font-mono text-pink-600 dark:text-pink-400">
          {'System.out.println("Max_CGPA: 3.95")'}
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-15 dark:opacity-20 animate-float-fast text-xs font-mono text-blue-600 dark:text-blue-400">
          {'DIU_SE_DEPARTMENT=true'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Pitch / Text Content (Col of 7) */}
        <div className="md:col-span-7 flex flex-col text-left">
          {/* Heart Badge Greeting with subtle micro-scale animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="self-start flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-[11px] font-mono tracking-wider uppercase mb-5 font-semibold cursor-pointer shadow-indigo-500/5 shadow-md hover:border-purple-500/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> Welcome to my 3D virtual ecosystem
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-pink-500 dark:text-pink-400 font-mono mb-2"
          >
            SALAAM & HELLO, I AM
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4"
          >
            TASHPIA AFROZ <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 dark:from-purple-400 dark:via-pink-400 dark:to-emerald-400 bg-clip-text text-transparent drop-shadow-sm font-extrabold">
              NIJHUM
            </span>
          </motion.h1>

          {/* Typing Area with customized blinking 3D caret */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="min-h-[32px] mb-5 flex items-center"
          >
            <span className="font-display text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-900 via-purple-950 to-slate-800 dark:from-slate-100 dark:via-purple-100 dark:to-slate-300 bg-clip-text text-transparent">
              {subText}
            </span>
            <span className="ml-2.5 inline-block w-2.5 h-6 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce shadow-md" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-light"
          >
            An ambitious Software Engineering undergraduate student in her final academic year at Daffodil International University. Passionate about marrying algorithmic strength with beautiful typography, glassmorphism UI/UX patterns, and smooth 3D interactions.
          </motion.p>

          {/* Button Operations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Contact Me button with glowing hover borders */}
            <button
              onClick={onContactClick}
              className="px-7 py-4 rounded-full text-xs font-bold tracking-wide text-white bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-500 hover:via-violet-500 hover:to-pink-500 shadow-xl shadow-purple-500/20 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
              id="hero-contact-btn"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 rounded-full" />
              Contact Me
              <Mail className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* View Projects button */}
            <button
              onClick={onProjectsClick}
              className="px-7 py-4 rounded-full text-xs font-bold tracking-wide border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 bg-white/60 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900/80 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/5"
              id="hero-projects-btn"
            >
              <Layers className="w-4 h-4 text-slate-500 dark:text-purple-400" />
              View Projects
            </button>

            {/* Download/View CV button */}
            <button
              onClick={() => setIsCvOpen(true)}
              className="px-7 py-4 rounded-full text-xs font-bold tracking-wide border border-pink-500/25 hover:border-pink-500/50 bg-pink-500/5 hover:bg-pink-500/10 text-pink-600 dark:text-pink-300 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-md"
              id="hero-cv-btn"
            >
              <Download className="w-4 h-4" />
              View & Download CV
            </button>
          </motion.div>

          {/* Bullet achievements banner style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900/80 pt-6"
          >
            <div className="flex items-center gap-1.5 hover:text-purple-500 transition-colors">
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>Full-Stack Capable</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
              <Award className="w-4 h-4 text-pink-500" />
              <span>DIU 9th Semester SE</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Volunteered at National ICT</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Showcase: Avatar, Glowing Orbits & rotating 3D Object (Col of 5) */}
        <div className="md:col-span-5 flex justify-center relative preserve-3d">
          
          {/* Parallax Orbit background effects */}
          <motion.div 
            animate={{ 
              x: mousePosition.x * 2, 
              y: mousePosition.y * 2,
              rotate: mousePosition.x * 0.5
            }}
            transition={{ type: 'spring', damping: 30 }}
            className="absolute rounded-full border border-purple-500/15 w-[420px] h-[420px] -top-12 -left-12 pointer-events-none animate-orbit-slow"
          />

          <motion.div 
            animate={{ 
              x: mousePosition.x * -1.5, 
              y: mousePosition.y * -1.5,
              rotate: mousePosition.x * -0.8
            }}
            transition={{ type: 'spring', damping: 35 }}
            className="absolute rounded-full border border-pink-500/10 w-[340px] h-[340px] -top-2 -left-2 pointer-events-none animate-orbit-medium"
          />

          {/* Main 3D Card wrapper that tracks mouse cursor perfectly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 10, rotateY: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotateX: mousePosition.y * -0.5,
              rotateY: mousePosition.x * 0.5
            }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 20 }}
            className="relative w-80 sm:w-88 h-80 sm:h-88 h-80 select-none group preserve-3d"
          >
            {/* Fancy spinning outer gradient ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-blue-400 rounded-full animate-float-medium opacity-85" />

            {/* Main Avatar container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-950 shadow-2xl flex items-center justify-center bg-slate-950 preserve-3d">
              <img
                src="/src/assets/images/tashpia_avatar_1779557140092.png"
                alt="Tashpia Afroz Nijhum Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('avatar-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
                id="hero-avatar"
              />

              {/* High precision SVG gradient Fallback */}
              <div
                id="avatar-fallback"
                className="hidden absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex-col items-center justify-center text-white p-6"
              >
                <div className="text-2xl font-display font-black tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                  TASHPIA
                </div>
                <div className="font-mono text-[9px] text-pink-300 tracking-wider mt-1.5 uppercase font-bold">
                  SOFTWARE ENGINEERING
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full mt-4 shadow-lg shadow-purple-500/50" />
              </div>
            </div>

            {/* floating tiny absolute glass card indicating CGPA performance with 3D elevation */}
            <motion.div
              style={{ transform: 'translateZ(40px)' }}
              className="absolute -bottom-2 -left-6 glass-effect p-3 px-5 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-500/20 max-w-[160px] pointer-events-none hover:border-purple-400/40"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="block text-[8px] font-mono tracking-wider text-slate-400 dark:text-purple-300 uppercase font-bold">
                  Current Semester
                </span>
                <span className="font-display font-extrabold text-xs text-slate-800 dark:text-white">
                  9th Semester
                </span>
              </div>
            </motion.div>

            {/* floating tiny engineering badge with high 3D elevation */}
            <motion.div
              style={{ transform: 'translateZ(65px)' }}
              className="absolute -top-3 -right-5 glass-effect p-3 px-4 rounded-2xl shadow-2xl flex items-center gap-2 border border-pink-500/25 max-w-[160px] pointer-events-none hover:border-pink-400/50"
            >
              <Award className="w-4 h-4 text-pink-500 animate-pulse" />
              <div>
                <span className="block text-[8px] font-mono tracking-wider text-slate-400 dark:text-pink-300 uppercase font-bold">
                  BSc in SE
                </span>
                <span className="font-display font-extrabold text-[10px] text-slate-800 dark:text-white">
                  CGPA 3.95 (Peak)
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bounce scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-50">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600 dark:text-slate-300">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-purple-500" />
        </motion.div>
      </div>

      {/* INTERACTIVE DIGITAL CV MODAL */}
      <AnimatePresence>
        {isCvOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 max-h-[90vh] flex flex-col print:max-h-none print:w-full print:border-none print:p-0"
              id="cv-modal-panel"
            >
              {/* Header */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between no-print">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      Digital Professional CV
                    </h3>
                    <p className="text-xs text-slate-500">Tashpia Afroz Nijhum</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintCv}
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 flex items-center gap-1.5 transition-colors cursor-pointer"
                    id="print-cv-btn"
                  >
                    Print or Save PDF
                  </button>
                  <button
                    onClick={() => setIsCvOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer transition-colors"
                    id="close-cv-btn"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Body Content */}
              <div className="p-8 overflow-y-auto space-y-6 print:overflow-visible">
                {/* CV Front */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
                  <h1 className="text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Tashpia Afroz Nijhum
                  </h1>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 font-mono mt-1">
                    SOFTWARE ENGINEERING STUDENT & WEB DEVELOPER
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 mt-3 font-mono">
                    <div>📍 Daffodil International University, Bangladesh</div>
                    <div>✉️ <a href="mailto:tashpianijhum17@gmail.com" className="underline hover:text-purple-500">tashpianijhum17@gmail.com</a></div>
                    <div>📞 01319519600</div>
                    <div>🔗 <a href="https://bd.linkedin.com/in/tashpia-afroz-nijhum-44a54b2a5" target="_blank" rel="noreferrer" className="underline hover:text-purple-500">LinkedIn Profile</a></div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-pink-500 tracking-widest uppercase mb-2">
                    Professional Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Sincere, communicative, and results-oriented Software Engineering student currently completing her 9th semester at Daffodil International University. Highly skilled in core programming concepts, web designs, algorithms, and collaborative team environments. Proven leader and presenter with active event-volunteering backgrounds, looking for software developer internships and engineering positions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-pink-500 tracking-widest uppercase mb-2.5">
                        Education
                      </h4>
                      <div className="border-l-2 border-purple-500 pl-4 space-y-2">
                        <p className="text-xs font-bold text-slate-800 dark:text-white">
                          B.Sc. in Software Engineering
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Daffodil International University (Ongoing, 9th Semester)
                        </p>
                        <p className="text-[11px] font-mono text-purple-600 dark:text-purple-300 font-bold">
                          Max CGPA Record: 3.95 (Latest Summer term 2025)
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold text-pink-400 tracking-widest uppercase mb-2.5">
                        Core Achievements
                      </h4>
                      <ul className="text-xs space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                        <li>Maintained academic excellence with highly consistent CGPA upwards of 3.8 average.</li>
                        <li>Completed comprehensive projects utilizing vanilla JavaScript and Java architectures.</li>
                        <li>Volunteered at regional tech programs and represented students in university presentation panels.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-pink-500 tracking-widest uppercase mb-2.5">
                      Technical Skills Expertise
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['HTML', 'CSS', 'JavaScript', 'C', 'C++', 'Java', 'Word', 'Excel', 'PowerPoint', 'Teamwork', 'Presentation', 'Leadership'].map((sk) => (
                        <span key={sk} className="px-2 py-1 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-xs font-mono font-bold text-pink-500 tracking-widest uppercase mb-2.5 mt-5">
                      Featured Projects
                    </h4>
                    <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 pl-2">
                      <li>
                        <strong>• Personal Portfolio Website</strong>: Glassmorphic interactive portfolio with dynamic typography.
                      </li>
                      <li>
                        <strong>• Student Management System</strong>: Java-based academic tracking utility.
                      </li>
                      <li>
                        <strong>• Interactive Calculator</strong>: Mathematically stable browser processing module.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-mono pt-4 border-t border-slate-100 dark:border-slate-800">
                  Tashpia Afroz Nijhum • Bangladesh • CV Version 2026
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Laptop, GraduationCap, Calculator, ShieldCheck, Star } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  type: 'web' | 'system' | 'util';
}

const PROJECTS_DATA: Project[] = [
  {
    title: 'Personal Portfolio Website',
    category: 'Web Portfolio Solution',
    description: 'A premium, responsive digital landing site designed for software developers, showcasing custom glassmorphic charts, typed subtitles, custom scroll effects, digital resume printable modals, and dark/light responsive systems.',
    technologies: ['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/TASHPIA/portfolio',
    demoUrl: '#home',
    featured: true,
    type: 'web',
  },
  {
    title: 'Student Management System',
    category: 'Enterprise Academic Portal',
    description: 'A comprehensive academic console engineered for university courses. Facilitates student profile lookups, CGPA recalculations, course grade allocations, enrollment registries, and administrator statistics modules.',
    technologies: ['C++', 'Object-Oriented Coding', 'DBMS Principles', 'Modular Architecture'],
    githubUrl: 'https://github.com/TASHPIA/student-management-system',
    demoUrl: '#education',
    featured: true,
    type: 'system',
  },
  {
    title: 'Interactive Calculator App',
    category: 'Mathematics Processing Tool',
    description: 'A browser-based calculation suite utilizing stable parsing algorithms. Features standard operations, floating-point parsing, algebraic overrides, responsive keys, clear inputs, and memory store controls.',
    technologies: ['HTML5', 'CSS3 Web Layout', 'Modern JavaScript v6', 'DOM Engine'],
    githubUrl: 'https://github.com/TASHPIA/calculator-app',
    demoUrl: '#cgpa',
    featured: false,
    type: 'util',
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'web' | 'system' | 'util'>('all');

  const filteredProjects = PROJECTS_DATA.filter(
    (proj) => filter === 'all' || proj.type === filter
  );

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-[#070311] border-t border-slate-100 dark:border-slate-900 transition-colors duration-300 relative overflow-hidden perspective-2000"
    >
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold"
          >
            <Laptop className="w-3.5 h-3.5" /> Featured Projects
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Shuttle of Creative{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Compilations
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            A showcasing portfolio of academic systems, math configurations, and interactive web templates made during my Software Engineering undergraduate voyage.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {([
            { label: 'All Projects', value: 'all' },
            { label: 'Web Applications', value: 'web' },
            { label: 'Desktop Systems', value: 'system' },
            { label: 'Functional Utilities', value: 'util' },
          ] as const).map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                filter === tab.value
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/15 font-bold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800/80'
              }`}
              id={`project-tab-${tab.value}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.45 }}
                key={project.title}
                className="card-3d-hover preserve-3d rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-xl overflow-hidden flex flex-col justify-between group h-full relative font-sans"
                id={`project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Visual placeholder with distinct high-quality visual gradients and tech icons */}
                <div className="relative h-48 bg-gradient-to-tr from-slate-955 via-purple-955 to-slate-955 flex flex-col items-center justify-center overflow-hidden border-b border-slate-200 dark:border-slate-800/60 preserve-3d">
                  {/* Background grid line effects */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Gradient balls */}
                  <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-purple-500/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-pink-500/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  {/* Feature status banner */}
                  {project.featured && (
                    <div 
                      style={{ transform: 'translateZ(25px)' }}
                      className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-400 text-[9px] font-mono border border-pink-500/20 uppercase font-bold tracking-widest pointer-events-none"
                    >
                      <Star className="w-3 h-3 fill-pink-400" />
                      <span>Featured UI</span>
                    </div>
                  )}

                  {/* Code element placeholders */}
                  <div className="font-mono text-[9px] text-pink-500/30 dark:text-pink-500/20 absolute top-4 right-4 group-hover:-translate-y-1 transition-transform pointer-events-none">
                    {'{ system.io }'}
                  </div>

                  {/* Icon illustration rendering elevated in 3D */}
                  <div 
                    style={{ transform: 'translateZ(55px)' }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative"
                  >
                    {project.type === 'web' && <Laptop className="w-8 h-8 text-purple-400" />}
                    {project.type === 'system' && <GraduationCap className="w-8 h-8 text-pink-400" />}
                    {project.type === 'util' && <Calculator className="w-8 h-8 text-blue-400" />}
                  </div>

                  {/* Animated tech subtitle */}
                  <span 
                    style={{ transform: 'translateZ(30px)' }}
                    className="block font-mono text-[10px] text-slate-400 tracking-wider uppercase mt-4 pointer-events-none"
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content Area with layered depth components */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between preserve-3d">
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2.5 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies tags */}
                  <div className="mt-6" style={{ transform: 'translateZ(10px)' }}>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[9px] font-mono tracking-tight bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Button actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      {/* GitHub Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-800/80 hover:border-purple-500/30 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                        id={`github-link-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code Repo
                      </a>

                      {/* Live Demo Link */}
                      <a
                        href={project.demoUrl}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 via-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-md shadow-purple-500/10 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300"
                        id={`demo-link-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span>Demo Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project highlight banner footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 dark:border-purple-500/5 flex items-center justify-between text-left col-span-full">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 block">
              <ShieldCheck className="w-4.5 h-4.5" />
            </span>
            <div>
              <p className="text-xs font-bold font-display text-slate-800 dark:text-slate-200">Continuous Engineering Deployment</p>
              <p className="text-[10px] text-slate-400">All student code repositories are maintained under strict version control protocols.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-purple-600 dark:text-purple-300">
            GITHUB USER: @TASHPIA
          </span>
        </div>
      </div>
    </section>
  );
}

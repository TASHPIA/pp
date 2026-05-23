import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Award, Flame, CheckCircle2, TrendingUp } from 'lucide-react';

interface SemesterResult {
  semester: string;
  cgpa: number;
  maxCgpa: number;
  standing: string;
  honors: boolean;
  coursesText: string;
}

const CGPA_DATA: SemesterResult[] = [
  { semester: 'Spring 2023', cgpa: 3.58, maxCgpa: 4.0, standing: 'Excellent', honors: false, coursesText: 'Intro to Computing, Programming in C, calculus' },
  { semester: 'Fall 2023', cgpa: 3.55, maxCgpa: 4.0, standing: 'Excellent', honors: false, coursesText: 'Discrete Mathematics, OOP with C++, Digital Logic' },
  { semester: 'Spring 2024', cgpa: 3.82, maxCgpa: 4.0, standing: 'Deans Honor List', honors: true, coursesText: 'Object Oriented Coding (Java), DBMS Fundamentals' },
  { semester: 'Fall 2024', cgpa: 3.80, maxCgpa: 4.0, standing: 'Deans Honor List', honors: true, coursesText: 'Data Structures and Algorithms, Software Requirements Specs' },
  { semester: 'Spring 2025', cgpa: 3.85, maxCgpa: 4.0, standing: 'Deans Honor List', honors: true, coursesText: 'Web Engineering, System Analysis & Design, Operating Systems' },
  { semester: 'Summer 2025', cgpa: 3.95, maxCgpa: 4.0, standing: 'Vice Chancellor Honor List', honors: true, coursesText: 'Software Testing & Quality Assurance, Architecture & Designs' },
  { semester: 'Fall 2025', cgpa: 3.90, maxCgpa: 4.0, standing: 'Deans Honor List', honors: true, coursesText: 'Software Project Management, Computer Commun. Networks' },
  { semester: 'Spring 2026', cgpa: 3.92, maxCgpa: 4.0, standing: 'Deans Honor List', honors: true, coursesText: 'Machine Learning Basics, Human Computer Interface' },
];

export default function CgpaChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(5); // default to peak semester Summer 2025

  const activeData = CGPA_DATA[activeIndex];

  return (
    <section
      id="cgpa"
      className="py-24 bg-slate-50 dark:bg-[#070311] border-t border-slate-100 dark:border-slate-905 transition-colors duration-300 relative overflow-hidden perspective-2000"
    >
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none animate-float-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans text-left">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold border border-purple-500/15"
          >
            <BarChart3 className="w-3.5 h-3.5" /> Semester Wise Result
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Semester-wise{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              CGPA Performance
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Academic evolution and course benchmarks charted over active semesters at Daffodil International University. Click any bar to investigate.
          </p>
        </div>

        {/* Dashboard bar chart widget container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch preserve-3d">
          {/* Custom Responsive Integrated Bar Chart (Col 8) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-effect border border-slate-200/60 dark:border-white/5 shadow-xl flex flex-col justify-between min-h-[400px] preserve-3d"
            id="cgpa-chart-container"
          >
            {/* Chart Title Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="font-display font-bold text-sm text-slate-800 dark:text-white">
                  DIU Software Engineering CGPA Graph
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-gradient-to-tr from-purple-500 to-pink-500" />
                  <span>Honors Award (&ge; 3.8)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-350 dark:bg-slate-700" />
                  <span>Standard Excellence</span>
                </div>
              </div>
            </div>

            {/* Custom Responsive bar representation layout */}
            <div className="flex-1 flex items-end justify-between gap-1 sm:gap-4 md:gap-6 pt-10 pb-4 h-56 select-none relative preserve-3d">
              {/* Horizontal chart helper gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8px] font-mono text-slate-400">
                {[4.0, 3.5, 3.0, 2.5].map((gridval) => (
                  <div key={gridval} className="w-full flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-1">
                    <span>{gridval.toFixed(1)} CGPA</span>
                    <span className="w-[85%] border-t border-dashed border-slate-200 dark:border-slate-800" />
                  </div>
                ))}
              </div>

              {/* Individual Vertical Bar Loops */}
              {CGPA_DATA.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isHovered = hoveredIndex === idx;
                // Height percentage normalized relative to 4.0 Max CGPA scale
                const barHeightPct = (item.cgpa / 4.0) * 100;

                // Color gradients based on honors values
                const barTheme = item.honors
                  ? 'from-purple-500 via-pink-400 to-pink-500'
                  : 'from-slate-400 via-slate-500 to-slate-450 dark:from-slate-800 dark:via-slate-700 dark:to-slate-700';

                return (
                  <div
                    key={item.semester}
                    className="flex-1 flex flex-col items-center justify-end relative h-full group z-10 cursor-pointer"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    id={`cgpa-bar-wrapper-${idx}`}
                  >
                    {/* Value label bubble hovering above bar */}
                    <AnimatePresence>
                      {(isHovered || isActive) && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.9 }}
                          animate={{ opacity: 1, y: -12, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.9 }}
                          className="absolute -top-4 z-20 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 dark:bg-white text-white dark:text-slate-950 font-mono text-[9px] font-bold shadow-md shadow-pink-500/5 text-center pointer-events-none"
                        >
                          {item.cgpa.toFixed(2)}
                          <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 dark:bg-white rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Highly custom, micro-animated bar */}
                    <div className="w-full max-w-[40px] h-full flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${barHeightPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.05 }}
                        className={`w-full rounded-t-xl bg-gradient-to-t shadow-inner ${barTheme} transition-all duration-300 relative ${
                          isActive
                            ? 'ring-4 ring-pink-500/25 border border-pink-500 opacity-100'
                            : isHovered
                            ? 'opacity-90 outline outline-1 outline-purple-500/30'
                            : 'opacity-70 dark:opacity-40'
                        }`}
                      >
                        {/* Shimer light effect inside bar for pristine visual look */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg pointer-events-none" />
                      </motion.div>
                    </div>

                    {/* Semester text underneath columns */}
                    <span
                      className={`block text-[9px] font-mono mt-3 text-center sm:-rotate-12 transform-gpu pb-2 origin-top-left transition-colors font-semibold whitespace-nowrap ${
                        isActive
                          ? 'text-pink-600 dark:text-pink-400 font-bold'
                          : 'text-slate-500 dark:text-slate-450 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}
                    >
                      {item.semester}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive Inspection Card / Side details panel (Col 4) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden preserve-3d card-3d-hover"
            id="cgpa-info-card"
          >
            {/* Ambient subtle glow element */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-pink-500/5 dark:bg-pink-500/1 pointer-events-none" />

            {/* active details wrapper */}
            <div className="space-y-6 preserve-3d">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                  Semester Profile
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 font-mono text-[9px] font-bold border border-purple-500/10">
                  {activeData.semester}
                </span>
              </div>

              {/* Massive 3D CGPA Display circle with real depth layering */}
              <div className="flex items-center gap-4 py-2 preserve-3d">
                <div 
                  style={{ transform: 'translateZ(55px)' }}
                  className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-500 p-[2.5px] shadow-xl shadow-pink-500/10 shrink-0 preserve-3d"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                    <span className="font-display font-black text-2xl text-slate-900 dark:text-white">
                      {activeData.cgpa.toFixed(2)}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                      CGPA
                    </span>
                  </div>
                </div>

                <div style={{ transform: 'translateZ(30px)' }}>
                  <h4 className="font-display font-bold text-base text-slate-850 dark:text-white leading-tight">
                    {activeData.standing}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Grade point scale index: {activeData.cgpa} out of {activeData.maxCgpa}
                  </p>
                </div>
              </div>

              {/* Honors or Performance achievements highlights details */}
              <div 
                style={{ transform: 'translateZ(20px)' }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-2">
                  {activeData.honors ? (
                    <Award className="w-4 h-4 text-amber-500 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  )}
                  <span className="text-xs font-semibold text-slate-755 dark:text-slate-350">
                    {activeData.honors ? 'University Honors List Achieved' : 'Standard High Performance'}
                  </span>
                </div>
                <p className="text-[11px] font-light leading-relaxed text-slate-500 dark:text-slate-400">
                  Sustained great focus of software studies resulting in premium grades.
                </p>
              </div>

              {/* Core classes overview */}
              <div className="space-y-1.5 text-xs preserve-3d">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
                  Academic Focus & Key Highlights:
                </span>
                <p 
                  style={{ transform: 'translateZ(15px)' }}
                  className="text-[11px] leading-relaxed font-light text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-900/30 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-900"
                >
                  {activeData.coursesText}
                </p>
              </div>
            </div>

            {/* Micro active stats loop */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center gap-2 justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                <span>Peak CGPA Summer 2025: 3.95</span>
              </span>
              <span className="text-purple-600 font-bold dark:text-purple-305">DIU SE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

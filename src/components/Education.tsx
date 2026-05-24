import { motion } from 'motion/react';
import { Award, GraduationCap, Calendar, Compass, MapPin } from 'lucide-react';
import Education3D from './Education3D';

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300 relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[8%] w-80 h-80 rounded-full bg-pink-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold"
          >
            <GraduationCap className="w-3.5 h-3.5" /> Educational background
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Academic{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Pathways
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed text-center">
            The foundational educational steps where I mold my understanding of computing systems, design requirements, and program testing.
          </p>
        </div>

        {/* Split Grid Layout: timeline on left, 3D on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Layout */}
          <div className="lg:col-span-8 relative border-l-2 border-slate-150 dark:border-slate-800 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12">
            {/* Main Institution Card */}
            <div className="relative">
              {/* Pulsing indicator node on timeline */}
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 ring-4 ring-purple-100 dark:ring-purple-900/30">
                <GraduationCap className="w-3.5 h-3.5 text-white animate-pulse" />
              </span>

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-905 border border-slate-205 dark:border-white/5 shadow-xl glass-effect"
                id="education-diu-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display font-black text-lg md:text-xl text-slate-800 dark:text-white">
                      B.Sc. in Software Engineering
                    </h3>
                    <p className="text-pink-500 dark:text-pink-400 font-medium text-sm mt-0.5">
                      Daffodil International University (DIU)
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>2022 - Present</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200/60 dark:border-slate-800 marketing-badges">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-500" />
                    <span>Savar, Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-500" />
                    <span>Active 9th Semester</span>
                  </div>
                </div>

                <div className="space-y-4 mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-light font-display">
                  <p>
                    As an student at Daffodil International University under the Software Engineering Department, I explore software design architectures, requirement engineering, project management frameworks, and system optimization algorithms. Over the course of the semesters, I have sustained great CGPA marks while proactively joining student panels.
                  </p>

                  {/* Key Coursework Tags */}
                  <div className="space-y-2 text-xs font-mono text-slate-500 pt-2">
                    <p className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest text-[9px]">
                      Highlight Theoretical Modules Covered:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Software Requirements & Spec',
                        'Object Oriented Design (Java)',
                        'Database Management Systems',
                        'Data Structures & Algorithms',
                        'Web Engineering (JS, HTML/CSS)',
                        'Software Testing & QA',
                        'System Analysis & Design',
                      ].map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* High school or Secondary timeline reference, for beautiful design context */}
            <div className="relative">
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 ring-4 ring-slate-100 dark:ring-slate-900/30">
                <Compass className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </span>

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-850/50 hover:border-purple-500/10 shadow-md text-slate-600 dark:text-slate-400"
                id="education-secondary-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-800 dark:text-white">
                      Higher Secondary School Certificate (HSC)
                    </h4>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                      Science Group Background
                    </p>
                  </div>
                  <div className="text-[10px] font-mono border border-slate-200 dark:border-slate-800/80 rounded-full px-3 py-1 bg-white dark:bg-slate-950">
                    Completed HSC Standard
                  </div>
                </div>
                <p className="text-xs font-light text-slate-550 dark:text-slate-400 leading-relaxed mt-3">
                  Maintained a stellar focus on mathematics, system analysis, and programming logic during higher secondary sciences education, facilitating a seamless entry into software engineering.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Interactive 3D Syllabus Architecture right card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-3xl p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/60 dark:border-white/5 shadow-xl text-center flex flex-col justify-between h-full min-h-[420px] relative overflow-hidden"
            id="education-3d-hologram-panel"
          >
            <div className="text-left z-20">
              <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] font-mono font-bold tracking-widest uppercase">
                Course Visualizer
              </span>
              <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white mt-1.5">
                Core Coursework Matrix
              </h3>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 mt-1 leading-relaxed font-light">
                A 3D projection of core computer science and software engineering academic modules. Hover and drag to inspect topic groups.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 relative h-64">
              <Education3D />
            </div>

            <div className="z-10 bg-white/50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-left">
              <span className="block text-[9px] font-mono text-pink-500 uppercase tracking-wider font-bold">
                Program Alignment
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5 font-light">
                Each vertex corresponds to formal curriculum requirements completed or actively in-progress.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { BookOpen, Users, Target, Lightbulb, GraduationCap } from 'lucide-react';
import About3D from './About3D';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#070311] border-t border-slate-100 dark:border-slate-905 transition-colors duration-300 relative overflow-hidden perspective-2000"
    >
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-pink-500/5 dark:bg-pink-500/1 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/1 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold border border-pink-500/15"
          >
            <BookOpen className="w-3.5 h-3.5" /> About My Identity
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4"
          >
            Passionate Software Engineer{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              In The Making
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed"
          >
            Enthused by the intersections of structural code logic, human communication engineering, and future technologies. Here is the blueprint of what drives my developer spirit.
          </motion.p>
        </div>

        {/* Bento Grid Layout with 3D parameters enabled */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 preserve-3d">
          {/* Main big bio card (Col span 7, nice glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 rounded-3xl p-8 bg-white dark:bg-slate-950/80 border border-slate-205 dark:border-white/5 shadow-xl flex flex-col justify-between card-3d-hover preserve-3d"
            id="about-bio-card"
          >
            <div className="space-y-4 preserve-3d">
              <div 
                style={{ transform: 'translateZ(30px)' }}
                className="flex items-center gap-2.5 mb-2"
              >
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md shadow-pink-500/10">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                  Academic & Professional Story
                </h3>
              </div>
              <p 
                style={{ transform: 'translateZ(15px)' }}
                className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-light text-left"
              >
                Hello world! I am <strong className="font-semibold text-purple-600 dark:text-purple-400">Tashpia Afroz Nijhum</strong>, currently completing my 9th Semester in the Department of Software Engineering at <strong className="font-semibold text-purple-600 dark:text-purple-400">Daffodil International University</strong>. My computer programming journey started with a profound curiosity to solve complex mathematical blocks, which eventually evolved into a beautiful career dedication for high-fidelity web applications and algorithmic engineering.
              </p>
              <p 
                style={{ transform: 'translateZ(10px)' }}
                className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-light text-left"
              >
                As a software design enthusiast, I immerse myself in studying frontend modern frameworks, JavaScript environments, and clean system layouts. I take great pride in writing readable, maintainable, and pristine lines of code, and translating user needs into creative computational systems.
              </p>
            </div>

            {/* Microstats elevated in Z-index */}
            <div 
              style={{ transform: 'translateZ(35px)' }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 text-center preserve-3d"
            >
              <div>
                <span className="block font-display font-black text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  9th
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5 font-bold">
                  Semester
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                  10+
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5 font-bold">
                  Projects Built
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-xl sm:text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  3.95
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5 font-bold">
                  Peak CGPA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Core Interests and Skills Card 1 (Col span 5 with integrated 3D Helix) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl p-8 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 shadow-md flex flex-col justify-between card-3d-hover preserve-3d overflow-hidden"
            id="about-goals-card"
          >
            <div className="space-y-4 preserve-3d">
              <div 
                style={{ transform: 'translateZ(30px)' }}
                className="flex items-center gap-2.5"
              >
                <div className="p-2.5 rounded-2xl bg-pink-500/15 text-pink-500">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  My Career Roadmap
                </h3>
              </div>
              <p 
                style={{ transform: 'translateZ(15px)' }}
                className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed font-light text-left"
              >
                My overarching career goal is to become an expert software engineer guiding the development of robust, secure, and user-centric systems. I aim to bridge design and code capabilities.
              </p>
            </div>

            {/* Embedded Interactive 3D Helix Structure representation */}
            <div className="h-32 my-2 relative overflow-hidden flex items-center justify-center z-10">
              <About3D />
            </div>

            <div 
              style={{ transform: 'translateZ(25px)' }}
              className="space-y-2 mt-2 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-col text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                <span className="text-[11px] text-slate-605 dark:text-slate-300 font-mono font-medium">Continuous learning & adaptability</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span className="text-[11px] text-slate-605 dark:text-slate-300 font-mono font-medium">Full-stack javascript environments</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="text-[11px] text-slate-605 dark:text-slate-300 font-mono font-medium">Interactive design implementation</span>
              </div>
            </div>
          </motion.div>

          {/* Volunteer & Communication Card (Col span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-6 rounded-3xl p-8 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 shadow-md flex flex-col justify-between card-3d-hover preserve-3d"
            id="about-experience-card"
          >
            <div className="space-y-4 preserve-3d">
              <div 
                style={{ transform: 'translateZ(30px)' }}
                className="flex items-center gap-2.5"
              >
                <div className="p-2.5 rounded-2xl bg-purple-500/15 text-purple-500">
                  <Users className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  Communication & Presentation
                </h3>
              </div>
              <p 
                style={{ transform: 'translateZ(15px)' }}
                className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed font-light text-left"
              >
                I strongly believe a successful developer shouldn't just write great code—they must communicate ideas perfectly. I actively participate in project presentations, academic group panels, and leadership exercises that bolster my team alignment, stakeholder understanding, and project management attributes.
              </p>
            </div>

            <div 
              style={{ transform: 'translateZ(25px)' }}
              className="flex items-center gap-2 mt-6"
            >
              <span className="px-3 py-1.5 text-[10px] font-mono tracking-tight bg-purple-500/10 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 rounded-full border border-purple-500/10 font-bold">
                🗣️ Fluent Presenter
              </span>
              <span className="px-3 py-1.5 text-[10px] font-mono tracking-tight bg-pink-500/10 dark:bg-pink-950/20 text-pink-600 dark:text-pink-300 rounded-full border border-pink-500/10 font-bold">
                🤝 Direct Team Leader
              </span>
            </div>
          </motion.div>

          {/* Philosophy Card (Col span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 rounded-3xl p-8 bg-white dark:bg-slate-950 border border-slate-205 dark:border-white/5 shadow-xl flex flex-col justify-between card-3d-hover preserve-3d"
            id="about-philosophy-card"
          >
            <div className="space-y-4 preserve-3d animate-pulse">
              <div 
                style={{ transform: 'translateZ(30px)' }}
                className="flex items-center gap-2.5"
              >
                <div className="p-2.5 rounded-2xl bg-indigo-550 bg-purple-600/10 text-purple-500">
                  <Lightbulb className="w-5 h-5 animate-bounce" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  My Engineering Blueprint
                </h3>
              </div>
              <blockquote 
                style={{ transform: 'translateZ(25px)' }}
                className="border-l-4 border-purple-500/50 pl-4 py-1"
              >
                <p className="text-slate-750 dark:text-slate-300 italic font-mono text-xs sm:text-sm leading-relaxed text-left">
                  "Software engineering isn't just about compiling functions; it is about building intuitive pathways that feel helpful, load instantaneously, and connect lives cleanly."
                </p>
              </blockquote>
              <p 
                style={{ transform: 'translateZ(10px)' }}
                className="text-[11px] font-mono text-slate-400 dark:text-slate-500 tracking-tight text-left"
              >
                My approach to building software places structural integrity and customer logic first. Whether writing complex structures in Java or crafting high-fidelity pages using Tailwind, I am dedicated to clean execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

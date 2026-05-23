import { motion } from 'motion/react';
import { Sparkles, Code2, MonitorPlay, HeartHandshake, CheckSquare } from 'lucide-react';

interface Skill {
  name: string;
  percentage: number;
}

const TECHNICAL_SKILLS: Skill[] = [
  { name: 'JavaScript', percentage: 85 },
  { name: 'Java', percentage: 78 },
  { name: 'HTML5 & CSS3', percentage: 92 },
  { name: 'C++', percentage: 75 },
  { name: 'C Language', percentage: 80 },
];

const SOFTWARE_SKILLS: Skill[] = [
  { name: 'Microsoft PowerPoint', percentage: 95 },
  { name: 'Microsoft Word', percentage: 90 },
  { name: 'Microsoft Excel', percentage: 80 },
];

const SOFT_SKILLS: Skill[] = [
  { name: 'Presentation Skills', percentage: 95 },
  { name: 'Teamwork & Collaboration', percentage: 92 },
  { name: 'Strategic Communication', percentage: 88 },
  { name: 'Leadership & Delegation', percentage: 85 },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-slate-50 dark:bg-[#090514] border-t border-slate-100 dark:border-slate-905 transition-colors duration-300 relative overflow-hidden perspective-2000"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-purple-500/5 blur-[90px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 rounded-full bg-pink-500/5 blur-[90px] animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-18">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold border border-purple-500/15"
          >
            <Sparkles className="w-3.5 h-3.5" /> Skills Inventory
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Technical & Professional{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            A breakdown of scholastic toolchains, foundational software systems, and core social interaction traits compiled across semesters.
          </p>
        </div>

        {/* Skills Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 preserve-3d">
          {/* Tech/Programming Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="card-3d-hover preserve-3d rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-lg flex flex-col h-full"
            id="technical-skills-card"
          >
            <div 
              style={{ transform: 'translateZ(30px)' }}
              className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800"
            >
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600">
                <Code2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  Technical Languages
                </h3>
                <p className="text-[10px] text-slate-401 text-purple-600/60 dark:text-purple-400/85 font-mono">CODE & SYSTEMS</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 text-left" style={{ transform: 'translateZ(15px)' }}>
              {TECHNICAL_SKILLS.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-705 dark:text-slate-300 font-display">
                      {skill.name}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-[10px]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-[5px] bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Software Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            className="card-3d-hover preserve-3d rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-lg flex flex-col h-full"
            id="software-skills-card"
          >
            <div 
              style={{ transform: 'translateZ(30px)' }}
              className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800"
            >
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500">
                <MonitorPlay className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  Software Productivity
                </h3>
                <p className="text-[10px] text-pink-600/60 dark:text-pink-400/85 font-mono">UTILITIES & DOCUMENTATION</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 text-left" style={{ transform: 'translateZ(15px)' }}>
              {SOFTWARE_SKILLS.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-705 dark:text-slate-300 font-display">
                      {skill.name}
                    </span>
                    <span className="text-pink-600 dark:text-pink-400 font-mono text-[10px]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-[5px] bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-pink-500 to-amber-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            className="card-3d-hover preserve-3d rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-lg flex flex-col h-full"
            id="soft-skills-card"
          >
            <div 
              style={{ transform: 'translateZ(30px)' }}
              className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800 animate-pulse"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-505 text-blue-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
                  Social & Communication
                </h3>
                <p className="text-[10px] text-blue-601 text-blue-600/60 dark:text-blue-400/85 font-mono">LEADERSHIP & COLLABORATION</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 text-left" style={{ transform: 'translateZ(15px)' }}>
              {SOFT_SKILLS.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-705 dark:text-slate-300 font-display">
                      {skill.name}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-[5px] bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick highlight banner info */}
        <div className="mt-12 p-6 rounded-2xl glass-effect border border-slate-200/50 dark:border-white/5 flex flex-wrap gap-4 items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 block">
              <CheckSquare className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-805 dark:text-slate-200 font-display">University Performance Standard</p>
              <p className="text-[10px] text-slate-400">Maintained high score average throughout DIU Software Engineering modules.</p>
            </div>
          </div>
          <p className="text-[11px] font-mono font-medium text-pink-500 dark:text-pink-400 uppercase">
            🚀 Ready for Full-scale production internships
          </p>
        </div>
      </div>
    </section>
  );
}

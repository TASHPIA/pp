import { motion } from 'motion/react';
import { Calendar, Award, MapPin, Users, HeartHandshake, Mic, Star } from 'lucide-react';
import Activities3D from './Activities3D';

interface ActivityItem {
  role: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
  skillsAcquired: string[];
  type: 'volunteer' | 'presentation' | 'teamwork';
}

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    role: 'Co-curricular Orientation Volunteer',
    organization: 'Daffodil International University Co-curricular Wing',
    duration: '2023 - Present',
    location: 'Savar, Dhaka',
    description: 'Active event facilitator organizing campus information seminars, freshman orientations, and national-level university programs. Led public registrations, logistics alignments, and student coordination modules.',
    skillsAcquired: ['Command Management', 'Logistics coordination', 'Cooperative operations'],
    type: 'volunteer',
  },
  {
    role: 'Interactive Presentation Leader',
    organization: 'DIU Software Engineering Class Panels',
    duration: '2022 - Ongoing',
    location: 'SE Department',
    description: 'Chosen as a recurring lead presenter for various software analysis modules including Software Requirements Spec (SRS) defense, system validation runs, and system architecture pitch reports.',
    skillsAcquired: ['Public speaking', 'Slide design engineering', 'Audience engagement'],
    type: 'presentation',
  },
  {
    role: 'Scrum Team Lead & Coordinator',
    organization: 'Academic Peer Groups (DBMS & QA Testing)',
    duration: '2024 - 2025',
    location: 'DIU Campus Labs',
    description: 'Organized and led agile student cohorts across key projects like the Student Management Console. Allocated scrum task cards, checked code merges, tracked bug matrices, and curated system documents.',
    skillsAcquired: ['Agile workflow delegation', 'Code merge checkpoints', 'Conflict mitigation'],
    type: 'teamwork',
  },
];

export default function Experience() {
  return (
    <section
      id="activities"
      className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-900/60 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-[30%] right-[5%] w-72 h-72 rounded-full bg-purple-500/5 blur-[90px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-72 h-72 rounded-full bg-pink-500/5 blur-[90px] animate-pulse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold"
          >
            <HeartHandshake className="w-3.5 h-3.5" /> Co-Curricular Voyage
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-4">
            Experience &{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Campus Activities
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed text-center">
            The social leadership, presentation milestones, and community volunteering actions that shape my engineering principles outside code compiles.
          </p>
        </div>

        {/* Split Grid layout for dynamic portfolio balancing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Experience Cards responsive column block (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            {ACTIVITIES_DATA.map((activity, idx) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={activity.role}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-905 border border-slate-200/60 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row gap-6 relative group"
                  id={`activity-card-${activity.role.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* Visual Accent line/dot indicator inside each card for premium design rhythm */}
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-y-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Left block icon category and details banner */}
                  <div className="md:w-1/4 flex flex-col items-start space-y-3 shrink-0">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                      {activity.type === 'volunteer' && <HeartHandshake className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                      {activity.type === 'presentation' && <Mic className="w-6 h-6 text-pink-600 dark:text-pink-400" />}
                      {activity.type === 'teamwork' && <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                    </div>

                    <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                      {activity.type} Activity
                    </span>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: descriptive highlights */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-mono text-[9px] font-medium border border-slate-200 dark:border-slate-800 mb-2">
                        <Star className="w-3 h-3 text-pink-500" />
                        <span>DIU Campus Highlight</span>
                      </span>

                      <h3 className="font-display font-extrabold text-base md:text-lg text-slate-850 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {activity.role}
                      </h3>
                      <p className="text-pink-600 dark:text-pink-400 text-xs font-semibold mb-4">
                        {activity.organization}
                      </p>

                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                        {activity.description}
                      </p>
                    </div>

                    {/* Micro skills acquired pill badge listings */}
                    <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 font-sans">
                      <span className="text-[10px] text-slate-400 self-center font-mono mr-1.5">Acquired Traits:</span>
                      {activity.skillsAcquired.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[9px] font-mono tracking-tight bg-slate-550/5 dark:bg-slate-900 text-slate-550 dark:text-slate-400 rounded-md border border-slate-200/50 dark:border-slate-805"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive 3D Social Affinity Constellation (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-3xl p-6 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-xl text-center flex flex-col justify-between h-full min-h-[420px] relative overflow-hidden"
            id="activities-3d-hologram-panel"
          >
            <div className="text-left z-20 font-sans">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-bold tracking-widest uppercase">
                Collaboration Map
              </span>
              <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white mt-1.5">
                Team Coordination Mesh
              </h3>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 mt-1 leading-relaxed font-light">
                A dynamic node graph representing collaborative relationships, student peer networks, and group coordination activities.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 relative h-64">
              <Activities3D />
            </div>

            <div className="z-10 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-150 dark:border-slate-800/80 text-left font-sans">
              <span className="block text-[9px] font-mono text-pink-500 uppercase tracking-wider font-bold">
                Network Dynamics
              </span>
              <p className="text-[10px] text-slate-505 leading-relaxed mt-0.5 font-light">
                Motion responds to cursor position, visually modeling real-time alignment and communication loops in agile team settings.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

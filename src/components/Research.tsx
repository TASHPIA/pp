import { motion } from 'motion/react';
import { 
  Dna, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Target, 
  FileSpreadsheet, 
  ArrowUpRight, 
  Beaker, 
  Database,
  Search,
  Hourglass,
  GraduationCap
} from 'lucide-react';
import Research3D from './Research3D';

interface ResearchArea {
  name: string;
}

const RESEARCH_AREAS: ResearchArea[] = [
  { name: 'Machine Learning' },
  { name: 'Bioinformatics' },
  { name: 'RNA Analysis' },
  { name: 'Protein Interaction Prediction' }
];

interface ResearchCardItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  bulletColor: string;
  details: string;
  subpoints: string[];
}

const SHOWN_RESEARCH_CARDS: ResearchCardItem[] = [
  {
    id: 'overview',
    title: 'Research Overview',
    category: 'INTRODUCTION',
    icon: Beaker,
    bulletColor: 'from-blue-500 to-indigo-500',
    details: 'This project targets the systemic identification of RNA-Protein Interactions (RPI) inside biological structures. By using predictive computational architectures, we can fast-track medical insights and therapeutic pipelines without exhaustive physical lab arrays.',
    subpoints: [
      'Focuses on sequence-based structural identification',
      'Addresses molecular classification challenges',
      'Provides pathways for genomic medicine alignment'
    ]
  },
  {
    id: 'literature',
    title: 'Literature Review',
    category: 'FORMAL PROGRESS',
    icon: BookOpen,
    bulletColor: 'from-purple-500 to-pink-500',
    details: 'Conducted a deep review of 20 core indexed papers in biotechnology and computing. Surveyed limits in previous feature extraction systems, sequence matching algorithms, and general network-based prediction tools.',
    subpoints: [
      '20 high-impact scientific journals reviewed',
      'Extracted critical feature-extraction bottlenecks',
      'Mapped historical prediction matrices (2018-2025)'
    ]
  },
  {
    id: 'objectives',
    title: 'Research Objectives',
    category: 'TARGET SCOPE',
    icon: Target,
    bulletColor: 'from-pink-500 to-amber-500',
    details: 'To engineering an intelligent computational pathway using highly optimized machine learning models that can predict binding affinity channels between biological sequences with high specificity.',
    subpoints: [
      'Formulate robust high-performance model layers',
      'Optimize false-positive prediction factors',
      'Publish verifiable bioinformatics study outputs'
    ]
  },
  {
    id: 'techniques',
    title: 'ML Techniques',
    category: 'ALGORITHM STACK',
    icon: Cpu,
    bulletColor: 'from-indigo-500 to-purple-500',
    details: 'Comparing modern supervised models alongside sequence representation pipelines. Inspecting performance ratios for Random Forests, Support Vector Machines (SVM), and sequence embeddings.',
    subpoints: [
      'Comparing classical ML against neural nets',
      'Utilizing K-mer frequency sequence descriptors',
      'Evaluating attention-based transformer weights'
    ]
  },
  {
    id: 'datasets',
    title: 'Dataset Analysis',
    category: 'DATA CURATION',
    icon: Database,
    bulletColor: 'from-blue-600 to-cyan-500',
    details: 'Reviewing public bioinformatics platforms and benchmarks (such as RPI369, RPI480, and NPInter). Formulating positive-negative sampling ratios to eliminate biased model training cycles.',
    subpoints: [
      'Scoping verified sequence dataset structures',
      'Configuring strict training-testing splits',
      'Inspecting molecular sequence length variation'
    ]
  },
  {
    id: 'future-work',
    title: 'Future Work',
    category: 'UPCOMING MILESTONES',
    icon: FileSpreadsheet,
    bulletColor: 'from-emerald-500 to-teal-500',
    details: 'Developing an end-to-end Python pipeline to automate feature conversion, train selected classifiers with hyperparameter grid-searches, and bundle outcomes into an online prediction portal.',
    subpoints: [
      'Build localized Web-based predictive applet',
      'Incorporate multi-species validation algorithms',
      'Transition theoretical results into SwE Thesis'
    ]
  }
];

export default function Research() {
  return (
    <section
      id="research"
      className="py-24 bg-white dark:bg-[#07040e] border-t border-slate-100 dark:border-slate-905 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background visual graphics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[2%] w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[2%] w-96 h-96 rounded-full bg-purple-500/5 blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold border border-blue-500/15"
          >
            <Dna className="w-3.5 h-3.5 text-blue-500" /> Thesis & Research
          </motion.div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white mb-3">
            Scholarly{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Inquiry
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed text-center">
            Machine Learning Based RNA-Protein Interaction Prediction Research
          </p>
        </div>

        {/* Dashboard Stat Banner */}
        <div className="mb-12 border border-slate-200/50 dark:border-white/5 rounded-3xl bg-slate-50/50 dark:bg-slate-950/60 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between shadow-sm relative overflow-hidden backdrop-blur-md">
          {/* Subtle bio-mesh decorative grid background */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
          
          <div className="flex-1 text-left">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                Thesis Focus
              </span>
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <Hourglass className="w-2.5 h-2.5 animate-spin" /> Recently Started
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <Search className="w-2.5 h-2.5" /> 20 Papers Reviewed
              </span>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-white mb-2 leading-snug">
              Identification of RNA-Protein Interaction Prediction Using Machine Learning
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-4xl leading-relaxed">
              Applying state-of-the-art computational algorithms to accurately model sequence-based molecular affinities. This research addresses complex genomic identification challenges in biomedical informatics.
            </p>

            {/* Area Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {RESEARCH_AREAS.map((tag) => (
                <span
                  key={tag.name}
                  className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-350 font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 shrink-0 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center text-left shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-blue-500 dark:text-blue-400 flex items-center gap-1">
              <Target className="w-3 h-3" /> Core Goal
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-350 font-normal leading-relaxed mt-2 font-display">
              “Develop an intelligent machine learning model for accurate RNA-Protein interaction prediction.”
            </p>
          </div>
        </div>

        {/* Core Layout Split: Cards Grid left/hologram card right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 6 cards grid columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {SHOWN_RESEARCH_CARDS.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  key={card.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-905 border border-slate-200/60 dark:border-white/5 shadow-md flex flex-col justify-between group hover:border-blue-500/20 dark:hover:border-blue-500/10 hover:shadow-lg transition-all"
                  id={`research-card-${card.id}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-450 border border-slate-100 dark:border-slate-800">
                          <CardIcon className="w-4.5 h-4.5 text-blue-500 dark:text-blue-450" />
                        </div>
                        <div>
                          <span className="block text-[8px] font-mono tracking-widest text-slate-400 font-bold uppercase">{card.category}</span>
                          <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white mt-0.5 leading-none">
                            {card.title}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-550 dark:text-slate-400 font-light leading-relaxed mb-4">
                      {card.details}
                    </p>
                  </div>

                  {/* Bullet Subpoint Indicators */}
                  <div className="space-y-1.5 pt-3.5 border-t border-slate-100 dark:border-slate-850/60 font-sans">
                    {card.subpoints.map((pt, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${card.bulletColor}`} />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Side Panel showing holographic Helix DNA RNA visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-3xl p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-md text-center flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden"
            id="research-3d-hologram-panel"
          >
            {/* Measuring background grids */}
            <div className="absolute inset-[15%] pointer-events-none opacity-40 border border-dashed border-purple-500/10 rounded-full" />
            
            <div className="text-left z-20">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-bold tracking-widest uppercase">
                Molecular Deck
              </span>
              <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white mt-1.5">
                RNA-Protein Visualizer
              </h3>
              <p className="text-[11px] text-slate-505 dark:text-slate-400 mt-1 leading-relaxed font-light">
                An interactive vector double-helix projecting the complementary sequence base bonds of RNA nucleobases. Hover to inspect.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center relative p-2 h-64">
              <Research3D />
            </div>

            <div className="z-10 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-left shadow-sm">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <span className="block text-[9px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider font-bold">
                  Scholastic Framework Work
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-2 font-light">
                This project represents a formal software engineering thesis tracking molecular classification algorithms to aid bioinformatics advancement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

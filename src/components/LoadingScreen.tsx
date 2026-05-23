import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Portfolio...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        
        // Dynamic loading text
        if (prevProgress > 20 && prevProgress <= 45) {
          setLoadingText('Loading creative assets...');
        } else if (prevProgress > 45 && prevProgress <= 75) {
          setLoadingText('Compiling Software Engineering journey...');
        } else if (prevProgress > 75) {
          setLoadingText('Feminine modern systems online.');
        }

        return prevProgress + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white selection:bg-purple-500/30"
        id="loading-screen"
      >
        {/* Animated background radial glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-blue-500/5 blur-[100px]" />
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-pulse [animation-delay:1s]" />
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-center relative"
          >
            {/* Pulsing ring */}
            <div className="absolute -inset-4 rounded-full border border-purple-500/20 animate-ping [animation-duration:2s]" />
            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 shadow-xl shadow-purple-500/5 flex items-center justify-center">
              <Terminal className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-1"
          >
            Tashpia Afroz Nijhum
          </motion.h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-widest font-mono text-pink-300 uppercase mb-8"
          >
            Software Engineer / Student
          </motion.span>

          {/* Progress bar */}
          <div className="w-full h-[3px] bg-slate-900 rounded-full mb-3 overflow-hidden border border-slate-800/50">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center w-full min-h-[16px] text-[10px] font-mono text-slate-400">
            <span className="animate-pulse">{loadingText}</span>
            <span className="text-purple-400 font-bold">{Math.min(progress, 100)}%</span>
          </div>

          {/* Early Skip button for speedy UX */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 30 ? 0.4 : 0 }}
            whileHover={{ opacity: 0.8, scale: 1.05 }}
            onClick={onComplete}
            className="mt-8 text-[11px] font-mono tracking-wider uppercase border border-slate-800 hover:border-purple-500/30 hover:bg-purple-950/20 px-4 py-1.5 rounded-full transition-all duration-300"
            id="skip-loading-btn"
          >
            Skip Loader
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

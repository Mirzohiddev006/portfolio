import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load components for better performance
const SceneContainer = lazy(() => import('./components/canvas/SceneContainer'));
const Navbar = lazy(() => import('./components/dom/Navbar'));
const Hero = lazy(() => import('./components/dom/Hero'));
const About = lazy(() => import('./components/dom/About'));
const Skills = lazy(() => import('./components/dom/Skills'));
const Projects = lazy(() => import('./components/dom/Projects'));
const Experience = lazy(() => import('./components/dom/Experience'));
const Contact = lazy(() => import('./components/dom/Contact'));
const Footer = lazy(() => import('./components/dom/Footer'));

// Loader Component
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING SYSTEM...');

  useEffect(() => {
    const statuses = [
      'INITIALIZING SYSTEM...',
      'LOADING NEURAL NETWORKS...',
      'ESTABLISHING CONNECTION...',
      'RENDERING 3D ENVIRONMENT...',
      'SYSTEM READY',
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const statusIndex = Math.min(Math.floor(newProgress / 25), statuses.length - 1);
        setStatus(statuses[statusIndex]);
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-6xl text-[#00ff41] tracking-widest" style={{ textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41' }}>
            PORTFOLIO
          </h1>
          <p className="font-mono text-sm text-[#00ff41]/60 mt-2">v2.0.25 // NEO-FUTURISTIC EDITION</p>
        </motion.div>

        <div className="relative w-32 h-32">
          <motion.div className="absolute inset-0 border-2 border-[#00ff41]/30 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute inset-2 border-2 border-[#00ffff]/30 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute inset-4 border-2 border-[#ff00ff]/30 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-2xl text-[#00ff41]" style={{ textShadow: '0 0 10px #00ff41' }}>{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="w-64 md:w-96">
          <div className="h-1 bg-[#0f0f0f] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00ff41] via-[#00ffff] to-[#00ff41]"
              style={{ boxShadow: '0 0 10px #00ff41' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <motion.p key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-[#00ff41]/80 mt-3 text-center tracking-wider">
            [{status}]
          </motion.p>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#00ff41]/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#00ff41]/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#00ff41]/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#00ff41]/30" />
    </motion.div>
  );
};

// Loading Fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<LoadingFallback />}>
              {/* 3D Background */}
              <SceneContainer />
              
              {/* Grid overlay */}
              <div className="fixed inset-0 pointer-events-none z-0" style={{
                backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />

              {/* Vignette */}
              <div className="fixed inset-0 pointer-events-none z-10" style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
              }} />

              {/* Navigation */}
              <Navbar />

              {/* Main Content */}
              <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

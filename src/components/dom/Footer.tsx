import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-[#00ff41]/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }} className="font-display text-xl text-[#00ff41] tracking-widest" style={{ textShadow: '0 0 10px #00ff41' }}>
            &lt;DEV/&gt;
          </motion.a>

          <div className="text-center">
            <p className="font-mono text-xs text-gray-500">Designed & Built with 💚 by Mirzohid</p>
            <p className="font-mono text-xs text-gray-600 mt-1">© {currentYear} All Rights Reserved</p>
          </div>

          <div className="font-mono text-xs text-gray-500 text-right">
            <p>React • Three.js • Framer Motion</p>
            <p className="text-[#00ff41]/50 mt-1">v2.0.25</p>
          </div>
        </div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent mt-8" />

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
            <span className="font-mono text-xs text-gray-500">SYSTEM ONLINE</span>
          </div>
          <span className="text-gray-700">|</span>
          <span className="font-mono text-xs text-gray-500">DEPLOYED ON VERCEL</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

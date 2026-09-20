import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, type Language } from '../../lib/LanguageContext';

const navHrefs = ['#hero', '#about', '#skills', '#projects', '#experience', '#contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();
  const navLinks = navHrefs.map((href, index) => ({ label: t.nav[index], href }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#050505]/90 backdrop-blur-lg py-3' : 'py-5'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(0, 255, 65, 0.1)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
              whileHover={{ scale: 1.05 }}
              className="font-display text-lg sm:text-xl md:text-2xl text-[#00ff41] tracking-wide sm:tracking-widest"
              style={{ textShadow: '0 0 10px #00ff41' }}
            >
              &lt;DEV/&gt;
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative font-mono text-xs lg:text-sm tracking-wide lg:tracking-wider transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#00ff41]'
                      : 'text-gray-400 hover:text-[#00ff41]'
                  }`}
                  style={activeSection === link.href.slice(1) ? { textShadow: '0 0 5px #00ff41' } : {}}
                >
                  <span className="text-[#00ff41]/50 mr-0.5 lg:mr-1">0{index + 1}.</span>
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#00ff41]"
                      style={{ boxShadow: '0 0 10px #00ff41' }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-1 border border-[#00ff41]/20 rounded px-1 py-1 ml-4" aria-label={t.language}>
              {(['uz', 'en', 'ru'] as Language[]).map((item) => (
                <button key={item} onClick={() => setLanguage(item)} className={`px-2 py-1 font-mono text-[10px] uppercase rounded transition-colors ${language === item ? 'bg-[#00ff41] text-black' : 'text-gray-500 hover:text-[#00ff41]'}`}>
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#00ff41] origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-[#00ff41]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#00ff41] origin-center"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-[#050505]/95 backdrop-blur-lg"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#0a0a0a]/95 backdrop-blur-lg border-l border-[#00ff41]/20 flex flex-col"
            >
              <div className="h-20" />
              <div className="flex items-center gap-1 px-4 sm:px-6 md:px-8 mb-4">
                <span className="font-mono text-[10px] text-gray-600 mr-2">{t.language}:</span>
                {(['uz', 'en', 'ru'] as Language[]).map((item) => (
                  <button key={item} onClick={() => setLanguage(item)} className={`px-2 py-1 font-mono text-[10px] uppercase rounded border ${language === item ? 'bg-[#00ff41] text-black border-[#00ff41]' : 'text-gray-500 border-[#00ff41]/20'}`}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-5 md:space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`font-mono text-base sm:text-lg tracking-wider ${
                      activeSection === link.href.slice(1) ? 'text-[#00ff41]' : 'text-gray-400'
                    }`}
                  >
                    <span className="text-[#00ff41]/50 mr-2 sm:mr-3">0{index + 1}.</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

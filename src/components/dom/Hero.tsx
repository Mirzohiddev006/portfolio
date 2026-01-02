import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Typewriter Hook
const useTypewriter = (words: string[], typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  return text;
};

const Hero = () => {
  const roles = ['FRONTEND DEVELOPER', 'UI/UX ENGINEER', 'REACT SPECIALIST', 'WEB ARCHITECT', 'CREATIVE CODER'];
  const typedText = useTypewriter(roles, 80, 40, 2500);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)', delay: 0.5 }
      );
    }
  }, []);

  const titleText = 'MIRZOHID';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mb-8"
          style={{ boxShadow: '0 0 20px #00ff41' }}
        />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[#00ff41] text-sm md:text-base tracking-widest mb-4"
        >
          &lt;HELLO WORLD /&gt; I AM
        </motion.p>

        {/* Main Title */}
        <h1 ref={titleRef} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
          {titleText.split('').map((char, index) => (
            <span key={index} className="char inline-block" style={{ textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41' }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-[#00ff41]/80 tracking-wider">
            <span className="text-gray-500">&gt;</span>{' '}
            <span style={{ textShadow: '0 0 5px #00ff41' }}>{typedText}</span>
            <span className="animate-pulse text-[#00ff41]">_</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting immersive digital experiences through the fusion of
          <span className="text-[#00ff41]"> cutting-edge technology</span> and
          <span className="text-[#00ffff]"> creative design</span>. Building the future, one line of code at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative px-8 py-4 font-mono text-sm tracking-wider overflow-hidden border border-[#00ff41] rounded text-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px #00ff41' }}
            whileTap={{ scale: 0.98 }}
          >
            [ VIEW PROJECTS ]
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 font-mono text-sm tracking-wider text-gray-400 hover:text-[#00ff41] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GET IN TOUCH →
          </motion.a>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16 flex items-center justify-center gap-8 font-mono text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
            <span>AVAILABLE FOR WORK</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#00ff41]">◆</span>
            <span>TASHKENT, UZBEKISTAN</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-[#00ff41]/60 tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00ff41] to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-[#00ff41]/20" />
      <div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-[#00ff41]/20" />
      <div className="absolute bottom-24 left-8 w-24 h-24 border-l border-b border-[#00ff41]/20" />
      <div className="absolute bottom-24 right-8 w-24 h-24 border-r border-b border-[#00ff41]/20" />
    </section>
  );
};

export default Hero;

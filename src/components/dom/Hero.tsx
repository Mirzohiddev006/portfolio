import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Typewriter Hook
const useTypewriter = (
  words: string[],
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2500
) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
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
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
  ]);

  return text;
};

const Hero = () => {
  const roles = [
    "FRONTEND DEVELOPER",
    "UI/UX ENGINEER",
    "REACT SPECIALIST",
    "WEB ARCHITECT",
    "CREATIVE CODER",
  ];
  const typedText = useTypewriter(roles, 80, 40, 2500);
  const titleLine1 = "MIRZOHID";
  const titleLine2 = "IBROHIMJONOV";
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef1.current) {
      const chars = titleRef1.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }
    if (titleRef2.current) {
      const chars = titleRef2.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.7,
        }
      );
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-24"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-20 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"
          style={{ boxShadow: "0 0 20px #00ff41" }}
        />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[#00ff41] text-xs sm:text-sm md:text-base tracking-wider sm:tracking-widest mb-3 sm:mb-4 px-2"
        >
          &lt;HELLO WORLD /&gt; I AM
        </motion.p>

        {/* Main Title */}
        <div className="mb-3 sm:mb-4 md:mb-6 px-2">
          <h1
            ref={titleRef1}
            className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight sm:leading-normal"
          >
            {titleLine1.split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{
                  textShadow:
                    "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h1
            ref={titleRef2}
            className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight sm:leading-normal"
          >
            {titleLine2.split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{
                  textShadow:
                    "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-6 sm:mb-8 px-2"
        >
          <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#00ff41]/80 tracking-wide sm:tracking-wider break-words">
            <span className="text-gray-500">&gt;</span>{" "}
            <span style={{ textShadow: "0 0 5px #00ff41" }}>{typedText}</span>
            <span className="animate-pulse text-[#00ff41]">_</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-4 sm:px-6"
        >
          Crafting immersive digital experiences through the fusion of
          <span className="text-[#00ff41]"> cutting-edge technology</span> and
          <span className="text-[#00ffff]"> creative design</span>. Building the
          future, one line of code at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider overflow-hidden border border-[#00ff41] rounded text-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300 text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px #00ff41" }}
            whileTap={{ scale: 0.98 }}
          >
            [ VIEW PROJECTS ]
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider text-gray-400 hover:text-[#00ff41] transition-colors duration-300 text-center"
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
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 font-mono text-[10px] xs:text-xs text-gray-500 px-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
            <span className="whitespace-nowrap">AVAILABLE FOR WORK</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#00ff41]">◆</span>
            <span className="whitespace-nowrap">TASHKENT, UZBEKISTAN</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] xs:text-xs text-[#00ff41]/60 tracking-widest">
            SCROLL
          </span>
          <div className="w-px h-8 sm:h-10 md:h-12 bg-gradient-to-b from-[#00ff41] to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="hidden sm:block absolute top-16 sm:top-20 md:top-24 left-4 sm:left-6 md:left-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-l border-t border-[#00ff41]/20" />
      <div className="hidden sm:block absolute top-16 sm:top-20 md:top-24 right-4 sm:right-6 md:right-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-r border-t border-[#00ff41]/20" />
      <div className="hidden sm:block absolute bottom-16 sm:bottom-20 md:bottom-24 left-4 sm:left-6 md:left-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-l border-b border-[#00ff41]/20" />
      <div className="hidden sm:block absolute bottom-16 sm:bottom-20 md:bottom-24 right-4 sm:right-6 md:right-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-r border-b border-[#00ff41]/20" />
    </section>
  );
};

export default Hero;

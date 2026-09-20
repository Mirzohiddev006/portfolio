import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import { projects } from "./Projects";

const technologies = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Three.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Git",
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const codeSnippet = language === "uz"
    ? `const developer = {
  name: "Mirzohid",
  role: "Frontend dasturchi",
  passion: "Kuchli UI yaratish",
  available: true
};`
    : language === "ru"
      ? `const developer = {
  name: "Mirzohid",
  role: "Frontend-разработчик",
  passion: "Создавать UI",
  available: true
};`
      : `const developer = {
  name: "Mirzohid",
  role: "Frontend Developer",
  passion: "Building amazing UIs",
  available: true
};`;
  const stats = [
    { value: "1+", label: t.stats[0] },
    { value: `${projects.length}+`, label: t.stats[1] },
    { value: "10+", label: t.stats[2] },
    { value: "100%", label: t.stats[3] },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm text-[#00ff41] tracking-wider sm:tracking-widest">
            01. // {t.about}
          </span>
          <h2
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            {t.aboutTitle}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-lg">
              <p className="font-body text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {t.aboutIntro}
              </p>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-lg">
              <p className="font-body text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {t.aboutSpecialty}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="font-mono text-xs sm:text-sm text-[#00ff41] mb-3 sm:mb-4 tracking-wide sm:tracking-wider">
                // {t.techStack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm text-[#00ff41]/80 border border-[#00ff41]/30 rounded hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats & Code */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:border-[#00ff41]/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300"
                >
                  <span
                    className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#00ff41] block"
                    style={{ textShadow: "0 0 10px #00ff41" }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] xs:text-xs text-gray-400 tracking-wider mt-1 sm:mt-2 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-5 md:mt-6 bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0f0f0f] border-b border-[#00ff41]/10">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 font-mono text-[10px] xs:text-xs text-gray-500">
                  about.tsx
                </span>
              </div>
              <pre className="p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-400 overflow-x-auto">
                <code>
                  {codeSnippet}
                </code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

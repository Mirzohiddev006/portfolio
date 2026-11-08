import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";

type Skill = { name: string; level: number };

const skillCategories: { key: "frontend" | "backend" | "tools"; color: string; skills: Skill[] }[] = [
  {
    key: "frontend",
    color: "#00ff41",
    skills: [
      { name: "React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS / shadcn/ui", level: 90 },
      { name: "TanStack Query / Zustand", level: 85 },
      { name: "Framer Motion / GSAP", level: 75 },
      { name: "React Three Fiber", level: 65 },
    ],
  },
  {
    key: "backend",
    color: "#00ffff",
    skills: [
      { name: "Python / FastAPI", level: 78 },
      { name: "aiogram (Telegram Bots)", level: 82 },
      { name: "PostgreSQL / PostGIS", level: 70 },
      { name: "Node.js / Express", level: 68 },
      { name: "SQLite", level: 72 },
    ],
  },
  {
    key: "tools",
    color: "#ff00ff",
    skills: [
      { name: "Feature-Sliced Design", level: 88 },
      { name: "RBAC / REST APIs", level: 85 },
      { name: "Git / GitHub", level: 88 },
      { name: "Vercel / AWS EC2", level: 72 },
      { name: "Nginx / PM2", level: 65 },
      { name: "MSW / Claude Code", level: 80 },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const titles = { frontend: t.skillsFrontend, backend: t.skillsBackend, tools: t.skillsTools };
  const localizedCategories = skillCategories.map((category) => ({
    ...category,
    title: titles[category.key],
  }));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm text-[#00ff41] tracking-wider sm:tracking-widest">
            02. // EXPERTISE
          </span>
          <h2
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            {t.skills}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {localizedCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`bg-[#0a0a0a]/85 md:bg-[#0a0a0a]/70 md:backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-xl hover:border-[#00ff41]/30 transition-colors duration-300 ${categoryIndex === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <h3
                className="font-display text-lg sm:text-xl mb-4 sm:mb-5 md:mb-6 tracking-wide sm:tracking-wider"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  return (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs sm:text-sm text-gray-300">
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-[10px] xs:text-xs"
                          style={{ color: category.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay:
                              0.5 + categoryIndex * 0.2 + skillIndex * 0.05,
                          }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${category.color}, ${category.color}80)`,
                            boxShadow: `0 0 10px ${category.color}`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-[#0a0a0a]/85 md:bg-[#0a0a0a]/70 md:backdrop-blur-lg border border-[#00ff41]/20 rounded-lg">
            <span className="text-xl sm:text-2xl">🚀</span>
            <div>
              <p className="font-mono text-xs sm:text-sm text-gray-400">
                {t.learning}
              </p>
              <p className="font-mono text-[10px] xs:text-xs text-[#00ff41]/60 mt-0.5 sm:mt-1">
                {t.learningDetail}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

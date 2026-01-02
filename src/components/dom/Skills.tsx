import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillsData = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Three.js", level: 75, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js", level: 80, category: "frontend" },
  { name: "HTML", level: 95, category: "frontend" },
  { name: "CSS", level: 95, category: "frontend" },
  { name: "Git", level: 85, category: "tools" },
  { name: "Docker", level: 65, category: "tools" },
  { name: "AWS", level: 60, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
];

const skillCategories = [
  {
    title: "Frontend",
    color: "#00ff41",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Three.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tools & Others",
    color: "#ff00ff",
    skills: ["Git", "Docker", "AWS", "Figma"],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 overflow-hidden"
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
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            SKILLS & TECHNOLOGIES
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-xl hover:border-[#00ff41]/30 transition-all duration-300"
            >
              <h3
                className="font-display text-lg sm:text-xl mb-4 sm:mb-5 md:mb-6 tracking-wide sm:tracking-wider"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skillName, skillIndex) => {
                  const skill = skillsData.find((s) => s.name === skillName);
                  if (!skill) return null;

                  return (
                    <div key={skillName}>
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
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/20 rounded-lg">
            <span className="text-xl sm:text-2xl">🚀</span>
            <div>
              <p className="font-mono text-xs sm:text-sm text-gray-400">
                Always learning and exploring new technologies
              </p>
              <p className="font-mono text-[10px] xs:text-xs text-[#00ff41]/60 mt-0.5 sm:mt-1">
                // Currently diving into: AI/ML, WebGPU, Rust
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

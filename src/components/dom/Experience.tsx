import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";

interface ExperienceItem {
  id: string;
  company: string;
  current: boolean;
  technologies: string[];
}

// Text (position, dates, bullet points) lives in the translations; the order
// here must match `experienceItems` there.
const experiences: ExperienceItem[] = [
  {
    id: "mimoram",
    company: "Mimoram · AI startup",
    current: true,
    technologies: ["React", "TypeScript", "Python", "FastAPI", "AI"],
  },
  {
    id: "freelance",
    company: "Freelance",
    current: true,
    technologies: ["React", "FastAPI", "PostGIS", "aiogram", "Telegram Bots"],
  },
  {
    id: "cognilabs",
    company: "Cognilabs Inc.",
    current: false,
    technologies: ["React", "TypeScript", "FSD", "Recharts", "Design Tokens"],
  },
];

const TimelineItem = ({
  experience,
  index,
  isLast,
}: {
  experience: ExperienceItem;
  index: number;
  isLast: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const { t } = useLanguage();
  const text = t.experienceItems[index];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:gap-8 pl-7 md:pl-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Mobile rail */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 flex flex-col items-center">
        <span
          className={`mt-6 w-3 h-3 rounded-full border-2 border-[#00ff41] ${experience.current ? "bg-[#00ff41]" : "bg-[#0a0a0a]"}`}
          style={{ boxShadow: "0 0 10px rgba(0,255,65,0.7)" }}
        />
        {!isLast && <span className="flex-1 w-px bg-gradient-to-b from-[#00ff41]/60 to-[#00ff41]/10 -mb-8" />}
      </div>

      {/* Desktop timeline center */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex-col items-center">
        <div className="relative z-10 mt-7">
          <div
            className={`w-4 h-4 border-2 border-[#00ff41] rounded-full ${experience.current ? "bg-[#00ff41]" : "bg-[#0a0a0a]"}`}
            style={{ boxShadow: "0 0 15px #00ff41" }}
          />
          {experience.current && (
            <span className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40 animate-ping" />
          )}
        </div>
        {!isLast && (
          <div className="flex-1 w-px -mb-12 bg-gradient-to-b from-[#00ff41] via-[#00ff41]/40 to-[#00ff41]/10" />
        )}
      </div>

      {/* Content */}
      <div className="md:w-[calc(50%-2rem)]">
        <div className="bg-[#0a0a0a]/85 md:bg-[#0a0a0a]/70 md:backdrop-blur-lg border border-[#00ff41]/10 p-4 sm:p-5 md:p-6 rounded-xl hover:border-[#00ff41]/30 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-[border-color,box-shadow] duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs text-[#00ff41]">{text.period}</span>
            {experience.current && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                NOW
              </span>
            )}
          </div>

          <h3 className="font-display text-lg sm:text-xl text-white mb-1">{text.position}</h3>
          <p className="font-body text-base text-[#00ffff] mb-1">@ {experience.company}</p>
          <p className="font-mono text-[11px] text-gray-500 mb-4">◆ {text.location}</p>

          <ul className="space-y-2 mb-4">
            {text.points.map((point) => (
              <li key={point} className="flex gap-2 font-body text-gray-400 text-sm sm:text-[15px] leading-relaxed">
                <span className="text-[#00ff41] shrink-0">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-[#00ff41]/75 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <span className="font-mono text-xs sm:text-sm text-[#00ff41] tracking-wider sm:tracking-widest">
            04. // {t.journey}
          </span>
          <h2
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            {t.experience}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 md:space-y-12">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 md:px-6 py-3 font-mono text-xs sm:text-sm text-[#00ff41] border border-[#00ff41]/50 rounded-lg hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300"
          >
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>{t.downloadResume}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import ProjectVisual, { type VisualKind } from "./ProjectVisual";

interface Project {
  id: string;
  title: string;
  visual: VisualKind;
  accent: string;
  /** Where the project was built, shown as a small tag. */
  context?: string;
  technologies: string[];
  featured?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const projects: Project[] = [
  {
    id: "kas-crm",
    title: "KAS CRM",
    visual: "chat",
    accent: "#00ff41",
    context: "Cognilabs",
    technologies: ["React", "TypeScript", "FSD", "Recharts", "TanStack Query", "Zustand", "Telegram API"],
    featured: true,
  },
  {
    id: "marketplace",
    title: "Furniture Marketplace",
    visual: "map",
    accent: "#00ffff",
    context: "Freelance",
    technologies: ["React", "FastAPI", "PostgreSQL", "PostGIS", "Python"],
    featured: true,
  },
  {
    id: "bunyodkor-cims",
    title: "Bunyodkor CIMS",
    visual: "dashboard",
    accent: "#00ff41",
    technologies: ["React", "TypeScript", "shadcn/ui", "Zustand", "TanStack Query", "MSW", "Faker.js"],
    featured: true,
  },
  {
    id: "cognilabs-cims",
    title: "CogniLabs CIMS",
    visual: "tokens",
    accent: "#39ff14",
    context: "Cognilabs",
    technologies: ["React", "TypeScript", "Design Tokens", "Tailwind CSS", "i18n"],
  },
  {
    id: "devcrm",
    title: "DevCrm",
    visual: "schedule",
    accent: "#00ffff",
    technologies: ["React", "TypeScript", "Tailwind CSS", "i18n", "RBAC"],
  },
  {
    id: "365-crm",
    title: "365 Magazine Sales CRM",
    visual: "queue",
    accent: "#00ff41",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Zod", "WebSocket"],
  },
  {
    id: "currency-tracker",
    title: "Currency Tracker",
    visual: "chart",
    accent: "#39ff14",
    technologies: ["React", "Node.js", "Express", "Telegraf", "AWS EC2", "Nginx", "PM2"],
  },
  {
    id: "tdiu-bot",
    title: "TDIU Admissions Bot",
    visual: "bot",
    accent: "#00ffff",
    technologies: ["Python", "aiogram", "SQLite", "RBAC"],
  },
  {
    id: "evoting",
    title: "Electronic Voting System",
    visual: "vote",
    accent: "#00ff41",
    technologies: ["React", "TypeScript", "Recharts", "PDF Export"],
  },
];

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const details = t.projectDetails[project.id];
  const title = details?.title ?? project.title;
  const description = details?.description ?? "";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  // Tilt only follows a real mouse; touch screens get a plain card.
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((event.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      viewport={{ once: true, margin: "-40px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00ff41]/60 rounded-xl"
    >
      <div className="relative h-full flex flex-col bg-[#0a0a0a]/85 md:bg-[#0a0a0a]/70 md:backdrop-blur-lg border border-[#00ff41]/10 rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300 group-hover:border-[#00ff41]/50 group-hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
        {/* Generated preview */}
        <div className="relative aspect-[16/9] overflow-hidden border-b border-[#00ff41]/10">
          <ProjectVisual
            kind={project.visual}
            accent={project.accent}
            label={title}
            className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
            <span className="text-gray-500">{String(index + 1).padStart(2, "0")}</span>
            {project.context && (
              <span className="px-2 py-0.5 text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full">
                {project.context}
              </span>
            )}
            {project.featured && (
              <span className="px-2 py-0.5 text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/40 rounded-full">
                ★ {t.featured}
              </span>
            )}
          </div>
          <h3 className="font-display text-base sm:text-lg text-white mb-2 group-hover:text-[#00ff41] transition-colors duration-300">
            {title}
          </h3>
          <p className="font-body text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-[#00ff41]/75 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-gray-500">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
          <span className="mt-4 block font-mono text-xs text-[#00ff41] md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
            {t.viewDetails}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { t } = useLanguage();
  const details = t.projectDetails[project.id];
  const title = details?.title ?? project.title;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/85 sm:backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90svh] overflow-y-auto overscroll-contain bg-[#0a0a0a] border border-[#00ff41]/30 rounded-t-2xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,255,65,0.15)]"
        initial={{ y: 40, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sm:hidden sticky top-0 z-20 flex justify-center pt-2 pb-1 bg-[#0a0a0a]">
          <span className="w-10 h-1 rounded-full bg-[#00ff41]/30" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/80 border border-[#00ff41]/40 text-[#00ff41] font-mono text-lg leading-none hover:bg-[#00ff41]/10 transition-colors"
          aria-label={t.close}
        >
          ×
        </button>
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="p-4 sm:p-6 md:pr-3">
            <div className="rounded-lg overflow-hidden border border-[#00ff41]/20 aspect-[16/9]">
              <ProjectVisual kind={project.visual} accent={project.accent} label={title} className="w-full h-full" />
            </div>
            <div className="hidden md:flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs font-mono text-[#00ff41]/80 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 pb-6 sm:p-6 md:pl-3 md:pt-8">
            <span className="font-mono text-xs text-[#00ff41]">
              // {t.gallery}{project.context ? ` · ${project.context.toUpperCase()}` : ""}
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-white mt-2 mb-4 pr-10">{title}</h3>
            <p className="font-body text-gray-300 text-[15px] leading-relaxed">{details?.description}</p>
            <h4 className="font-mono text-xs text-[#00ff41] mt-6 mb-3">// {t.workDone}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {(details?.highlights ?? []).map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-[#00ff41]">▹</span>
                  {highlight}
                </li>
              ))}
            </ul>
            <h4 className="md:hidden font-mono text-xs text-[#00ff41] mt-6 mb-3">// {t.technologies}</h4>
            <div className="md:hidden flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs font-mono text-[#00ff41]/80 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      id="projects"
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
            03. // {t.projects}
          </span>
          <h2
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            {t.projects}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
          <p className="font-body text-gray-400 text-sm sm:text-base mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto px-2">
            {t.projectIntro}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
          ))}
        </div>
      </div>
      {/* Portal: <main> is its own stacking context (z-10), which would trap
          the modal under the fixed navbar. */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={closeModal} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Projects;

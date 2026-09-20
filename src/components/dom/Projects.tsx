import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  gallery?: string[];
  highlights?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "365-crm",
    title: "365 Magazine Sales CRM",
    description:
      "A full-featured sales management dashboard with role-based access for operators and admins, real-time operator queue panel with WebSocket integration, client and order management, Telegram broadcast functionality, PDF channel tracking, subscription plan management, and analytics dashboard with visual KPIs.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "WebSocket",
    ],
    image: "/images/projects/365-crm.png",
    gallery: ["/images/projects/365-crm.png", "/images/projects/cognilabs-cims.png", "/images/projects/evoting.png"],
    highlights: ["Role-based access and admin workflows", "Real-time WebSocket operator queue", "Analytics, PDF tracking and Telegram broadcasts"],
    featured: true,
  },
  {
    id: "kas-crm",
    title: "KAS CRM",
    description:
      "Admin panel frontend for KAS CRM built with React, TypeScript, and Tailwind CSS. Features lead, chat, product, store, user, and AI settings management with a responsive dashboard. Includes role-based access control, React Query for server state, Zustand for client state, token-based authentication with refresh mechanism, and full CRUD operations with bulk import support.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Query",
      "Zustand",
      "Axios",
      "Zod",
    ],
    image: "/images/projects/kas-crm.png",
    gallery: ["/images/projects/kas-crm.png", "/images/projects/365-crm.png", "/images/projects/bunyodkor-academy.png"],
    highlights: ["Lead, chat, product and store management", "Token refresh authentication", "Bulk import and full CRUD operations"],
    featured: true,
  },
  {
    id: "cognilabs-cims",
    title: "CogniLabs CIMS",
    description:
      "Comprehensive internal management system featuring CEO dashboard, CRM client panel, user & permission management, team updates monitoring, salary estimates, project management with drag-and-drop Kanban board, and an AI chat interface. Supports role-based auth, protected routes, light/dark theme, responsive layout, and uz/en/ru internationalization.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "i18n",
      "Drag & Drop",
    ],
    image: "/images/projects/cognilabs-cims.png",
    gallery: ["/images/projects/cognilabs-cims.png", "/images/projects/365-crm.png", "/images/projects/evoting.png"],
    highlights: ["CEO dashboard and CRM client panel", "Drag-and-drop Kanban project management", "Uzbek, English and Russian interface"],
    featured: true,
  },
  {
    id: "evoting",
    title: "EVote",
    description:
      "Electronic voting platform with user registration, active poll participation, and real-time result tracking. Admin panel features KPI dashboard (total polls, active polls, users, votes), leading polls bar chart, status distribution donut chart, poll results table, role-based access (Superadmin/User), light/dark theme, and PDF export functionality.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Chart.js"],
    image: "/images/projects/evoting.png",
    gallery: ["/images/projects/evoting.png", "/images/projects/365-crm.png", "/images/projects/kas-crm.png"],
    highlights: ["Poll participation and live results", "KPI dashboard with charts", "Role-based admin and user access"],
    featured: true,
  },
  {
    id: "1",
    title: "Bunyodkor Academy CIMS",
    description:
      "Full-featured Club Information Management System for Bunyodkor Football Academy with real-time revenue dashboards, student management (1,500+ active students), payment tracking with multiple sources (Bank, Click, Payme, Manual), attendance logs, coach panels, group/contract management, and comprehensive financial analytics. Built with JWT authentication and role-based access.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "JWT",
      "Chart.js",
    ],
    image: "/images/projects/bunyodkor-academy.png",
    gallery: ["/images/projects/bunyodkor-academy.png", "/images/projects/cognilabs-cims.png", "/images/projects/365-crm.png"],
    highlights: ["1,500+ active student management", "Payment, attendance and contract tracking", "Financial dashboards and coach panels"],
    featured: true,
  },
  {
    id: "2",
    title: "3D Portfolio Experience",
    description:
      "Immersive neo-futuristic portfolio website with WebGL, 3D animations, and interactive particle systems.",
    technologies: ["React", "Three.js", "Framer Motion", "GSAP"],
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with animated visualizations, forecasts, and location-based data. But now it's not working because the API is no longer available.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "OpenWeather API",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "4",
    title: "University Club Management System",
    description:
      "University Club Management System with real-time inventory, payment integration, and admin dashboard.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
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
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((event.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(project); }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative group"
    >
      <div
        className={`relative h-full bg-[#0a0a0a]/70 backdrop-blur-lg border rounded-xl overflow-hidden transition-all duration-300 ${
          isHovered
            ? "border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.3)]"
            : "border-[#00ff41]/10"
        }`}
      >
        {/* Project Image */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/10 via-[#00ffff]/5 to-[#ff00ff]/10" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

          {project.featured && (
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#00ff41]/20 border border-[#00ff41]/50 rounded-full">
              <span className="font-mono text-[10px] xs:text-xs text-[#00ff41]">
                {t.featured}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="font-display text-lg sm:text-xl text-white mb-1.5 sm:mb-2 group-hover:text-[#00ff41] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 sm:line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono text-[10px] xs:text-xs text-[#00ff41]/70 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-4 block font-mono text-xs text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity">
            {t.viewDetails}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useLanguage();

  return (
    <section
      id="projects"
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
            03. // {t.projects}
          </span>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            {t.projects}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
          <p className="font-body text-gray-400 text-sm sm:text-base mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto px-4">
            {t.projectIntro}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={(item) => { setSelectedProject(item); setActiveImage(0); }} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0a0a] border border-[#00ff41]/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,65,0.2)]" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 border border-[#00ff41]/40 text-[#00ff41] font-mono" aria-label={t.close}>×</button>
              <div className="grid lg:grid-cols-[1.2fr_1fr]">
                <div className="p-4 sm:p-6">
                  <div className="aspect-video rounded-lg overflow-hidden border border-[#00ff41]/20">
                    <img src={(selectedProject.gallery ?? [selectedProject.image]).filter(Boolean)[activeImage] ?? selectedProject.image} alt={`${selectedProject.title} preview ${activeImage + 1}`} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {(selectedProject.gallery ?? [selectedProject.image]).filter(Boolean).map((image, index) => (
                      <button key={image} onClick={() => setActiveImage(index)} className={`aspect-video rounded overflow-hidden border ${activeImage === index ? "border-[#00ff41]" : "border-[#00ff41]/20"}`}>
                        <img src={image} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6 lg:pt-8">
                  <span className="font-mono text-xs text-[#00ff41]">{t.gallery}</span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mt-2 mb-4">{selectedProject.title}</h3>
                  <p className="font-body text-gray-300 text-sm leading-relaxed">{selectedProject.description}</p>
                  <h4 className="font-mono text-xs text-[#00ff41] mt-6 mb-3">// {t.workDone}</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {(selectedProject.highlights ?? [selectedProject.description]).map((highlight) => <li key={highlight} className="flex gap-2"><span className="text-[#00ff41]">▹</span>{highlight}</li>)}
                  </ul>
                  <h4 className="font-mono text-xs text-[#00ff41] mt-6 mb-3">// {t.technologies}</h4>
                  <div className="flex flex-wrap gap-2">{selectedProject.technologies.map((tech) => <span key={tech} className="px-2 py-1 text-xs font-mono text-[#00ff41]/80 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded">{tech}</span>)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

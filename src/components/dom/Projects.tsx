import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Football Club Management System",
    description:
      "Full-featured management system for Football Club with real-time dashboards, JWT authentication, and comprehensive player/staff management.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "HTML",
      "CSS",
    ],
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
    technologies: ["React", "JavaScript", "Tailwind CSS", "OpenWeather API", "HTML", "CSS"],
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
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Image placeholder */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/10 via-[#00ffff]/5 to-[#ff00ff]/10" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {project.featured && (
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#00ff41]/20 border border-[#00ff41]/50 rounded-full">
              <span className="font-mono text-[10px] xs:text-xs text-[#00ff41]">FEATURED</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="font-display text-lg sm:text-xl text-white mb-1.5 sm:mb-2 group-hover:text-[#00ff41] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
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
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
            03. // PORTFOLIO
          </span>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-2 sm:mt-3 md:mt-4 px-2"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            FEATURED PROJECTS
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 md:mt-6" />
          <p className="font-body text-gray-400 text-sm sm:text-base mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto px-4">
            A showcase of my recent work, featuring web applications built with
            modern technologies and a focus on exceptional user experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

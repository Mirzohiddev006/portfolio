import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Club Management System',
    description: 'Full-featured management system for Bunyodkor Football Academy with real-time dashboards, JWT authentication, and comprehensive player/staff management.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Image Generator',
    description: 'Web application leveraging AI models to generate unique images from text prompts with customizable styles and parameters.',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: '3D Portfolio Experience',
    description: 'Immersive neo-futuristic portfolio website with WebGL, 3D animations, and interactive particle systems.',
    technologies: ['React', 'Three.js', 'Framer Motion', 'GSAP'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '5',
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop, real-time updates, and team collaboration features.',
    technologies: ['React', 'Redux', 'Socket.io', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '6',
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with animated visualizations, forecasts, and location-based data.',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative group"
    >
      <div
        className={`relative h-full bg-[#0a0a0a]/70 backdrop-blur-lg border rounded-xl overflow-hidden transition-all duration-300 ${
          isHovered ? 'border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.3)]' : 'border-[#00ff41]/10'
        }`}
      >
        {/* Image placeholder */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/10 via-[#00ffff]/5 to-[#ff00ff]/10" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#00ff41]/20 border border-[#00ff41]/50 rounded-full">
              <span className="font-mono text-xs text-[#00ff41]">FEATURED</span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-[#0a0a0a]/80 flex items-center justify-center gap-4"
          >
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                className="p-3 bg-[#0a0a0a]/70 backdrop-blur border border-[#00ff41]/30 rounded-lg hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] transition-all duration-300">
                <svg className="w-6 h-6 text-[#00ff41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-[#0a0a0a]/70 backdrop-blur border border-[#00ff41]/30 rounded-lg hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] transition-all duration-300">
                <svg className="w-6 h-6 text-[#00ff41]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl text-white mb-2 group-hover:text-[#00ff41] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 font-mono text-xs text-[#00ff41]/70 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded">
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
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-[#00ff41] tracking-widest">03. // PORTFOLIO</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4" style={{ textShadow: '0 0 10px #00ff41' }}>
            FEATURED PROJECTS
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-6" />
          <p className="font-body text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of my recent work, featuring web applications built with modern technologies and a focus on exceptional user experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-[#00ff41] border border-[#00ff41]/50 rounded-lg hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300"
          >
            <span>VIEW ALL PROJECTS ON GITHUB</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

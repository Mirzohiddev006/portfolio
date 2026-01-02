import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  location: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    company: 'Cognilab LLC',
    position: 'Frontend Developer',
    startDate: 'November 2025',
    endDate: 'Present',
    description: 'Developed a comprehensive Club Information Management System (CIMS) with real-time dashboards, player management, and staff coordination features. Implemented JWT authentication and role-based access control.',
    technologies: ['React', "JavaScript", "Tailwind CSS", "Node.js", "HTML", "CSS"],
    location: 'Tashkent, UZ',
  },
  {
    id: '2',
    company: 'Freelance',
    position: 'Web Developer',
    startDate: 'August 2025',
    endDate: 'Present',
    description: 'Delivered custom web solutions for various clients, including e-commerce platforms, landing pages, and business dashboards. Focused on responsive design and performance optimization.',
    technologies: ['React', 'Next.js', "JavaScript"],
    location: 'Remote',
  },
  {
    id: '3',
    company: 'University Projects',
    position: 'Student Developer',
    startDate: 'September 2025',
    endDate: 'Present',
    description: 'Led development of multiple academic projects including statistical analysis tools, data visualization dashboards, and econometric modeling applications.',
    technologies: ["JavaScript", "HTML", "CSS"],
    location: 'Tashkent, UZ',
  },
];

const TimelineItem = ({ experience, index, isLast }: { experience: ExperienceItem; index: number; isLast: boolean }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
    >
      {/* Timeline center */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className="relative z-10"
        >
          <div className="w-4 h-4 bg-[#0a0a0a] border-2 border-[#00ff41] rounded-full" style={{ boxShadow: '0 0 15px #00ff41' }} />
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            className="absolute inset-0 border-2 border-[#00ff41]/30 rounded-full"
          />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
            className="w-px bg-gradient-to-b from-[#00ff41] via-[#00ff41]/50 to-transparent"
            style={{ boxShadow: '0 0 10px #00ff41' }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-6 rounded-xl hover:border-[#00ff41]/30 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300"
        >
          {/* Mobile timeline dot */}
          <div className="flex md:hidden items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#00ff41] rounded-full" style={{ boxShadow: '0 0 10px #00ff41' }} />
            <span className="font-mono text-xs text-[#00ff41]">{experience.startDate} - {experience.endDate}</span>
          </div>

          <div className={`hidden md:block font-mono text-sm text-[#00ff41] mb-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
            {experience.startDate} - {experience.endDate}
          </div>

          <h3 className={`font-display text-xl text-white mb-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            {experience.position}
          </h3>
          <p className={`font-body text-[#00ffff] mb-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            @ {experience.company}
          </p>
          <p className={`font-mono text-xs text-gray-500 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            📍 {experience.location}
          </p>
          <p className={`font-body text-gray-400 text-sm mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            {experience.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            {experience.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 font-mono text-xs text-[#00ff41]/70 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-[#00ff41] tracking-widest">04. // JOURNEY</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4" style={{ textShadow: '0 0 10px #00ff41' }}>
            WORK EXPERIENCE
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12 md:space-y-0">
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-[#00ff41] border border-[#00ff41]/50 rounded-lg hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

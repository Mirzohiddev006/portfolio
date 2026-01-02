import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '15+', label: 'Technologies' },
  { value: '100%', label: 'Client Satisfaction' },
];

const technologies = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Three.js', 'Tailwind CSS', 'PostgreSQL', 'Git'];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-[#00ff41] tracking-widest">01. // ABOUT ME</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4" style={{ textShadow: '0 0 10px #00ff41' }}>
            WHO AM I?
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-6 rounded-lg">
              <p className="font-body text-gray-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-[#00ff41]">Frontend Developer</span> with expertise in building exceptional digital experiences. My journey in web development started with a curiosity for creating interactive interfaces and has evolved into a deep understanding of modern web technologies.
              </p>
            </div>

            <div className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-6 rounded-lg">
              <p className="font-body text-gray-300 text-lg leading-relaxed">
                I specialize in <span className="text-[#00ffff]">React</span> and <span className="text-[#00ffff]">TypeScript</span>, with a strong focus on creating performant, accessible, and visually stunning web applications. I love experimenting with <span className="text-[#ff00ff]">3D graphics</span> and animations.
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="font-mono text-sm text-[#00ff41] mb-4 tracking-wider">// TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="px-3 py-1 font-mono text-sm text-[#00ff41]/80 border border-[#00ff41]/30 rounded hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
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
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 p-6 rounded-lg text-center hover:border-[#00ff41]/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300"
                >
                  <span className="font-display text-4xl md:text-5xl text-[#00ff41] block" style={{ textShadow: '0 0 10px #00ff41' }}>
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-gray-400 tracking-wider mt-2 block">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-[#0a0a0a]/70 backdrop-blur-lg border border-[#00ff41]/10 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] border-b border-[#00ff41]/10">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-gray-500">about.tsx</span>
              </div>
              <pre className="p-4 font-mono text-sm text-gray-400 overflow-x-auto">
                <code>
{`const developer = {
  name: "Mirzohid",
  role: "Frontend Developer",
  passion: "Building amazing UIs",
  available: true
};`}
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

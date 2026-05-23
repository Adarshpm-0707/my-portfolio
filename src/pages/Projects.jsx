import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Code } from 'lucide-react';

const Github = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Projects = () => {
  const projects = [
    {
      title: 'Aleef Global',
      category: 'Enterprise Solution',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
      description: 'A comprehensive global logistics and business management platform with real-time tracking.',
    },
    {
      title: 'HomeRocks',
      category: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
      tags: ['Next.js', 'Tailwind', 'PostgreSQL', 'Stripe'],
      description: 'Premium interior design and home improvement marketplace with interactive product visualization.',
    },
    {
      title: 'Najm Care',
      category: 'Healthcare App',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
      tags: ['React Native', 'Express', 'Firebase'],
      description: 'A healthcare appointment and medical record management system for clinics and patients.',
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-grid-pattern bg-radial-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 text-center"
      >
        <span className="text-accent-blue font-orbitron font-bold tracking-[0.3em] mb-3 block text-xs sm:text-sm uppercase">Showcase</span>
        <h1 className="text-4xl sm:text-6xl font-black font-orbitron">WORKS</h1>
      </motion.div>

      {/* Grid Layout: Responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass-premium border border-white/5 hover:border-accent-blue/30 transition-all flex flex-col h-full"
          >
            {/* Project Image Container */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent opacity-80" />
            </div>

            {/* Project Details */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-accent-blue text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-orbitron">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold font-orbitron text-white mb-3 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 bg-white/5 rounded-md text-[9px] font-bold uppercase tracking-wider text-accent-purple border border-accent-purple/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent-blue text-primary font-bold font-orbitron text-xs tracking-wider transition-all glow-blue"
                  >
                    <Eye size={14} /> PREVIEW
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 text-white font-bold font-orbitron text-xs tracking-wider transition-all"
                  >
                    <Code size={14} /> CODE
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Browse Github Section */}
      <div className="mt-24 text-center relative z-10">
        <p className="text-gray-500 font-inter mb-6 text-sm">Interested in seeing more?</p>
        <motion.a
          href="https://github.com/AdarshPM"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, border: '1px solid #00d2ff', boxShadow: '0 0 20px rgba(0,210,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-primary transition-all font-bold font-orbitron text-xs tracking-widest text-white"
        >
          <Github className="w-5 h-5" /> BROWSE GITHUB
        </motion.a>
      </div>
    </div>
  );
};

export default Projects;

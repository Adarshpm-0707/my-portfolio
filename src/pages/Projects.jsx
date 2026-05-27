import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import Stack from '../components/ui/Stack';
import aleefImg from '../assets/aleef global.png';
import homerocksImg from '../assets/homerocks.png';
import najmcareImg from '../assets/najmcare.png';

const Github = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    title: 'Aleef Global',
    image: aleefImg,
    tags: ['React', 'Node.js', 'Bootstrap'],
    description: 'A comprehensive global logistics and business management platform with real-time tracking.',
    link: 'https://aleefglobal.com/',
  },
  {
    title: 'HomeRocks',
    image: homerocksImg,
    tags: ['React', 'Tailwind', 'Firebase', 'Node.js'],
    description: 'Premium interior design and home improvement marketplace with interactive product visualization.',
    link: 'https://homerocks.in/',
  },
  {
    title: 'Najm Care',
    image: najmcareImg,
    tags: ['React', 'Tailwind', 'Firebase', 'Node.js'],
    description: 'A healthcare appointment and medical record management system for clinics and patients.',
    link: 'https://najmcare.me/',
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  // Pre-generate cards for the Stack component
  const stackCards = useMemo(() => {
    return projects.map((project, index) => {
      const themeColor = index === 0 ? 'border-cyan-500/30' : index === 1 ? 'border-purple-500/30' : 'border-pink-500/30';
      const glowColor = index === 0 ? 'shadow-cyan-500/10' : index === 1 ? 'shadow-purple-500/10' : 'shadow-pink-500/10';

      return (
        <div
          key={index}
          className={`w-full h-full relative bg-[#0a0d16]/95 backdrop-blur-md border ${themeColor} shadow-2xl ${glowColor} flex flex-col overflow-hidden group select-none rounded-2xl`}
        >
          {/* Aspect-Video (16:9) Project Image Header */}
          <div className="w-full aspect-video overflow-hidden bg-slate-900/60 border-b border-white/5 relative z-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Card Content Wrapper */}
          <div className="flex-1 p-6 flex flex-col justify-between w-full relative z-10 bg-slate-950/20">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-cyan-400 animate-pulse' : index === 1 ? 'bg-purple-400' : 'bg-pink-400'}`} />
                <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-400 font-sans">
                  Project 0{index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2 leading-tight font-orbitron">
                {project.title}
              </h3>
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-400 font-sans font-semibold border-t border-white/5 pt-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active System
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                Drag to Swipe
              </span>
            </div>
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white">

      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-56 h-56 md:w-80 md:h-80 bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Interactive Project Dossier Panel ── */}
          <div className="md:col-span-5 flex flex-col justify-center h-full">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-slate-500 uppercase mb-3 font-sans">
                Portfolio · Selected Works
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-6">
                My{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                  Projects.
                </span>
              </h1>
            </div>

            {/* Dynamic Sliding Counter & Track */}
            <div className="flex items-center gap-4 mt-4 mb-8">
              <span className="text-2xl font-black text-white font-mono">
                0{activeIndex + 1}
              </span>
              <div className="h-[2px] flex-1 bg-white/10 rounded overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded"
                  animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-500 font-mono">
                0{projects.length}
              </span>
            </div>

            {/* Project Details with Transition */}
            <div className="min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-extrabold tracking-tight text-white font-orbitron">
                    {activeProject.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium">
                    {activeProject.description}
                  </p>
                  
                  {/* Tech badging */}
                  <div>
                    <h4 className="text-[9px] tracking-[0.2em] font-extrabold uppercase text-slate-500 mb-2 font-sans">
                      Dossier Tech Specs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 rounded-lg uppercase tracking-wider font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-extrabold text-[11px] tracking-wider uppercase transition-all duration-300 shadow-lg shadow-cyan-500/10 cursor-pointer active:scale-95 font-sans pointer-events-auto"
                    >
                      <Eye size={14} /> Preview Live Deployment
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column: Drag Stack Zone ── */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full flex flex-col items-center justify-center py-6 min-h-[360px] sm:min-h-[390px]">
              
              {/* Radial gradient background behind stack */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="w-80 h-80 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-full blur-[100px] animate-pulse" />
              </div>
              
              {/* Swipe Guide Indicator */}
              <p className="text-xs text-slate-400 mb-6 flex items-center gap-2 select-none animate-pulse relative z-20 font-mono">
                <span>👈 Swipe or click cards to browse 👉</span>
              </p>

              {/* Responsive stack container */}
              <div className="w-[90vw] max-w-[340px] sm:max-w-[360px] h-[310px] sm:h-[330px] relative select-none z-10">
                <Stack
                  randomRotation={true}
                  sensitivity={160}
                  sendToBackOnClick={true}
                  autoplay={false}
                  cards={stackCards}
                  onTopCardChange={setActiveIndex}
                />
              </div>
            </div>

            {/* GitHub Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-500 mb-4 text-xs sm:text-sm font-sans">Want to browse more repositories?</p>
              <motion.a
                href="https://github.com/Adarshpm-0707"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all font-bold text-xs sm:text-sm text-white font-sans pointer-events-auto"
              >
                <Github className="w-4 h-4" /> Browse GitHub
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Projects;

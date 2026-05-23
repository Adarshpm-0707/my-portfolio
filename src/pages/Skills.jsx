import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Globe, Layout, Server, Terminal, Cpu, Brain 
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Architecture',
      icon: Layout,
      color: 'text-accent-blue',
      glowClass: 'hover:border-accent-blue/40 hover:shadow-accent-blue/10',
      badgeBg: 'bg-accent-blue/5 border-accent-blue/15 text-accent-blue',
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion'],
    },
    {
      title: 'Backend Systems',
      icon: Server,
      color: 'text-accent-purple',
      glowClass: 'hover:border-accent-purple/40 hover:shadow-accent-purple/10',
      badgeBg: 'bg-accent-purple/5 border-accent-purple/15 text-accent-purple',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'WebSockets'],
    },
    {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-accent-neon',
      glowClass: 'hover:border-accent-neon/40 hover:shadow-accent-neon/10',
      badgeBg: 'bg-accent-neon/5 border-accent-neon/15 text-accent-neon',
      skills: ['MongoDB', 'PostgreSQL',  'Firebase'],
    },
    {
      title: 'DevOps & Tools',
      icon: Terminal,
      color: 'text-white',
      glowClass: 'hover:border-white/20 hover:shadow-white/5',
      badgeBg: 'bg-white/5 border-white/10 text-white/80',
      skills: ['GitHub', 'Docker', 'Vercel', 'AWS', 'Postman'],
    },
    {
      title: 'AI Tools & Agents',
      icon: Brain,
      color: 'text-accent-pink',
      glowClass: 'hover:border-accent-pink/40 hover:shadow-accent-pink/10',
      badgeBg: 'bg-accent-pink/5 border-accent-pink/15 text-accent-pink',
      skills: ['ChatGPT / GPT-4', 'Gemini API', 'Google AI Studio', 'Antigravity AI', 'Claude & Cursor', 'Lovable'],
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-grid-pattern bg-radial-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
    
        <h1 className="text-4xl sm:text-6xl font-black font-orbitron mb-8">TECH STACK</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-inter leading-relaxed">
          A comprehensive collection of technologies I use to build robust, scalable, and futuristic 
          digital products. Always evolving, always learning.
        </p>
      </motion.div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 relative z-10">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`glass-premium p-8 rounded-2xl border border-white/5 hover:shadow-2xl transition-all duration-300 group ${cat.glowClass}`}
          >
            <div className={`mb-6 ${cat.color} group-hover:scale-110 transition-transform duration-300 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5`}>
              <cat.icon size={24} />
            </div>
            <h3 className="text-lg font-bold font-orbitron mb-6 text-white group-hover:text-accent-blue transition-colors">{cat.title}</h3>
            
            {/* Tag List */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, sIdx) => (
                <motion.span 
                  key={sIdx}
                  whileHover={{ y: -2 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide border ${cat.badgeBg} transition-all cursor-default font-inter`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Animated Background Element */}
      <div className="mt-24 relative h-72 sm:h-80 overflow-hidden rounded-3xl glass-premium flex items-center justify-center border border-white/10 max-w-5xl mx-auto">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute opacity-15"
        >
          <Globe size={450} className="text-accent-blue" />
        </motion.div>
        
        {/* Decorative Grid Overlay Ring */}
        <div className="absolute inset-0 bg-radial-gradient opacity-50" />
        
        <div className="z-10 text-center px-6 relative">
          <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20 mx-auto mb-6 animate-pulse">
            <Cpu size={24} />
          </div>
          <h2 className="text-xl sm:text-3xl font-black font-orbitron mb-4 text-white tracking-wide">GLOBAL READY ARCHITECTURE</h2>
          <p className="text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase font-orbitron">Scalable • Secure • High Performance</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;

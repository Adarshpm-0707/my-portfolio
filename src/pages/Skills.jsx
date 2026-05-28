/* ══════════════════════════════════════════════════
   TECH LOGO COMPONENTS (SVG PATHS)
══════════════════════════════════════════════════ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Cloud, 
  Sparkles, 
  ChevronRight, 
  Cpu,
  Layers
} from 'lucide-react';
import ParticleText from '../components/ui/ParticleText';
import { useTheme } from '../context/ThemeContext';
import Skills3DScene from '../components/ui/Skills3DScene';

const TechLogos = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Nodejs: () => (
    <svg viewBox="0 0 256 256" className="w-12 h-12">
      <path fill="currentColor" d="M128 0L31.3 55.8v111.7l96.7 55.8 96.7-55.8V55.8L128 0zm-15.6 149.3c-2.4 1.3-4.8 1.8-7.2 1.8-4.8 0-8.8-2.4-10.4-6.4-1.2-3.1-1.3-7.5-1.3-12.7v-29.4h9.8v29.1c0 4.1 0 7.2.5 9 .9 2.5 2.6 3.8 5 3.8 1.6 0 3.2-.5 4.8-1.5v-40.4h9.8v56.5h-8.8l-2.2-9.8z" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 256 256" className="w-12 h-12">
      <path fill="currentColor" d="M141.6 128.5c-1.6-21.5-8.5-41.5-13.6-61.1-5.1 19.6-12 39.6-13.6 61.1h27.2zm-13.6 127.5c-4.4-10.4-18.7-41.2-25.1-66.5h50.3c-6.4 25.3-20.7 56.1-25.2 66.5z" />
      <path fill="currentColor" d="M152.1 128.5c1.1 14.8 1.6 29.8 1.4 44.8h-51c-.2-15-.3-30 .8-44.8C105.1 103.5 111.9 74.3 128 41.5c16.1 32.8 22.9 62 24.1 87z" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 256 256" className="w-12 h-12">
      <path fill="currentColor" d="M256 128.2c0-38.3-31-69.3-69.3-69.3h-1.3l-2.1-.2h-12.8v19.2h12.8l2.1-.2h1.3c27.7 0 50.1 22.4 50.1 50.1v1.3l-.2 2.1v12.8h19.2v-12.8l.2-2.1v-1.3z" />
      <path fill="currentColor" d="M0 128h38.4v38.4H0V128zm51.2 0h38.4v38.4H51.2V128zm51.2 0h38.4v38.4h-38.4V128zm51.2 0h38.4v38.4h-38.4V128zM51.2 76.8h38.4v38.4H51.2V76.8zm51.2 0h38.4v38.4h-38.4V76.8zm51.2 0h38.4v38.4h-38.4V76.8zM102.4 25.6h38.4V64h-38.4V25.6z" />
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
};

/* ══════════════════════════════════════════════════
   UPDATED DATA WITH LOGOS
══════════════════════════════════════════════════ */
const getSkillData = (colors) => [
  {
    id: 'frontend',
    title: 'Frontend',
    color: colors.accentBlue,
    icon: <Globe size={18} />,
    mainLogo: <TechLogos.React />,
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    id: 'backend',
    title: 'Backend',
    color: colors.accentPurple,
    icon: <Cpu size={18} />,
    mainLogo: <TechLogos.Nodejs />,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Auth', 'WebSockets'],
  },
  {
    id: 'database',
    title: 'Database',
    color: colors.accentNeon,
    icon: <Layers size={18} />,
    mainLogo: <TechLogos.MongoDB />,
    skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    color: '#ffffff',
    icon: <Cloud size={18} />,
    mainLogo: <TechLogos.Docker />,
    skills: ['GitHub', 'Vercel', 'AWS', 'Postman'],
  },
  {
    id: 'ai',
    title: 'AI & Agents',
    color: colors.accentPink,
    icon: <Sparkles size={18} />,
    mainLogo: <TechLogos.AI />,
    skills: ['GPT-4', 'Gemini API', 'Google AI Studio', 'Claude', 'Cursor', 'Lovable'],
  },
];

/* ══════════════════════════════════════════════════
   TECH HUD VISUALIZER
══════════════════════════════════════════════════ */
const TechVisualizer = ({ activeTab }) => {
  const color = activeTab.color;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* HUD Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Rotating Tech Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-80 h-80 border border-dashed rounded-full opacity-20 pointer-events-none"
        style={{ borderColor: color }}
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border-2 border-dotted rounded-full opacity-10 pointer-events-none"
        style={{ borderColor: color }}
      />

      {/* 3D Morphing interactive shape */}
      <div className="w-80 h-80 z-10 flex items-center justify-center scale-90 sm:scale-100">
        <Skills3DScene color={color} />
      </div>

      {/* Orbiting Tech Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {activeTab.skills.slice(0, 4).map((skill, i) => (
          <motion.div
            key={`${activeTab.id}-${skill}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * -5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="absolute py-1 px-3 rounded-md border text-[9px] font-black tracking-widest uppercase backdrop-blur-md"
              style={{ 
                borderColor: `${color}33`, 
                color: color, 
                backgroundColor: `${color}08`,
                transform: `translateY(-140px) rotate(-${(i * 90)}deg)` // Correct orientation logic
              }}
            >
              {skill}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const Skills = () => {
  const { colors: themeColors } = useTheme();
  const skillData = getSkillData(themeColors);
  const [activeTabId, setActiveTabId] = useState('frontend');
  const activeTab = skillData.find((item) => item.id === activeTabId) || skillData[0];

  return (
    <div className="min-h-screen bg-primary text-white overflow-hidden selection:bg-accent-blue/30 font-orbitron">
      
      {/* Background Kinetic Text Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.02] flex items-center justify-center">
        <h1 className="text-[25vw] font-black select-none whitespace-nowrap">
          {activeTab.title.toUpperCase()}
        </h1>
      </div>

      {/* DESKTOP LAYOUT (visible on desktop lg screen width and up) */}
      <main className="hidden lg:grid relative z-10 grid-cols-12 min-h-screen">
        
        {/* LEFT NAV */}
        <div className="col-span-4 flex flex-col justify-center px-8 lg:px-16 space-y-10 border-r border-white/5 bg-black/40 backdrop-blur-sm">
          <div>
            <motion.span className="text-accent-blue tracking-[0.4em] text-xs font-bold uppercase">Architecture</motion.span>
            <motion.h2 className="text-5xl font-black mt-2 tracking-tighter">
              SKILL<br/><span className="text-white/20">VAULT</span>
            </motion.h2>
          </div>

          <div className="space-y-4">
            {skillData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={`w-full group flex items-center justify-between p-4 rounded-xl transition-all duration-500 border ${
                  activeTab.id === item.id 
                  ? 'bg-white/10 border-white/20 shadow-2xl' 
                  : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg transition-all duration-500 ${activeTab.id === item.id ? 'bg-white text-black scale-110' : 'bg-white/5 text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <span className={`font-bold tracking-tight text-sm uppercase transition-colors ${activeTab.id === item.id ? 'text-white' : 'text-gray-400'}`}>
                    {item.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all duration-500 ${activeTab.id === item.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* CENTER VISUALIZER */}
        <div className="col-span-4 relative h-auto overflow-hidden">
          <TechVisualizer activeTab={activeTab} />
        </div>

        {/* RIGHT SKILLS CONTENT */}
        <div className="col-span-4 flex flex-col justify-center px-8 lg:px-16 space-y-8 bg-black/40 backdrop-blur-sm border-l border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px]" style={{ backgroundColor: activeTab.color }} />
                <h3 className="min-w-0 flex-1" style={{ color: activeTab.color }}>
                  <span className="sr-only">{activeTab.id}</span>
                  <ParticleText
                    text={activeTab.id.toUpperCase()}
                    color={activeTab.color}
                    accentColor="#ffffff"
                    height={78}
                    fontSize={46}
                    gap={3}
                  />
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeTab.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative p-4 bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden transition-all hover:border-white/30"
                  >
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                      <div className="w-2 h-2 rounded-full blur-[2px]" style={{ backgroundColor: activeTab.color }} />
                    </div>
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" 
                         style={{ backgroundColor: activeTab.color }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* MOBILE LAYOUT (visible on mobile / tablet < lg screen width) */}
      <main className="lg:hidden relative z-10 flex flex-col px-6 pt-24 pb-16 space-y-8 min-h-screen">
        {/* Header */}
        <div className="text-center">
          <span className="text-accent-blue tracking-[0.3em] text-[10px] font-bold uppercase">Architecture</span>
          <h2 className="text-4xl font-black mt-1 tracking-tighter">
            SKILL <span className="text-white/20">VAULT</span>
          </h2>
        </div>

        {/* Horizontal Swipeable Category Selector */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 flex gap-3 px-1">
          {skillData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTabId(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap transition-all duration-300 ${
                activeTab.id === item.id 
                  ? 'bg-white/10 border-white/30 text-white shadow-lg' 
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5'
              }`}
            >
              <span style={{ color: activeTab.id === item.id ? item.color : '#888' }}>
                {item.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Compact Visualizer Block */}
        <div className="w-full h-64 relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm flex items-center justify-center">
          <TechVisualizer activeTab={activeTab} />
        </div>

        {/* Skills Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px]" style={{ backgroundColor: activeTab.color }} />
            <h3 className="min-w-0 flex-1" style={{ color: activeTab.color }}>
              <span className="sr-only">{activeTab.id}</span>
              <ParticleText
                text={activeTab.id.toUpperCase()}
                color={activeTab.color}
                accentColor="#ffffff"
                height={54}
                fontSize={29}
                gap={3}
              />
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeTab.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group relative p-4 bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden transition-all"
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-300">
                    {skill}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full mt-3 self-end" style={{ backgroundColor: activeTab.color }} />
                </div>
                <div className="absolute inset-0 opacity-5" style={{ backgroundColor: activeTab.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <div className="fixed bottom-8 left-8 flex items-center gap-4 z-20 pointer-events-none opacity-30">
        <div className="w-8 h-[1px] bg-white" />
      
      </div>
    </div>
  );
};

export default Skills;

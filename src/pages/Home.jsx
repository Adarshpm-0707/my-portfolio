import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2, Eye } from 'lucide-react';
import HeroScene from '../components/hero/HeroScene';
import ParticleText from '../components/ui/ParticleText';
import { Link, useLocation } from 'react-router-dom';
import About from './About';
import { useTheme } from '../context/ThemeContext';
import aleefImg from '../assets/aleef global.png';
import homerocksImg from '../assets/homerocks.png';
import najmcareImg from '../assets/najmcare.png';

/* ── Framer variants ─────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Decoding Text Scrambler Component ───────────────── */
/* ── Description Typewriter Component ───────────────── */
const TypewriterText = ({ text, delay = 15 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    let currentText = '';
    const timer = setInterval(() => {
      if (index < text.length) {
        currentText += text.charAt(index);
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay]);
  
  return <span>{displayText}</span>;
};

/* ══════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════ */
const Home = () => {
  const location = useLocation();
  const { colors: themeColors } = useTheme();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  }, [location]);

  return (
    <div className="hero-page min-h-screen relative overflow-hidden">

      {/* ══ HERO — fullscreen 3D + overlaid text ══════════ */}
      <section className="hero-fullscreen">

        {/* 3D canvas — absolute fill */}
        <div className="hero-canvas-fill">
          <HeroScene />
        </div>

        {/* Dark vignette overlay so text is readable */}
        <div className="hero-vignette" />

        {/* Bottom gradient fade into next section */}
        <div className="hero-bottom-fade" />

        {/* Content overlay — Centered typography and buttons sitting on top of WebGL Wave Grid */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex items-center justify-center min-h-screen pt-4 pb-6 sm:pt-16 sm:pb-20 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mobile-only-card flex flex-col items-center gap-3 sm:gap-6 w-full"
          >


            {/* Name Header with Scrambler Animation */}
            <motion.div variants={item} className="flex flex-col items-center mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm md:text-base tracking-[0.25em] font-orbitron font-semibold text-white/40 uppercase mb-2 select-none">
                I AM
              </span>
              <h1 className="hero-name-glow text-white leading-none uppercase select-text">
                <span className="sr-only">ADARSH</span>
                <span className="block w-[min(92vw,680px)] sm:w-[min(74vw,820px)]">
                  <ParticleText
                    text="ADARSH"
                    color={themeColors.accentBlue}
                    accentColor={themeColors.accentPink}
                    height={150}
                    fontSize={118}
                    gap={4}
                    style={{ filter: `drop-shadow(0 0 18px ${themeColors.accentBlue}30)` }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Sub-heading */}
            <motion.p 
              variants={item} 
              className="text-white/70 font-inter text-xs sm:text-base md:text-lg max-w-[620px] leading-relaxed mb-3 sm:mb-6 font-light"
            >
              <TypewriterText text="Passionate Full-Stack Developer specializing in MERN stack, with hands-on experience in building modern, high-performance web applications. Focused on clean code, scalability, and user-friendly design." />
            </motion.p>

            {/* Premium Minimal Buttons (Side-by-Side) */}
            <motion.div variants={item} className="flex flex-row gap-3 items-center justify-center w-full max-w-md px-2">
              <Link to="/projects" className="btn-cyber-primary flex-1 justify-center">
                Projects <ArrowRight size={13} />
              </Link>
              <Link to="/contact" className="btn-cyber-secondary flex-1 justify-center">
                Contact <MousePointer2 size={13} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

      

      </section>

      {/* ══ ABOUT SECTION ══════════════════════════════ */}
      <About />

      {/* ══ FEATURED SELECTED WORKS ════════════════════ */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-accent-purple font-orbitron font-bold tracking-[0.25em] mb-3 block text-xs sm:text-sm">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight">
              BEYOND CODE
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-accent-blue hover:text-white font-bold transition-colors font-orbitron text-xs tracking-widest font-black"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Aleef Global',
              category: 'Enterprise Solution',
              image: aleefImg,
              tags: ['React', 'Node.js','Tailwind'],
              description: 'A comprehensive global logistics and business management platform with real-time tracking.',
              link: 'https://aleefglobal.com/'
            },
            {
              title: 'HomeRocks',
              category: 'E-Commerce Platform',
              image: homerocksImg,
              tags: ['React', 'Tailwind', 'Firebase','Node.js'],
              description: 'Premium interior design and home improvement marketplace with interactive product visualization.',
              link: 'https://homerocks.in/'
            },
            {
              title: 'Najm Care',
              category: 'Healthcare App',
              image: najmcareImg,
              tags: ['React', 'Node.js', 'Firebase','Tailwind'],
              description: 'A healthcare appointment and medical record management system for clinics and patients.',
              link: 'https://najmcare.me/'
            }
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/20 to-transparent opacity-80" />
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

                  {/* Bottom Action Button */}
                  <motion.a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent-blue text-primary font-bold font-orbitron text-xs tracking-wider transition-all glow-blue text-center no-underline pointer-events-auto"
                  >
                    <Eye size={14} /> PREVIEW
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

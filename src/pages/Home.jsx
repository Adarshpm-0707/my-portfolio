import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import HeroScene from '../components/hero/HeroScene';
import { Link, useLocation } from 'react-router-dom';
import About from './About';

/* ── Social SVGs ─────────────────────────────────────── */
const GithubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5
      0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0
      3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ── Framer variants ─────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════ */
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  }, [location]);

  return (
    <div className="hero-page bg-grid-pattern bg-radial-gradient min-h-screen relative overflow-hidden">
      
      {/* ── BACKGROUND ORBS ── */}
      <div className="nebula-orb-container">
        <div className="nebula-orb orb-blue" />
        <div className="nebula-orb orb-purple" />
      </div>

      {/* ══ HERO SECTION ════════════════════════════════ */}
      <section className="hero-section">

        {/* 3D Scene — top on mobile, right on desktop */}
        <motion.div
          className="hero-scene-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroScene />
        </motion.div>

        {/* Text Column — bottom on mobile, left on desktop */}
        <div className="hero-text-wrapper relative z-10">
          <motion.div variants={container} initial="hidden" animate="show"
            className="flex flex-col">


            {/* Tagline label */}
            <motion.p variants={item} className="hero-sub">
              MERN Stack Architect
            </motion.p>

            {/* Name Heading */}
            <motion.h1 variants={item} className="hero-title text-white">
              <span className="text-gradient text-glow-blue"> ADARSH</span>
            </motion.h1>

            {/* Core pitch */}
            <motion.p variants={item} className="hero-desc">
              Crafting premium digital experiences through futuristic design
              and high-performance MERN stack architecture. Specialized in
              scalable, interactive web solutions.
            </motion.p>

   

            {/* CTA action buttons */}
            <motion.div variants={item} className="hero-cta-group">
              <Link to="/projects" className="btn-cyber-primary">
                View Projects <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-cyber-secondary">
                Contact Me <MousePointer2 size={15} />
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
          <Link to="/projects"
            className="group inline-flex items-center gap-2 text-accent-blue hover:text-white font-bold transition-colors font-orbitron text-xs tracking-widest">
            VIEW ALL PROJECTS
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Project modular cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'MOD-01', name: 'Aleef Global',  tags: ['React', 'Node.js', 'MongoDB'] },
            { id: 'MOD-02', name: 'HomeRocks',     tags: ['Next.js', 'Express', 'Redis'] },
            { id: 'MOD-03', name: 'Najm Care',     tags: ['React', 'Node.js', 'AWS'] },
          ].map(({ id, name, tags }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="cyber-card flex flex-col justify-between"
              style={{ minHeight: '230px' }}
            >
              {/* Decorative ID Accent */}
              <div className="cyber-card-decor">
                [{id}]
              </div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg sm:text-xl font-bold font-orbitron text-white group-hover:text-accent-blue transition-colors pr-10">
                    {name}
                  </h4>
                  <div className="text-white/20 hover:text-accent-blue transition-colors duration-300">
                    <ArrowRight size={18} className="-rotate-45" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-inter leading-relaxed">
                  Full-stack web application with integrated MERN architecture,
                  optimizing workflow and user experience.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {tags.map(tag => (
                  <span key={tag} className="cyber-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

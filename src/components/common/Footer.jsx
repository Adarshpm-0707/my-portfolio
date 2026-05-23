import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Terminal, Shield, Database, Radio } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setSystemTime(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#020203] border-t border-white/10 pt-16 pb-8 overflow-hidden font-mono text-xs text-gray-400">
      {/* Sci-fi Terminal Grid Overlay & Scanning CRT Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-accent-blue/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-[250px] h-[250px] bg-accent-purple/[0.01] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Terminal Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-white/10 bg-black/40 px-4 py-2.5 rounded-t-lg border-b-0 font-orbitron tracking-wider">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-neon animate-pulse" />
            <span className="text-[10px] text-accent-neon font-bold">SYS.STATUS: OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-4 text-[9px] text-white/50">
            <span>PING: 18ms</span>
            <span>SECURE_UPLINK: TLS_1.3</span>
            <span className="text-accent-blue">[ TIME: {systemTime || '00:00:00'} ]</span>
          </div>
        </div>

        {/* Main Monospace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-white/10 bg-black/20">
          
          {/* Section 1: Core System Ident (4 Columns) */}
          <div className="md:col-span-5 p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between gap-6">
            <div>
              <Link to="/" className="group inline-flex items-center gap-2">
                <Terminal size={14} className="text-accent-blue group-hover:rotate-6 transition-transform" />
                <span className="text-sm font-bold font-orbitron tracking-widest text-white group-hover:text-accent-blue transition-colors">
                  ADARSH_P_M // CORE
                </span>
              </Link>
              <p className="text-[11px] text-gray-500 mt-3 leading-relaxed font-mono">
                MERN Stack Architect & Creative Web Developer. Building reactive, visual-heavy, and high-performance digital environments.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                <Shield size={10} className="text-accent-blue" />
                <span>INTEGRITY_OK</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                <Database size={10} className="text-accent-purple" />
                <span>DB: CONNECTED</span>
              </div>
            </div>
          </div>

          {/* Section 2: Directory Lookup (3 Columns) */}
          <div className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-4">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-orbitron">
              // SYS_DIRECTORY
            </div>
            <nav className="flex flex-col gap-2 font-mono text-[11px]">
              {[
                { label: '01_HOME', path: '/' },
                { label: '02_SKILLS', path: '/skills' },
                { label: '03_EXPERIENCE', path: '/experience' },
                { label: '04_PROJECTS', path: '/projects' },
                { label: '05_CONTACT', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="group flex items-center justify-between text-gray-400 hover:text-accent-blue transition-colors py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    &gt; {link.label}
                  </span>
                  <span className="text-[9px] text-white/10 group-hover:text-accent-blue/30 font-bold transition-colors">
                    [LOAD]
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Section 3: Tech Specs & Telemetry (4 Columns) */}
          <div className="md:col-span-4 p-6 flex flex-col gap-4">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-orbitron flex items-center gap-1.5">
              <Radio size={10} className="text-accent-pink animate-pulse" />
              // TELEMETRY_FEED
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[10px]">
              <div>
                <span className="text-white/20 block font-bold">LOC:</span>
                <span className="text-gray-300">KERALA, INDIA</span>
              </div>
              <div>
                <span className="text-white/20 block font-bold">HOST:</span>
                <span className="text-gray-300">VITE_PROD</span>
              </div>
              <div>
                <span className="text-white/20 block font-bold">ENGINE:</span>
                <span className="text-gray-300">MERN_STACK</span>
              </div>
              <div>
                <span className="text-white/20 block font-bold">GFX:</span>
                <span className="text-gray-300">THREE.JS / WEBGL</span>
              </div>
              <div className="col-span-2">
                <span className="text-white/20 block font-bold">SYSTEM_UUID:</span>
                <span className="text-accent-purple truncate block">ADM-83B9-F48A-4357</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom control panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/10 bg-black/40 px-4 py-4 rounded-b-lg border-t-0 mt-0">
          
          {/* Social connections in terminal brackets format */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30 mr-2">CONNECT:</span>
            {[
              { label: 'GH', href: 'https://github.com/AdarshPM' },
              { label: 'LN', href: 'https://linkedin.com/in/adarshpm' },
              { label: 'TW', href: 'https://twitter.com/adarshpm' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 border border-white/10 hover:border-accent-blue hover:text-accent-blue hover:bg-accent-blue/5 rounded transition-all font-mono text-[10px]"
              >
                [{social.label}]
              </a>
            ))}
          </div>

          {/* Copyright line */}
          <div className="text-[10px] text-gray-500 text-center sm:text-left font-mono">
            © {currentYear} ADARSH_P_M. ALL_SYSTEMS_GO // VER: 2.1.0
          </div>

          {/* Elevator top navigation */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 border border-white/10 hover:border-accent-blue hover:text-accent-blue hover:bg-accent-blue/5 rounded text-[10px] transition-all font-mono cursor-none"
          >
            <ArrowUp size={10} />
            <span>[SYS.RUN_SCROLL_UP]</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Palette } from 'lucide-react';
import { useTheme, themesConfig } from '../../context/ThemeContext';
import logoImg from '../../assets/logo.png';


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-3 py-4 sm:px-4 sm:py-6 pointer-events-none">
      <nav 
        className={`mx-auto max-w-5xl pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled 
          ? 'bg-black/40 backdrop-blur-xl py-2 px-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
          : 'bg-black/25 backdrop-blur-xl py-2.5 px-3 rounded-full border border-white/10 sm:bg-transparent sm:py-4 sm:px-6 sm:rounded-none sm:border-transparent sm:backdrop-blur-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
        
              <img src={logoImg} alt="Logo" className="theme-logo relative h-11 w-auto object-contain sm:h-14" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {(hoveredPath === link.path || isActive) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-full -z-10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Theme Selector + CTA Button */}
          <div className="flex items-center gap-2.5 sm:gap-4 z-50">
            {/* Desktop Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5 active:scale-95 transition-all flex items-center justify-center cursor-pointer pointer-events-auto"
                aria-label="Change theme"
              >
                <Palette size={15} />
              </button>

              <AnimatePresence>
                {isThemeOpen && (
                  <>
                    <div className="fixed inset-0 z-10 pointer-events-auto" onClick={() => setIsThemeOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                      className="absolute right-0 mt-3.5 w-56 z-20 glass-premium border border-white/15 rounded-2xl p-2.5 flex flex-col gap-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
                    >
                      <div className="text-[9px] font-orbitron font-bold uppercase tracking-[0.2em] text-gray-500 px-2 py-1 select-none">
                        SYSTEM PALETTE
                      </div>
                      {Object.entries(themesConfig).map(([themeKey, config]) => {
                        const isSelected = theme === themeKey;
                        return (
                          <button
                            key={themeKey}
                            onClick={() => {
                              setTheme(themeKey);
                              setIsThemeOpen(false);
                            }}
                            className={`w-full text-left rounded-xl p-2 transition-all duration-300 flex items-center justify-between hover:bg-white/5 group border cursor-pointer ${
                              isSelected ? 'border-accent-blue/20 bg-accent-blue/5 text-white' : 'border-transparent text-gray-400'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className={`text-[11px] font-bold font-orbitron uppercase group-hover:text-white ${isSelected ? 'text-accent-blue' : ''}`}>
                                {config.name}
                              </span>
                              <div className="flex gap-1 mt-1">
                                {config.swatches.map((color, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className="w-2.5 h-2.5 rounded-full border border-black/40"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue glow-blue" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-tighter hover:bg-accent-blue hover:text-white transition-all duration-300 group pointer-events-auto"
            >
              Hire Me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-white bg-white/5 rounded-full border border-white/10 active:scale-95 transition-transform"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[-1] pointer-events-auto"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[min(88vw,330px)] bg-[#08080b]/95 backdrop-blur-2xl border-l border-white/10 z-[101] p-6 sm:p-8 pointer-events-auto flex flex-col shadow-[-24px_0_60px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-white/40 font-orbitron text-[10px] uppercase tracking-[0.3em]">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-white p-2 bg-white/5 border border-white/10 rounded-full" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 font-orbitron text-xl font-bold transition-colors ${
                        location.pathname === link.path ? 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue' : 'border-white/5 bg-white/[0.03] text-white'
                      }`}
                    >
                      {link.name}
                      <ArrowRight size={16} className="opacity-50" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Theme Selector for Mobile */}
              <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-2.5">
                <span className="text-white/40 font-orbitron text-[9px] uppercase tracking-[0.25em]">System Palette</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {Object.entries(themesConfig).map(([themeKey, config]) => {
                    const isSelected = theme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => setTheme(themeKey)}
                        className={`aspect-square rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                          isSelected ? 'border-accent-blue bg-accent-blue/10 scale-105' : 'border-white/5 bg-white/[0.02]'
                        }`}
                        title={config.name}
                      >
                        <span 
                          className="w-4.5 h-4.5 rounded-full border border-black/30 shadow-md"
                          style={{ backgroundColor: config.swatches[0] }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-accent-blue text-white text-center font-black rounded-2xl shadow-[0_0_20px_rgba(45,212,191,0.28)]"
                >
                  START A PROJECT
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

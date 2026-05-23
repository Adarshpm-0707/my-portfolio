import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },

];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${
          scrolled
            ? 'top-4 w-[94%] lg:w-[92%] max-w-6xl px-4 sm:px-6 py-3 rounded-2xl glass-premium shadow-2xl border border-white/10'
            : 'top-0 w-full px-4 sm:px-8 py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex justify-between items-center w-full">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center glow-blue transition-all shrink-0"
            >
              <Code2 className="text-white w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </motion.div>
            <span className="text-sm sm:text-base md:text-lg font-black font-orbitron tracking-wider text-white group-hover:text-accent-blue transition-colors whitespace-nowrap">
              ADARSH<span className="text-accent-blue">.DEV</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
            {navLinks.map((link) => {
              const active = link.path === '/' 
                ? location.pathname === '/' && location.hash === '' 
                : link.path === '/#about'
                ? location.pathname === '/' && location.hash === '#about'
                : location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium text-xs tracking-widest uppercase transition-colors hover:text-accent-blue py-1 ${
                    active ? 'text-accent-blue' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="relative overflow-hidden px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all glow-blue group shrink-0"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-white w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors shrink-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[99] lg:hidden bg-[#030303]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col gap-6 text-center w-full max-w-sm">
              {navLinks.map((link) => {
                const active = link.path === '/' 
                  ? location.pathname === '/' && location.hash === '' 
                  : link.path === '/#about'
                  ? location.pathname === '/' && location.hash === '#about'
                  : location.pathname === link.path;

                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-2xl font-black font-orbitron tracking-widest uppercase py-2 hover:text-accent-blue transition-colors ${
                        active ? 'text-accent-blue text-gradient' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="mt-8">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-black text-center uppercase tracking-widest shadow-lg glow-blue"
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

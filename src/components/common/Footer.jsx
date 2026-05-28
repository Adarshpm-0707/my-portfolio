import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const GithubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const techPills = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Vite'
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#080d14] via-[#05080c] to-black text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Top glowing separator line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      
      {/* Background glow effects */}
      <div className="absolute -top-40 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl">
        {/* Main Columns Container - Clean panels separated by subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/10 items-stretch">
          
          {/* Section 1: Logo & Vision */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left py-8 md:py-10 md:pr-8 border-b border-white/5 md:border-b-0 md:border-r border-white/5">
            <Link to="/" className="inline-flex items-center transition-transform hover:scale-102 duration-300">
              <img src={logoImg} alt="Logo" className="theme-logo h-14 w-auto object-contain sm:h-16" />
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-6 text-gray-400 font-inter max-w-xs">
              Dedicated MERN stack developer focusing on engineering fast, visually compelling, and extremely polished user experiences.
            </p>
            
            {/* Tech Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5 justify-center md:justify-start">
              {techPills.map((tech) => (
                <span 
                  key={tech} 
                  className="text-[9px] font-orbitron uppercase tracking-wider text-accent-blue/80 bg-accent-blue/5 border border-accent-blue/10 rounded-md px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left py-8 md:py-10 md:px-8 border-b border-white/5 md:border-b-0 md:border-r border-white/5">
            <h4 className="text-xs font-orbitron font-bold uppercase tracking-[0.25em] text-accent-blue mb-5">
              Navigation
            </h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 md:flex-col md:items-start md:justify-start md:gap-y-3 font-inter">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center justify-center md:justify-start gap-1 text-xs sm:text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <span className="text-accent-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0 font-orbitron text-xs">→</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Section 3: Availability & Contact Details */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left py-8 md:py-10 md:pl-8">
            <h4 className="text-xs font-orbitron font-bold uppercase tracking-[0.25em] text-accent-blue mb-5">
              Get In Touch
            </h4>
            
            <div className="w-full max-w-sm flex flex-col gap-4 font-inter text-xs sm:text-sm">
        

              {/* Email */}
              <a 
                href="mailto:adarshpm0707@gmail.com" 
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 min-w-0 justify-center md:justify-start"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300 shrink-0">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-orbitron">Email Me</span>
                  <span className="font-semibold text-[11px] sm:text-sm break-all text-left">adarshpm0707@gmail.com</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent-blue/10 text-accent-blue shrink-0">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-orbitron">Location</span>
                  <span className="font-semibold text-[11px] sm:text-sm text-left">Kerala, India</span>
                </div>
              </div>

              {/* Responsive Social Links inside Get In Touch container */}
              <div className="flex items-center gap-3 justify-center md:justify-start mt-2 border-t border-white/5 pt-4">
                <a
                  href="https://github.com/Adarshpm-0707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-[16px] w-[16px] shrink-0" />
                </a>
               
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Back to Top */}
        <div className="mt-6 flex flex-col gap-4 items-center justify-between sm:flex-row text-xs text-gray-500 font-inter">
          <p className="text-center sm:text-left">
            © {currentYear} Adarsh P M. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 transition-all duration-300 hover:border-accent-blue/30 hover:bg-accent-blue/5 hover:text-white active:scale-95 group shadow-md"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

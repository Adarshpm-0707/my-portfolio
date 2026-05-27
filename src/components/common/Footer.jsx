import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#0b0f14] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center text-xl font-black tracking-tight font-orbitron">
              AASSHH<span className="text-accent-blue">.DEV</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-white/55 font-inter">
              MERN stack developer building clean, scalable, and user-friendly web applications.
            </p>
       
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white font-inter">Navigation</h3>
            <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/55 transition-colors hover:text-white font-inter"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white font-inter">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-white/55 font-inter">
              <a href="mailto:adarshpm0707@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail size={16} className="text-accent-blue" />
                adarshpm0707@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent-blue" />
                Kerala, India
              </div>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white font-inter"
            >
              Back to top
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 font-inter sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Adarsh P M. All rights reserved.</p>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;

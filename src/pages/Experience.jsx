import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Upcode Software Labs',
      role: 'MERN Stack Developer',
      location: 'Kerala, India',
      period: '7 Months',
      description: [
        'Developed and maintained production-level React applications with complex state management.',
        'Collaborated on building robust RESTful APIs using Node.js and Express.',
        'Optimized frontend performance and implemented responsive design patterns.',
        'Integrated third-party services and APIs for enhanced application functionality.'
      ],
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
      link: '#'
    },
    {
      company: 'Aleef Concepts',
      role: 'MERN Developer Intern',
      location: 'Kerala, India',
      period: '6 Months',
      description: [
        'Gained hands-on experience in full-stack development using the MERN stack.',
        'Built interactive and responsive user interfaces with modern CSS frameworks.',
        'Assisted in designing database schemas and server-side logic.',
        'Participated in code reviews and agile development sprints.'
      ],
      skills: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js'],
      link: '#'
    },
    {
      company: 'TCS (Tata Consultancy Services)',
      role: 'Internship Program',
      location: 'Remote/Kerala',
      period: '1 Month',
      description: [
        'Engaged in an intensive training program on enterprise software standards.',
        'Learned about agile methodologies, version control, and collaboration tools.',
        'Completed projects focused on core computer science and web fundamentals.',
        'Participated in workshops on modern software development life cycles.'
      ],
      skills: ['Software Engineering', 'Agile', 'Web Basics'],
      link: '#'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-5xl mx-auto bg-grid-pattern bg-radial-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 text-center"
      >
        <span className="text-accent-blue font-orbitron font-bold tracking-[0.3em] mb-3 block text-xs sm:text-sm uppercase font-black">Career</span>
        <h1 className="text-4xl sm:text-6xl font-black font-orbitron">JOURNEY</h1>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-2 sm:ml-6 space-y-12">
        {/* Glow Line Indicator */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-accent-blue via-accent-purple to-transparent pointer-events-none" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
            className="relative"
          >
            {/* Timeline Dot with Pulse Effect */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-accent-blue opacity-30" />
              <div className="relative rounded-full h-3.5 w-3.5 bg-primary border-2 border-accent-blue glow-blue" />
            </div>
            
            <div className="glass-premium p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-accent-blue/20 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-orbitron text-white group-hover:text-accent-blue transition-colors">{exp.company}</h3>
                    <motion.a 
                      whileHover={{ scale: 1.1, color: '#00d2ff' }}
                      href={exp.link} 
                      className="text-gray-500 hover:text-white transition-colors"
                      aria-label={`Visit ${exp.company}`}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                  <p className="text-accent-purple font-black tracking-widest uppercase text-xs mt-1.5 font-orbitron">{exp.role}</p>
                </div>
                
                <div className="flex flex-col md:items-end gap-1.5 text-gray-500 font-inter text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent-blue/70" /> {exp.period}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent-blue/70" /> {exp.location}
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-400 font-inter text-sm sm:text-base leading-relaxed">
                    <span className="text-accent-blue mt-1.5 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1 bg-white/5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/60 border border-white/5 group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-colors duration-300 font-inter"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

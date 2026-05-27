import { motion } from 'framer-motion';
import { MapPin, ExternalLink, ArrowRight } from 'lucide-react';

const experiences = [
  {
    index: '01',
    company: 'Upcode Software Labs',
    role: 'MERN Stack Developer',
    location: 'Kerala, India',
    period: '7 Months',
    type: 'Full-Time',
    accent: 'from-cyan-500 to-blue-600',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/20',
    accentBg: 'bg-cyan-500/5',
    description: [
      'Built and maintained production-level React apps with complex state management using Redux.',
      'Designed robust RESTful APIs with Node.js and Express, integrated MongoDB for data persistence.',
      'Optimized core web vitals and implemented responsive, accessible design patterns.',
      'Delivered seamless third-party API integrations to enhance application functionality.',
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    link: '#',
  },
  {
    index: '02',
    company: 'Aleef Concepts',
    role: 'MERN Developer Intern',
    location: 'Kerala, India',
    period: '6 Months',
    type: 'Internship',
    accent: 'from-violet-500 to-purple-600',
    accentText: 'text-violet-400',
    accentBorder: 'border-violet-500/20',
    accentBg: 'bg-violet-500/5',
    description: [
      'Gained full-stack proficiency building real-world projects with the MERN stack.',
      'Crafted polished, responsive UIs using Tailwind CSS and modern React patterns.',
      'Contributed to database schema design and authored core server-side business logic.',
      'Collaborated across agile sprints, code reviews, and feature planning sessions.',
    ],
    skills: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js'],
    link: 'https://aleefglobal.com/',
  },
  {
    index: '03',
    company: 'Tata Consultancy Services',
    role: 'Internship Program',
    location: 'Remote / Kerala',
    period: '1 Month',
    type: 'Training',
    accent: 'from-rose-500 to-orange-500',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500/20',
    accentBg: 'bg-rose-500/5',
    description: [
      'Completed an intensive training program covering enterprise-grade software standards.',
      'Studied agile methodologies, version control workflows, and professional collaboration tools.',
      'Delivered focused projects on computer science fundamentals and web development basics.',
      'Participated in workshops on the modern software development lifecycle (SDLC).',
    ],
    skills: ['Software Engineering', 'Agile', 'Git', 'Web Basics'],
    link: '#',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Experience = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* ── Ambient Glows ────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 md:pt-32 md:pb-32">

        {/* ── Page Hero ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-24"
        >
          <p className="text-xs font-semibold tracking-[0.4em] text-slate-500 uppercase mb-4 font-sans">
            Career · Work History
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 md:mb-6">
            Where I've
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              worked.
            </span>
          </h1>
          <div className="flex items-center gap-4 mt-6 md:mt-8">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
            <p className="text-slate-500 text-xs sm:text-sm font-medium font-sans">
              {experiences.length} roles · Full-Stack Development
            </p>
          </div>
        </motion.div>

        {/* ── Experience Cards ──────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="group relative"
            >
              {/* Gradient border glow on hover */}
              <div className={`absolute -inset-px rounded-2xl md:rounded-3xl bg-gradient-to-r ${exp.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm`} />
              
              <div className={`relative rounded-2xl md:rounded-3xl border ${exp.accentBorder} bg-[#0a0d16] overflow-hidden`}>
                {/* Top accent bar */}
                <div className={`h-[2px] w-full bg-gradient-to-r ${exp.accent} opacity-60`} />

                <div className="p-5 sm:p-8 md:p-10">
                  {/* ── Card Header ── */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                    
                    {/* Left: Number + Info */}
                    <div className="flex gap-4 sm:gap-6 items-start">
                      {/* Large Index Number */}
                      <span className={`text-3xl sm:text-5xl md:text-6xl font-black ${exp.accentText} opacity-20 leading-none select-none font-mono`}>
                        {exp.index}
                      </span>

                      <div>
                        {/* Badge Row */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          <span className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${exp.accentBg} ${exp.accentText} border ${exp.accentBorder} font-sans`}>
                            {exp.type}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 tracking-widest uppercase flex items-center gap-1 font-sans">
                            <MapPin size={10} />
                            {exp.location}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-slate-100 transition-colors">
                          {exp.company}
                        </h2>
                        <p className={`text-xs sm:text-sm font-semibold mt-1 ${exp.accentText} font-sans`}>
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Right: Period + Link */}
                    <div className="flex flex-col md:items-end gap-2 sm:gap-3 shrink-0">
                      <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl ${exp.accentBg} border ${exp.accentBorder}`}>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold font-sans">Duration</p>
                        <p className={`text-sm sm:text-lg font-black ${exp.accentText} font-sans`}>{exp.period}</p>
                      </div>

                      {exp.link !== '#' && (
                        <motion.a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-400 hover:text-white transition-colors font-sans"
                        >
                          Visit Site <ExternalLink size={12} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* ── Divider ── */}
                  <div className={`h-px w-full bg-gradient-to-r ${exp.accent} opacity-10 mb-6 md:mb-8`} />

                  {/* ── Description Bullets ── */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 md:mb-8">
                    {exp.description.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="flex gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm leading-relaxed font-sans"
                      >
                        <ArrowRight
                          size={14}
                          className={`${exp.accentText} mt-0.5 shrink-0 opacity-70`}
                        />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* ── Skills ── */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08 }}
                        className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border ${exp.accentBorder} ${exp.accentBg} ${exp.accentText} cursor-default select-none transition-all hover:brightness-125 font-sans`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.02]"
        >
          <div>
            <p className="text-white font-bold text-base sm:text-lg font-sans">Open to new opportunities</p>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-sans">Let's build something great together.</p>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl hover:bg-cyan-400 transition-colors w-full sm:w-auto justify-center font-sans"
          >
            Get In Touch <ArrowRight size={16} />
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
};

export default Experience;

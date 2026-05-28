import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Files, Search, GitBranch, Play, Blocks, Settings, 
  ChevronDown, ChevronRight, FileCode
} from 'lucide-react';

const TypewriterValue = ({ text, stepIndex, currentStep, onComplete, delay = 35 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (currentStep !== stepIndex) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, currentStep, stepIndex, onComplete, delay]);

  if (currentStep > stepIndex) {
    return <span>"{text}"</span>;
  }
  
  if (currentStep < stepIndex) {
    return <span>""</span>;
  }

  return (
    <span>
      "{displayed}"
      <span className="animate-pulse border-r-2 border-[#ce9178] ml-0.5">&nbsp;</span>
    </span>
  );
};

const About = () => {
  // Explorer folder states
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  
  // Editor content folding states
  const [isIdentityExpanded, setIsIdentityExpanded] = useState(true);
  const [isEducationExpanded, setIsEducationExpanded] = useState(true);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(true);

  // Typing animation sequential state
  const [typingStep, setTypingStep] = useState(-1); // -1 means waiting for in-view
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypingStep(0); // Start typing step 0
        } else {
          setTypingStep(-1); // Reset when scrolled out of view
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Quick stats calculations
  const totalExpMonths = 7 + 6 + 1; // 14 months total
  const yearsOfCoding = new Date().getFullYear() - 2022;

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto scroll-mt-24 relative z-10 font-sans"
    >
      
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-12 text-center lg:text-left"
      >
        <span className="text-accent-blue font-orbitron font-bold tracking-[0.3em] mb-2 block text-xs sm:text-sm uppercase">
          // 02 // ABOUT ME
        </span>
       
      </motion.div>

      {/* VS Code Window Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full rounded-2xl border border-white/10 bg-[#0d0d11]/90 shadow-2xl overflow-hidden glass-premium flex-col"
      >
        
        {/* VS Code Title Bar */}
        <div className="flex items-center justify-between bg-[#08080b] px-3 sm:px-4 py-3 border-b border-white/5 select-none">
          {/* macOS traffic light window buttons */}
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
          </div>
          {/* Centered Document Title */}
          <div className="text-[10px] sm:text-[11px] text-gray-500 font-mono truncate max-w-[12rem] sm:max-w-[18rem] lg:max-w-md">
            developer.json - portfolio - Visual Studio Code
          </div>
          {/* Spacer */}
          <div className="w-12 sm:w-16" />
        </div>

        {/* IDE Main Area */}
        <div className="flex flex-1 min-h-[420px] sm:min-h-[440px] lg:min-h-[500px]">
          
          {/* Left Navigation Bar (Activity Bar) */}
          <div className="hidden md:flex flex-col justify-between items-center bg-[#0b0f14] py-4 w-12 border-r border-white/5 text-gray-500">
            <div className="flex flex-col gap-6 w-full items-center">
              <button 
                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                className={`p-1.5 rounded transition-colors ${isExplorerOpen ? 'text-accent-blue border-l-2 border-accent-blue rounded-none w-full flex justify-center' : 'hover:text-white'}`}
                aria-label="Toggle Explorer"
              >
                <Files size={18} />
              </button>
              <button className="hover:text-white" aria-label="Search"><Search size={18} /></button>
              <button className="hover:text-white" aria-label="Source Control"><GitBranch size={18} /></button>
              <button className="hover:text-white" aria-label="Run & Debug"><Play size={18} /></button>
              <button className="hover:text-white" aria-label="Extensions"><Blocks size={18} /></button>
            </div>
            <div>
              <button className="hover:text-white" aria-label="Settings"><Settings size={18} /></button>
            </div>
          </div>

          {/* Sidebar Folder Explorer Panel - Collapsible & hidden on small screens */}
          <AnimatePresence initial={false}>
            {isExplorerOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden xl:flex flex-col bg-[#09090c] border-r border-white/5 font-mono text-xs select-none overflow-hidden"
              >
                <div className="p-3 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Explorer: Portfolio
                </div>
                
                {/* File Tree hierarchy */}
                <div className="px-2 flex-1">
                  <div className="flex items-center gap-1.5 py-1 text-gray-400 font-semibold cursor-pointer">
                    <ChevronDown size={14} />
                    <span>portfolio</span>
                  </div>
                  
                  <div className="pl-4">
                    <div className="flex items-center gap-1.5 py-1 text-gray-400 font-semibold cursor-pointer">
                      <ChevronDown size={14} />
                      <span>src</span>
                    </div>
                    
                    <div className="pl-4">
                      <div 
                        onClick={() => setIsPagesOpen(!isPagesOpen)}
                        className="flex items-center gap-1.5 py-1 text-gray-400 cursor-pointer hover:text-white"
                      >
                        {isPagesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <span>pages</span>
                      </div>
                      
                      {isPagesOpen && (
                        <div className="pl-4 flex flex-col">
                          <div className="flex items-center gap-1.5 py-1.5 px-2 bg-accent-blue/15 text-accent-blue border-l border-accent-blue cursor-pointer">
                            <FileCode size={13} />
                            <span>developer.json</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-1.5 px-2 text-gray-500 hover:text-gray-300 cursor-pointer">
                            <FileCode size={13} />
                            <span>Home.jsx</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-1.5 px-2 text-gray-500 hover:text-gray-300 cursor-pointer">
                            <FileCode size={13} />
                            <span>Projects.jsx</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Workspace Panel */}
          <div className="flex-1 flex flex-col bg-[#0b0b0e] overflow-hidden">
            
            {/* Editor Active Tab Bar */}
            <div className="flex bg-[#08080a] border-b border-white/5 text-[10px] sm:text-[11px] font-mono select-none">
              <div className="flex items-center gap-2 bg-[#0b0b0e] px-3 sm:px-4 py-2 border-t border-accent-blue text-white border-r border-white/5 cursor-pointer">
                <FileCode size={12} className="text-yellow-600" />
                <span>developer.json</span>
                <span className="text-gray-600 hover:text-white ml-2 text-[9px]">×</span>
              </div>
            </div>

            {/* Code Lines Panel */}
            <div className="flex-1 p-2.5 sm:p-3 lg:p-4 overflow-auto font-mono text-[10px] sm:text-[11px] lg:text-sm leading-relaxed text-gray-300 relative select-text scrollbar-thin">
              
              <div className="flex min-w-[430px] sm:min-w-[560px] lg:min-w-[640px] xl:min-w-0">
                {/* Line Numbers Gutter */}
                <div className="text-right text-gray-600 select-none pr-2 sm:pr-4 border-r border-white/5 flex flex-col w-7 sm:w-9">
                  {Array.from({ length: 44 }, (_, i) => (
                    <span key={i} className="h-6 flex items-center justify-end">{i + 1}</span>
                  ))}
                </div>

                {/* Actual Highlighted Content */}
                <div className="pl-2.5 sm:pl-4 flex-1 flex flex-col">
                  
                  {/* Line 1 */}
                  <div className="h-6 flex items-center">
                    <span className="text-[#c586c0]">export default</span>&nbsp;
                    <span className="text-[#569cd6]">const</span>&nbsp;
                    <span className="text-[#dcdcaa]">developer</span>&nbsp;
                    <span className="text-white">=</span>&nbsp;
                    <span className="text-[#ffd700]">{`{`}</span>
                  </div>

                  {/* Line 2: Identity toggle */}
                  <div className="h-6 flex items-center gap-1">
                    <span className="text-white/20">&nbsp;&nbsp;</span>
                    <button 
                      onClick={() => setIsIdentityExpanded(!isIdentityExpanded)} 
                      className="text-gray-600 hover:text-white cursor-pointer select-none"
                    >
                      {isIdentityExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                    <span className="text-[#9cdcfe]">"identity"</span>
                    <span className="text-white">:</span>&nbsp;
                    <span className="text-[#da70d6]">{`{`}</span>
                    {!isIdentityExpanded && <span className="text-[#da70d6]">{` ... },`}</span>}
                  </div>

                  {/* Identity Object Body */}
                  {isIdentityExpanded && (
                    <>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"name"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Adarsh P M" 
                            stepIndex={0} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(1)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"role"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="MERN Stack Architect" 
                            stepIndex={1} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(2)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"origin"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Kerala, India" 
                            stepIndex={2} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(3)} 
                          />
                        </span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;</span>
                        <span className="text-[#da70d6]">{`},`}</span>
                      </div>
                    </>
                  )}

                  {/* Education Header */}
                  <div className="h-6 flex items-center gap-1">
                    <span className="text-white/20">&nbsp;&nbsp;</span>
                    <button 
                      onClick={() => setIsEducationExpanded(!isEducationExpanded)} 
                      className="text-gray-600 hover:text-white cursor-pointer select-none"
                    >
                      {isEducationExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                    <span className="text-[#9cdcfe]">"education"</span>
                    <span className="text-white">:</span>&nbsp;
                    <span className="text-[#da70d6]">{`{`}</span>
                    {!isEducationExpanded && <span className="text-[#da70d6]">{` ... },`}</span>}
                  </div>

                  {/* Education Body */}
                  {isEducationExpanded && (
                    <>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"degree"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Bachelor of Computer Applications" 
                            stepIndex={3} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(4)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"duration"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="2023 - 2025" 
                            stepIndex={4} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(5)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"university"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Rabindranath Tagore University" 
                            stepIndex={5} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(6)} 
                          />
                        </span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;</span>
                        <span className="text-[#da70d6]">{`},`}</span>
                      </div>
                    </>
                  )}

                  {/* Experience Header */}
                  <div className="h-6 flex items-center gap-1">
                    <span className="text-white/20">&nbsp;&nbsp;</span>
                    <button 
                      onClick={() => setIsExperienceExpanded(!isExperienceExpanded)} 
                      className="text-gray-600 hover:text-white cursor-pointer select-none"
                    >
                      {isExperienceExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                    <span className="text-[#9cdcfe]">"experience"</span>
                    <span className="text-white">:</span>&nbsp;
                    <span className="text-[#da70d6]">{`[`}</span>
                    {!isExperienceExpanded && <span className="text-[#da70d6]">{` ... ]`}</span>}
                  </div>

                  {/* Experience Array Body */}
                  {isExperienceExpanded && (
                    <>
                      {/* Job 1 */}
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`{`}</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"company"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Upcode Software Labs" 
                            stepIndex={6} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(7)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"role"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="MERN Stack Developer" 
                            stepIndex={7} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(8)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"period"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="7 Months" 
                            stepIndex={8} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(9)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"summary"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Building high-performance APIs and reactive frontend applications." 
                            stepIndex={9} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(10)} 
                          />
                        </span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`},`}</span>
                      </div>

                      {/* Job 2 */}
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`{`}</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"company"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Aleef Concepts" 
                            stepIndex={10} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(11)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"role"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Internship" 
                            stepIndex={11} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(12)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"period"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="6 Months" 
                            stepIndex={12} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(13)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"summary"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Focusing on user experiences, dashboard architectures, and responsive layout styling." 
                            stepIndex={13} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(14)} 
                          />
                        </span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`},`}</span>
                      </div>

                      {/* Job 3 */}
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`{`}</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"company"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="TCS" 
                            stepIndex={14} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(15)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"role"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Internship Program" 
                            stepIndex={15} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(16)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"period"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="1 Month" 
                            stepIndex={16} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(17)} 
                          />
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#9cdcfe]">"summary"</span>
                        <span className="text-white">:</span>&nbsp;
                        <span className="text-[#ce9178]">
                          <TypewriterValue 
                            text="Participated in comprehensive enterprise software development training." 
                            stepIndex={17} 
                            currentStep={typingStep} 
                            onComplete={() => setTypingStep(18)} 
                          />
                        </span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-[#ffd700]">{`}`}</span>
                      </div>
                      <div className="h-6 flex items-center">
                        <span className="text-white/20">&nbsp;&nbsp;</span>
                        <span className="text-[#da70d6]">{`]`}</span>
                      </div>
                    </>
                  )}

                  {/* Ending curly brace */}
                  <div className="h-6 flex items-center">
                    <span className="text-[#ffd700]">{`};`}</span>
                  </div>

                  {/* Line comment detail at end */}
                  <div className="h-6 flex items-center mt-4">
                    <span className="text-[#6a9955]">// Click on disclosure triangles next to headers to collapse section blocks.</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom IDE Status Bar */}
            <div className="bg-accent-blue text-[#08080b] py-1 px-3 sm:px-4 flex justify-between items-center text-[9px] sm:text-[10px] font-mono select-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1 font-bold">
                  <GitBranch size={12} />
                  <span>main*</span>
                </span>
                <span className="opacity-70 hidden sm:inline">Synchronized</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span>UTF-8</span>
                <span>JSON</span>
                <span className="hidden sm:inline">Prettier ✅</span>
                <span className="font-bold">Ln 1, Col 1</span>
              </div>
            </div>

          </div>

        </div>

      </motion.div>


    </section>
  );
};

export default About;

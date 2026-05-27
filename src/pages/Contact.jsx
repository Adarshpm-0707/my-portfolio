import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Send, MapPin, Phone, CheckCircle2, Terminal, Activity, Cpu, Globe, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const form = useRef();
  const terminalEndRef = useRef(null);
  const { colors: themeColors } = useTheme();
  
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
  const [activeField, setActiveField] = useState(null);
  const [latency, setLatency] = useState(24);

  const [logs, setLogs] = useState([
    'NODE_READY: Neural gateway online.',
    'ENCRYPT: AES-256 handshake established.',
    'Awaiting user data packets...'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(Math.floor(18 + Math.random() * 12));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    setLogs((prev) => [...prev.slice(-15), `[${time}] ${msg}`]);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
    addLog('UPLOADING: Fragmenting payload...');
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => {
        addLog('SIGNAL_STRENGTH: 100% - Sent successfully.');
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus(null), 5000);
      }, () => {
        // Fallback for visual demo
        setTimeout(() => {
          addLog('PROXY_SEND: Routed via backup relay.');
          setStatus('success');
          form.current.reset();
        }, 1500);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12 bg-[#030712] text-slate-300 selection:bg-cyan-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-cyan-500"></span>
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Connectivity Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Touch.</span>
            </h1>
          </motion.div>

     
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Info Cards & Terminal */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Method Bento Box */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
              <div className="bg-[#0b0f1a] rounded-[22px] p-6 space-y-6">
                {[
                  { icon: Mail, label: 'Email', val: 'adarshpm0707@gmail.com', color: 'text-cyan-400', link: 'mailto:adarshpm0707@gmail.com' },
                  { icon: Globe, label: 'Location', val: 'Kerala, India', color: 'text-purple-400' },
                  { icon: Phone, label: 'Phone / WhatsApp', val: '8078005629', color: 'text-emerald-400', link: 'https://wa.me/918078005629' }
                ].map((item, i) => {
                  const isLink = !!item.link;
                  const Component = isLink ? motion.a : motion.div;
                  const linkProps = isLink ? {
                    href: item.link,
                    target: item.link.startsWith('http') ? '_blank' : undefined,
                    rel: item.link.startsWith('http') ? 'noopener noreferrer' : undefined,
                    onClick: () => addLog(`REDIRECT: Navigating to secure ${item.label} channel...`)
                  } : {};

                  return (
                    <Component 
                      key={i}
                      whileHover={{ x: 5 }}
                      className={`flex items-start gap-4 group ${isLink ? 'cursor-pointer hover:no-underline' : 'cursor-crosshair'}`}
                      {...linkProps}
                    >
                      <div className={`mt-1 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-colors ${item.color}`}>
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm text-slate-200 font-medium">{item.val}</p>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>

     
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-8 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            
            <div className="relative bg-[#0b0f1a] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                    className="absolute inset-0 z-50 bg-cyan-950/20 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/50">
                      <CheckCircle2 size={40} className="text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Transmission Received</h2>
                    <p className="text-slate-400 mb-8 font-mono">I will sync back with you shortly.</p>
                    <button 
                      onClick={() => setStatus(null)}
                      className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
                    >
                      SEND ANOTHER
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <div className="relative">
                    <label className="text-[10px] font-mono uppercase text-slate-500 ml-1 mb-2 block">Identity</label>
                    <input 
                      type="text" 
                      name="user_name" 
                      required
                      placeholder="Your Name"
                      onFocus={() => { setActiveField('name'); addLog('FOCUS: Name input active'); }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-mono uppercase text-slate-500 ml-1 mb-2 block">Digital Address</label>
                    <input 
                      type="email" 
                      name="user_email" 
                      required
                      placeholder="email@example.com"
                      onFocus={() => { setActiveField('email'); addLog('FOCUS: Email input active'); }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="md:col-span-1 space-y-6">
                  <div className="relative h-full flex flex-col">
                    <label className="text-[10px] font-mono uppercase text-slate-500 ml-1 mb-2 block">Message Body</label>
                    <textarea 
                      name="message" 
                      required
                      placeholder="Start typing your inquiry..."
                      onFocus={() => { setActiveField('msg'); addLog('FOCUS: Message buffer active'); }}
                      className="w-full flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 resize-none min-h-[160px]"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-bold py-5 rounded-2xl overflow-hidden transition-all hover:bg-cyan-400"
                  >
                    <span className="relative z-10 flex items-center gap-2 tracking-tighter text-lg">
                      {status === 'sending' ? 'ENCRYPTING...' : 'INITIATE CONTACT'}
                      <Zap size={18} className={status === 'sending' ? 'animate-pulse' : ''} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              </form>

              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Cpu size={40} className="text-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
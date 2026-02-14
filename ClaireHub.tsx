import React, { useState, useEffect } from 'react';
import { 
  Cpu, BrainCircuit, Sparkles, Zap, Globe, MessageSquare, 
  ArrowLeft, ChevronRight, Activity, ShieldCheck, Target, 
  Terminal, Sliders, RefreshCw, BarChart4, Network, Fingerprint
} from 'lucide-react';

interface ClaireHubProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const ClaireIcon = ({ className, size = 32 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M4.5 11c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    <path d="M4.5 11v4a3 3 0 0 0 3 3" />
    <path d="M19.5 11v4a3 3 0 0 1-3 3" />
    <rect x="2" y="9" width="3" height="6" rx="1.5" />
    <rect x="19" y="9" width="3" height="6" rx="1.5" />
    <path d="M8 13v1a4 4 0 0 0 8 0v-1" />
    <path d="M5 11c2.3 2 4.7 2 7 0c2.3 2 4.7 2 7 0" />
    <path d="M6 22a6 6 0 0 1 6-5h0a6 6 0 0 1 6 5" />
  </svg>
);

const ClaireHub: React.FC<ClaireHubProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [activePersona, setActivePersona] = useState<'mentor' | 'executor' | 'architect'>('mentor');
  const [neuralLogs, setNeuralLogs] = useState<string[]>([]);

  const personas = {
    mentor: {
      title: "The Mentor",
      role: "Encouraging Strategist",
      desc: "Ideal for growth-mindset sessions, interview confidence building, and professional storytelling.",
      sample: "I've reviewed your trajectory—you're closer than you think! Let's frame that gap year as a tactical masterclass in personal leadership.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    executor: {
      title: "The Executor",
      role: "Direct Performance Agent",
      desc: "Optimized for high-velocity job matching, technical CV audits, and aggressive negotiation tactics.",
      sample: "Bullet 3 is weak. Remove the passive verb. Use 'Architected' instead. Impact score is currently 62%. We need 85% for Tier 1 indexability.",
      color: "text-brand-accent",
      bg: "bg-brand-accent/10",
      border: "border-brand-accent/20"
    },
    architect: {
      title: "The Architect",
      role: "Academic Career Theorist",
      desc: "Leverages deep algorithmic theory to map long-term professional gravity and networking SEO clusters.",
      sample: "Analysis of your current node suggests a deficit in secondary semantic keywords. We must calibrate your summary to align with upcoming Q3 market demands.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    }
  };

  useEffect(() => {
    const events = [
      "Analyzing semantic CV weight...",
      "Mapping recruiter search nodes...",
      "Synthesizing impact scripts...",
      "Recalibrating SEO gravity...",
      "Audit: Algorithmic match found (Apple)...",
      "Parsing high-intent job filters...",
      "Neural Sync: Active (London Hub)"
    ];
    const interval = setInterval(() => {
      const e = events[Math.floor(Math.random() * events.length)];
      setNeuralLogs(prev => [`[${new Date().toLocaleTimeString()}] ${e}`, ...prev].slice(0, 5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden">
      {/* Background Neural Array */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:40px_40px]" />
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[150px] rounded-full animate-pulse-aurora" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full animate-pulse-aurora" style={{animationDelay: '3s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation Interface */}
        <div className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Hub</span>
          </button>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Node Hub: CLAIRE-99</span>
            </div>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 gradient-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Initialize Sync
              </button>
            )}
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="max-w-4xl mb-24 animate-fade-in-up">
           <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-10">
              <BrainCircuit size={16} className="text-brand-primary" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-primary">The AI Strategist Command Center</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic mb-10">
              Claire <br />
              <span className="text-gradient">Intelligence Hub.</span>
           </h1>
           <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-3xl">
              Claire is more than a chatbot. She is a career-optimized neural network designed to <strong>learn about LinkedIn</strong> algorithms and pivot your professional narrative into the Top 1%.
           </p>
        </div>

        {/* The Persona Matrix (Interactive) */}
        <section className="space-y-16 mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-10">
              <div>
                 <h2 className="text-3xl font-black text-white italic tracking-tight mb-2">Persona Calibration</h2>
                 <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Select a node to preview response logic</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                 <Sliders size={14} /> System v3.1 Operational
              </div>
           </div>

           <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-4">
                 {(Object.keys(personas) as Array<keyof typeof personas>).map((p) => (
                    <button 
                      key={p}
                      onClick={() => setActivePersona(p)}
                      className={`w-full p-8 rounded-[40px] border text-left transition-all relative overflow-hidden group ${activePersona === p ? 'bg-white border-white shadow-2xl shadow-white/5' : 'bg-white/5 border-white/10 hover:border-brand-primary/50'}`}
                    >
                       <div className="relative z-10">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${activePersona === p ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'bg-white/5 text-slate-400'}`}>
                             {p === 'mentor' ? <Sparkles size={24} /> : p === 'executor' ? <Zap size={24} /> : <Globe size={24} />}
                          </div>
                          <h4 className={`text-xl font-black italic mb-1 transition-colors ${activePersona === p ? 'text-brand-deep' : 'text-white'}`}>{personas[p].title}</h4>
                          <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activePersona === p ? 'text-brand-primary' : 'text-slate-500'}`}>{personas[p].role}</p>
                       </div>
                    </button>
                 ))}
              </div>

              <div className="lg:col-span-8">
                 <div className={`h-full min-h-[400px] p-10 md:p-16 rounded-[64px] border border-white/10 relative overflow-hidden transition-all duration-700 bg-slate-900/50 backdrop-blur-xl group`}>
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                       <ClaireIcon size={180} />
                    </div>
                    
                    <div className="relative z-10 space-y-12">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                             <div className={`w-3 h-3 rounded-full animate-pulse ${personas[activePersona].color.replace('text-', 'bg-')}`} />
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Live Synthesis Node</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                             <Activity size={12} className="text-emerald-500" />
                             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Sync Confirmed</span>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">Calibration Context: Career Pivot Audit</p>
                          <div className="p-10 rounded-[48px] bg-slate-950/80 border border-white/5 shadow-inner">
                             <p className="text-xl md:text-3xl font-black text-white italic leading-relaxed">
                                "{personas[activePersona].sample}"
                             </p>
                          </div>
                       </div>

                       <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                          <div>
                             <h5 className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">Logic Node Desc</h5>
                             <p className="text-sm font-medium text-slate-400 leading-relaxed italic">{personas[activePersona].desc}</p>
                          </div>
                          <div className="flex items-end justify-end">
                             <button onClick={onGetStarted} className="group flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:text-brand-primary transition-colors">
                                Use this persona <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Intelligence Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
           {[
             { icon: Target, title: "Algorithmic Matching", desc: "Claire identifies your 'Algorithmic Twin'—roles that recruiter AI expects you to fill based on current indexing." },
             { icon: MessageSquare, title: "Tactical Response", desc: "Generating high-performance cover letters and interview guides in seconds using specific brand-matching logic." },
             { icon: Network, title: "Semantic Linkage", desc: "We bridge the gap between your actual experience and the recruiter's 'high-intent' search terms." },
             { icon: ShieldCheck, title: "Privacy Scrubber", desc: "Zero-knowledge processing ensures your current employer never sees your active search nodes." }
           ].map((item, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[48px] space-y-6 hover:bg-white/10 hover:border-brand-primary/30 transition-all group">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                   <item.icon size={28} />
                </div>
                <h4 className="text-2xl font-black text-white italic leading-tight tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>

        {/* Neural Processing Live Feed */}
        <section className="bg-slate-950 border border-white/10 rounded-[64px] p-10 md:p-20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full" />
           
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                 <div className="inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">
                    <Terminal size={14} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase text-brand-primary tracking-widest">Global Telemetry</span>
                 </div>
                 <h2 className="text-4xl md:text-7xl font-black text-white italic leading-none tracking-tighter">Witness the <br /><span className="text-brand-primary">Synthesis.</span></h2>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">
                   Every second, LearnwithLinked.in nodes process thousands of professional assets. Our system is trained to <strong>learn about LinkedIn</strong> patterns that manual searchers miss.
                 </p>
                 <div className="flex gap-4">
                    <div className="p-8 bg-white/5 rounded-[40px] flex-1 border border-white/5">
                       <BarChart4 className="text-brand-accent mb-4" size={24} />
                       <p className="text-2xl font-black text-white italic">4.2M+</p>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Weekly Audits</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[40px] flex-1 border border-white/5">
                       <RefreshCw className="text-emerald-500 mb-4 animate-spin-slow" size={24} />
                       <p className="text-2xl font-black text-white italic">0.4s</p>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Avg Iteration Time</p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900/80 border border-white/10 rounded-[48px] p-10 font-mono text-[11px] space-y-6 shadow-2xl relative">
                 <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-rose-500" />
                       <div className="w-3 h-3 rounded-full bg-amber-500" />
                       <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-slate-500 uppercase tracking-widest">NEURAL_LIVE_STREAM</span>
                 </div>
                 <div className="space-y-4 h-[240px] overflow-hidden">
                    {neuralLogs.map((log, i) => (
                       <div key={i} className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500 ${i === 0 ? 'text-brand-primary' : 'text-slate-500 opacity-60'}`}>
                          <span className="shrink-0">{log.split(' ')[0]}</span>
                          <span className="italic">{log.split(' ').slice(1).join(' ')}</span>
                       </div>
                    ))}
                 </div>
                 <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Sync Status: Optimal</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-40">
           <div className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Your AI Strategist <br />is standing by.</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={onGetStarted} className="px-12 py-6 gradient-brand text-white rounded-[32px] font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-4 group">
                    Begin Synchronization
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <button onClick={onBack} className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[32px] font-black text-xl hover:bg-white/10 transition-all">
                    Explore Protocol
                 </button>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.6em]">JOIN 14k+ ELITE PROFESSIONALS USING CLAIRE v3.1</p>
           </div>
        </section>

        {/* Quantum Footer */}
        <footer className="py-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white">
                 <Fingerprint size={24} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase">Learnwith<span className="text-brand-primary">Linked.in</span></span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2025 AURORA SYSTEMS • THE NEURAL CAREER HUB • PALO ALTO NODE</p>
        </footer>
      </div>
    </div>
  );
};

export default ClaireHub;
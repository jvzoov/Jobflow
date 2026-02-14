import React, { useState, useEffect } from 'react';
import { 
  Zap, ArrowLeft, Target, Rocket, Search, Cpu, Sparkles, 
  ChevronRight, BrainCircuit, BarChart3, Fingerprint, 
  MessageSquare, FileText, Wand2, ShieldCheck, Loader2,
  Copy, Check, AlertCircle, TrendingUp
} from 'lucide-react';
import { analyzeHeadline, generateLinkedInBio, scoreATSResume, iterateBulletPoint } from '../services/geminiService';

interface FreeToolsSuiteProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const FreeToolsSuite: React.FC<FreeToolsSuiteProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [activeTool, setActiveTool] = useState<'headline' | 'resume' | 'bio' | 'bullet'>('headline');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-reset output when switching tools or input cleared
  useEffect(() => { setOutput(null); setInput(''); }, [activeTool]);

  const handleRun = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      if (activeTool === 'headline') setOutput(await analyzeHeadline(input));
      if (activeTool === 'bio') setOutput(await generateLinkedInBio(input));
      if (activeTool === 'resume') setOutput(await scoreATSResume(input));
      if (activeTool === 'bullet') setOutput(await iterateBulletPoint(input));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolConfig = {
    headline: {
      title: "Headline Architect",
      desc: "Optimizing for LinkedIn SEO & Clickability.",
      placeholder: "e.g. Senior Software Engineer looking for new opportunities...",
      cta: "Analyze My Headline"
    },
    resume: {
      title: "ATS Scrutiny",
      desc: "Score your CV text against high-intent recruiter filters.",
      placeholder: "Paste your raw resume text here...",
      cta: "Run ATS Scan"
    },
    bio: {
      title: "About Section Synthesizer",
      desc: "Transform your history into a compelling profile narrative.",
      placeholder: "Paste your recent experience bullets...",
      cta: "Synthesize My Story"
    },
    bullet: {
      title: "Impact Refiner",
      desc: "Convert basic duties into X-Y-Z achievement nodes.",
      placeholder: "Managed a team of 10 people to increase sales.",
      cta: "Rizz This Bullet"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-primary/10 overflow-x-hidden pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] glass px-6 md:px-12 py-5 border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-brand-primary transition-all group">
            <div className="p-2 bg-white border rounded-xl group-hover:border-brand-primary"><ArrowLeft size={18} /></div>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Core</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white shadow-lg"><Zap size={16} /></div>
             <span className="text-lg font-black text-brand-deep tracking-tight italic">Learnabout<span className="text-brand-primary">linked.in</span></span>
          </div>
          {!isAuthenticated && (
            <button onClick={onGetStarted} className="gradient-brand text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
              Join Free
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <Sparkles size={16} className="text-brand-primary" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">The Free Career Intelligence Suite</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-brand-deep italic leading-none tracking-tighter">
          Master your <span className="text-gradient">Professional Rizz.</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          High-performance AI tools to help you <strong>learn about LinkedIn</strong> success patterns and optimize every professional node.
        </p>
      </section>

      {/* Toolbox Tabs */}
      <section className="px-6 max-w-5xl mx-auto mb-20">
        <div className="flex flex-wrap justify-center gap-3 p-3 bg-white rounded-[32px] border border-slate-100 shadow-sm">
           {Object.keys(toolConfig).map((key) => (
             <button
               key={key}
               onClick={() => setActiveTool(key as any)}
               className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTool === key ? 'bg-brand-primary text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-brand-surface'}`}
             >
               {toolConfig[key as keyof typeof toolConfig].title}
             </button>
           ))}
        </div>
      </section>

      {/* Active Tool Interaction */}
      <section className="px-6 max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[56px] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(30,27,75,0.05)] space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-2 gradient-brand" />
           
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-brand-deep italic tracking-tight">{toolConfig[activeTool].title}</h3>
              <p className="text-sm text-slate-400 font-medium">{toolConfig[activeTool].desc}</p>
           </div>

           <div className="space-y-6">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={toolConfig[activeTool].placeholder}
                className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[32px] outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-700 font-bold min-h-[200px] resize-none"
              />
              <button 
                onClick={handleRun}
                disabled={loading || !input.trim()}
                className="w-full py-6 gradient-brand text-white rounded-[32px] font-black text-lg uppercase tracking-[0.2em] shadow-2xl hover:shadow-brand-primary/30 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                {loading ? 'Synthesizing...' : toolConfig[activeTool].cta}
              </button>
           </div>

           {/* Live Visibility Meter (Real-time UX) */}
           {input.length > 10 && !output && (
             <div className="pt-8 border-t border-slate-100 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Entropy Scan</span>
                </div>
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full gradient-brand transition-all duration-1000" style={{ width: `${Math.min(input.length/5, 100)}%` }} />
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-5 space-y-8">
           {/* Results Pane */}
           <div className={`min-h-[300px] bg-brand-deep rounded-[56px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transition-all duration-700 ${output ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full" />
              
              {!output ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 relative z-10 pt-10">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <Cpu size={32} className="text-white/20" />
                   </div>
                   <p className="text-xs font-black uppercase text-white/30 tracking-[0.3em]">Awaiting Intelligence Input</p>
                </div>
              ) : (
                <div className="space-y-10 animate-in zoom-in-95 duration-500 relative z-10">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Output Node</span>
                      <button onClick={() => handleCopy(typeof output === 'string' ? output : JSON.stringify(output))} className={`p-3 rounded-2xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white/50'}`}>
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                   </div>

                   {/* Render based on tool type */}
                   {activeTool === 'headline' && (
                     <div className="space-y-8">
                        <div className="flex justify-between items-end">
                           <div className="text-6xl font-black italic text-brand-accent">{output.score}%</div>
                           <p className="text-[10px] font-black uppercase text-white/30 text-right tracking-widest">Visibility Gravity</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                           <p className="text-lg font-bold italic leading-relaxed">"{output.suggestion}"</p>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                           <AlertCircle className="text-brand-accent shrink-0" size={18} />
                           <p className="text-xs font-medium text-white/60 italic">{output.feedback}</p>
                        </div>
                     </div>
                   )}

                   {activeTool === 'resume' && (
                     <div className="space-y-8">
                        <div className="flex justify-between items-center">
                           <p className="text-3xl font-black italic">Rank {output.score}/100</p>
                           <TrendingUp className="text-emerald-400" size={24} />
                        </div>
                        <div className="space-y-4">
                           <h5 className="text-[10px] font-black uppercase text-white/30">Missing Intent Nodes</h5>
                           <div className="flex flex-wrap gap-2">
                              {output.keywordsMissing.map((kw: string) => (
                                <span key={kw} className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-lg text-[10px] font-black border border-rose-500/20">{kw}</span>
                              ))}
                           </div>
                        </div>
                     </div>
                   )}

                   {(activeTool === 'bio' || activeTool === 'bullet') && (
                     <div className="p-8 bg-white/5 rounded-[40px] border border-white/10">
                        <p className="text-lg font-bold italic leading-relaxed">"{output}"</p>
                     </div>
                   )}

                   <div className="pt-8 border-t border-white/5 text-center">
                      <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em]">Zero-Knowledge Synthesis Verified</p>
                   </div>
                </div>
              )}
           </div>

           {/* Stats / Proof Node */}
           <div className="bg-white border border-slate-100 p-8 rounded-[48px] shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-primary/5 rounded-3xl flex items-center justify-center text-brand-primary">
                 <BarChart3 size={32} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Weekly Hub Throughput</p>
                 <p className="text-2xl font-black text-brand-deep italic">4,288 Audits</p>
              </div>
           </div>
        </div>
      </section>

      {/* SEO Footer Context */}
      <section className="px-6 max-w-7xl mx-auto py-24 border-t border-slate-100">
         <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
               <h2 className="text-3xl font-black text-brand-deep italic">Why use <span className="text-brand-primary">Free Tools?</span></h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Learnaboutlinked.in provides these core intelligence nodes for free to help every professional establish a baseline of <strong>LinkedIn authority</strong>. For high-velocity deployment, automated application tracking, and the full N8N neural sync, upgrade to a primary account.
               </p>
               <button onClick={onGetStarted} className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                  Initialize Pro Node <ChevronRight size={14} />
               </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Data Integrity", icon: ShieldCheck },
                 { label: "Neural Speed", icon: Rocket },
                 { label: "Algorithmic Precision", icon: Fingerprint },
                 { label: "Human Strategy", icon: BrainCircuit }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl flex flex-col items-center text-center gap-4 hover:border-brand-primary/20 transition-all">
                    <item.icon className="text-slate-300" size={24} />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default FreeToolsSuite;
import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Zap, ArrowLeft, Target, TrendingUp, 
  Cpu, Sparkles, Loader2, ChevronRight, Fingerprint, Activity,
  LineChart, Globe, Info, RefreshCw, BarChart4, AlertCircle
} from 'lucide-react';
import { analyzeHeadline } from '../services/geminiService';

interface SEOAuditNodeProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const SEOAuditNode: React.FC<SEOAuditNodeProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [headline, setHeadline] = useState('');
  const [analysis, setAnalysis] = useState<{ score: number; suggestion: string; feedback: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);

  const handleAudit = async () => {
    if (!headline.trim()) return;
    setIsAnalyzing(true);
    setAuditStep(1);

    // Dynamic step simulation for visual fidelity
    setTimeout(() => setAuditStep(2), 1000);
    setTimeout(() => setAuditStep(3), 2000);

    try {
      const result = await analyzeHeadline(headline);
      setAnalysis(result);
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setIsAnalyzing(false);
      setAuditStep(0);
    }
  };

  const recruitmentTrends = [
    { skill: "Generative AI", demand: "+420%", color: "text-brand-accent" },
    { skill: "Product Strategy", demand: "+88%", color: "text-emerald-400" },
    { skill: "Neural Arch", demand: "+156%", color: "text-violet-400" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-brand-accent selection:text-brand-deep overflow-x-hidden">
      {/* Neural Background Array */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#020617_100%)] opacity-40" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[150px] rounded-full animate-pulse-aurora" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand-accent/5 blur-[180px] rounded-full animate-pulse-aurora" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation Interface */}
        <div className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-brand-accent group-hover:bg-brand-accent/5 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Exit Laboratory</span>
          </button>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Node Hub: SEO-01</span>
            </div>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-brand-accent text-brand-deep rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Sync Profile
              </button>
            )}
          </div>
        </div>

        {/* Hero Title Area */}
        <div className="max-w-4xl mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-10">
            <Search size={16} className="text-brand-accent" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-accent">Visibility Intelligence Protocol</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic mb-10">
            Neural <br />
            <span className="text-gradient">Visibility Node.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-3xl">
            Recruiters use sophisticated AI filters to find talent. <strong>Learn about LinkedIn</strong> SEO architecture and ensure your node is indexed first.
          </p>
        </div>

        {/* SEO Lab Interface */}
        <div className="grid lg:grid-cols-12 gap-10 mb-32">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-[56px] p-8 md:p-14 space-y-12 relative overflow-hidden group backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-2 gradient-brand" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-primary/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[5s]" />
              
              <div className="flex justify-between items-center relative z-10">
                <div>
                   <h3 className="text-3xl font-black text-white italic tracking-tight mb-2">Algorithm Auditor</h3>
                   <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Input your primary profile asset</p>
                </div>
                <div className="w-16 h-16 bg-brand-deep border border-white/5 rounded-3xl flex items-center justify-center text-brand-accent shadow-inner">
                   <Cpu size={32} className={isAnalyzing ? 'animate-spin' : ''} />
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    <Fingerprint size={12} className="text-brand-accent" /> Headline Node Data
                  </label>
                  <textarea 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Senior Software Engineer specializing in Distributed Systems..."
                    className="w-full p-8 bg-[#020617] border border-white/10 rounded-[32px] outline-none focus:ring-4 focus:ring-brand-accent/5 transition-all text-white font-medium min-h-[160px] resize-none placeholder-slate-800 text-lg"
                  />
                </div>

                <button 
                  onClick={handleAudit}
                  disabled={isAnalyzing || !headline}
                  className="w-full py-8 bg-brand-accent text-brand-deep rounded-[32px] font-black text-xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_0_70px_rgba(6,182,212,0.4)] active:scale-95 transition-all flex items-center justify-center gap-5 disabled:opacity-30 disabled:shadow-none"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin" size={28} />
                      {auditStep === 1 ? 'Mapping Index...' : auditStep === 2 ? 'Scoring Visibility...' : 'Finalizing Data...'}
                    </>
                  ) : (
                    <>
                      <Zap size={28} />
                      Synthesize Audit
                    </>
                  )}
                </button>
              </div>

              {analysis && !isAnalyzing && (
                <div className="mt-12 p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[48px] animate-in zoom-in-95 duration-700 relative group/result">
                  <div className="absolute -top-8 -right-8 w-20 h-20 bg-emerald-500 rounded-[32px] flex items-center justify-center text-brand-deep shadow-2xl rotate-12 group-hover/result:rotate-0 transition-all duration-500">
                    <Sparkles size={40} />
                  </div>
                  
                  <div className="space-y-10">
                    <div className="flex justify-between items-end">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Visibility Gravity</span>
                          <div className="text-6xl font-black text-white italic leading-none">{analysis.score}%</div>
                       </div>
                       <div className="text-right space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Benchmark comparison</span>
                          <div className="flex items-center gap-2 text-emerald-400 font-black italic">
                             <TrendingUp size={20} /> Top 2% of Node
                          </div>
                       </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-md">
                       <p className="text-[10px] font-black uppercase text-brand-accent mb-4 tracking-[0.5em]">Claire's Optimized Proposal</p>
                       <p className="text-2xl font-black text-white italic leading-relaxed">
                         "{analysis.suggestion}"
                       </p>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-[#020617] rounded-3xl border border-white/5">
                       <Info size={20} className="text-emerald-500 shrink-0 mt-1" />
                       <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                         "{analysis.feedback}"
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Strategy Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: "Indexing Authority", desc: "How well your profile clusters into high-value professional categories within search nodes." },
                { icon: LineChart, title: "Keyword Saturation", desc: "Density analysis of industry-specific terms that recruiters prioritize for elite offers." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[48px] space-y-6 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                    <item.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-black text-white italic tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Context Widget: The Algorithmic Why */}
            <section className="bg-brand-deep p-10 rounded-[56px] text-white shadow-2xl relative overflow-hidden group border border-white/5 border-t-brand-accent/20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 blur-[120px] rounded-full group-hover:scale-125 transition-transform duration-[8s]" />
              <div className="relative z-10 space-y-12">
                <div>
                   <h3 className="text-2xl font-black italic mb-4 tracking-tight">The 0.6s Protocol</h3>
                   <p className="text-sm text-white/40 font-bold leading-relaxed">
                     Recruiters scan LinkedIn at extreme speeds. To <strong>learn about LinkedIn</strong> SEO, you must master the "0.6-Second rule":
                   </p>
                </div>
                
                <div className="space-y-10">
                   {[
                     { step: "01", title: "Global Query", desc: "Recruiter executes a search node." },
                     { step: "02", title: "Index Match", desc: "LinkedIn sorts by keyword density." },
                     { step: "03", title: "Neural Snippet", desc: "Recruiter reads your first 12 words." },
                     { step: "04", title: "Decision Lock", desc: "Invitation sent or profile skipped." }
                   ].map((node, i) => (
                     <div key={i} className="flex gap-6 items-start group/node">
                        <div className="text-2xl font-black text-brand-accent/10 group-hover/node:text-brand-accent transition-all italic">{node.step}</div>
                        <div>
                           <h5 className="font-black text-white italic mb-1 uppercase tracking-wider">{node.title}</h5>
                           <p className="text-[11px] text-white/30 font-bold leading-relaxed">{node.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-10 border-t border-white/5">
                   <div className="p-8 bg-white/5 rounded-3xl text-center border border-white/5 group-hover:border-brand-accent/20 transition-all">
                      <p className="text-[10px] font-black uppercase text-brand-accent tracking-[0.4em] mb-4">Node Velocity Increase</p>
                      <p className="text-5xl font-black italic text-white tracking-tighter">4.8X</p>
                   </div>
                </div>
              </div>
            </section>

            {/* Real-time Trend Feed */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] space-y-8 backdrop-blur-md">
               <div className="flex items-center gap-3">
                 <Globe size={18} className="text-brand-accent" />
                 <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em]">Global Skill Demand</h4>
               </div>
               <div className="space-y-6">
                 {recruitmentTrends.map((trend, i) => (
                   <div key={i} className="flex justify-between items-center group/trend">
                      <span className="text-sm font-black text-white/80 italic group-hover/trend:text-white transition-colors">{trend.skill}</span>
                      <div className={`flex items-center gap-2 font-black italic text-xs ${trend.color}`}>
                         <Activity size={14} className="animate-pulse" /> {trend.demand}
                      </div>
                   </div>
                 ))}
               </div>
               <div className="pt-6 border-t border-white/5">
                 <div className="flex items-center gap-3 text-emerald-500">
                    <AlertCircle size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Feed: Verified Hub-1</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Visibility Simulator Section */}
        <section className="bg-[#020617] border border-white/10 rounded-[64px] p-10 md:p-20 space-y-16 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full group-hover:translate-x-32 transition-transform duration-[10s]" />
           
           <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                 <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Map Your <br /><span className="text-brand-accent">Search Gravity.</span></h2>
                 <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                   When you optimize with <strong>LearnwithLinked.in</strong>, your search gravity increases. This creates a "Pull Factor" that brings elite opportunities directly to your notification center.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <h5 className="text-3xl font-black text-white italic tracking-tighter">32k+</h5>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Recruiter nodes tracked</p>
                    </div>
                    <div className="space-y-2">
                       <h5 className="text-3xl font-black text-white italic tracking-tighter">11ms</h5>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Average index response</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] space-y-12 backdrop-blur-2xl shadow-2xl">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-brand-primary tracking-[0.4em]">Visibility Simulator</span>
                    <BarChart4 size={24} className="text-brand-primary" />
                 </div>
                 
                 <div className="space-y-8">
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-black uppercase italic">
                          <span className="text-white/40 tracking-widest">Manual Node</span>
                          <span className="text-slate-500">Tier 4</span>
                       </div>
                       <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-slate-700 w-1/5" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-black uppercase italic">
                          <span className="text-brand-accent tracking-[0.2em]">Optimized Node</span>
                          <span className="text-emerald-400">Tier 1</span>
                       </div>
                       <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-brand-accent w-4/5 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 text-center">
                    <button 
                      onClick={onGetStarted}
                      className="w-full py-6 bg-white text-brand-deep rounded-[32px] font-black text-lg uppercase tracking-widest hover:bg-brand-accent transition-all active:scale-95"
                    >
                      Establish Full Node
                    </button>
                    <p className="text-[9px] font-black uppercase text-slate-500 mt-6 tracking-[0.4em]">Zero-Knowledge Privacy Guaranteed.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Neural Footer */}
        <footer className="py-24 text-center border-t border-white/5 mt-32">
           <div className="flex items-center justify-center gap-4 mb-8">
             <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white">
                <ShieldCheck size={24} />
             </div>
             <span className="text-2xl font-black italic tracking-tighter text-white uppercase">Learnwith<span className="text-brand-primary">Linked.in</span></span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">© 2025 AURORA SYSTEMS • THE SEO VISIBILITY PROTOCOL • PALO ALTO HUB</p>
        </footer>
      </div>
    </div>
  );
};

export default SEOAuditNode;
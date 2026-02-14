import React, { useState } from 'react';
import { 
  Dna, Sparkles, ArrowLeft, Zap, Target, TrendingUp, Search, 
  ChevronRight, BrainCircuit, Rocket, Activity, BarChart3, 
  Layout, Cpu, CheckCircle2, Loader2, ArrowRight
} from 'lucide-react';
import { iterateBulletPoint } from '../services/geminiService';

interface CVEvolutionProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const CVEvolution: React.FC<CVEvolutionProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [inputBullet, setInputBullet] = useState('');
  const [evolvedBullet, setEvolvedBullet] = useState<string | null>(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionStage, setEvolutionStage] = useState(0);

  const handleEvolve = async () => {
    if (!inputBullet.trim()) return;
    
    setIsEvolving(true);
    setEvolutionStage(1);
    
    // Simulate stages for visual effect
    setTimeout(() => setEvolutionStage(2), 800);
    setTimeout(() => setEvolutionStage(3), 1600);

    try {
      const result = await iterateBulletPoint(inputBullet);
      setEvolvedBullet(result);
    } catch (error) {
      console.error("Evolution failed", error);
    } finally {
      setIsEvolving(false);
      setEvolutionStage(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-brand-accent selection:text-brand-deep overflow-x-hidden">
      {/* Aurora Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/10 blur-[180px] rounded-full animate-pulse-aurora" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 blur-[150px] rounded-full animate-pulse-aurora" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-brand-accent transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Back to Hub</span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Protocol v3.1</span>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 gradient-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Start Evolving
              </button>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8">
            <Dna size={16} className="text-brand-accent animate-spin-slow" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-accent">Neural Asset Metamorphosis</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic mb-10">
            Professional <br />
            <span className="text-gradient">Evolution.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-2xl">
            Static CVs belong in the past. Witness how to <strong>learn about LinkedIn</strong> algorithms through iterative, data-backed career asset evolution.
          </p>
        </div>

        {/* The Evolution Lab (Interactive) */}
        <section className="grid lg:grid-cols-12 gap-10 mb-32">
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 md:p-12 space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 gradient-brand" />
              
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-white italic tracking-tight">The Mutation Lab</h3>
                <div className="p-3 bg-white/5 rounded-2xl text-brand-accent shadow-inner">
                  <Cpu size={24} className={isEvolving ? 'animate-spin' : ''} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3">Static Input (Basic Bullet)</label>
                  <textarea 
                    value={inputBullet}
                    onChange={(e) => setInputBullet(e.target.value)}
                    placeholder="e.g. Managed a team of 10 people and did sales."
                    className="w-full p-8 bg-slate-900 border border-white/5 rounded-[32px] outline-none focus:ring-4 focus:ring-brand-accent/5 transition-all text-white font-medium min-h-[140px] resize-none placeholder-slate-700"
                  />
                </div>

                <button 
                  onClick={handleEvolve}
                  disabled={isEvolving || !inputBullet}
                  className="w-full py-6 gradient-brand text-white rounded-[32px] font-black text-xl uppercase tracking-[0.2em] shadow-2xl hover:shadow-brand-primary/40 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                >
                  {isEvolving ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      {evolutionStage === 1 ? 'Mapping Context...' : evolutionStage === 2 ? 'Synthesizing Impact...' : 'Finalizing Meta...'}
                    </>
                  ) : (
                    <>
                      <Zap size={24} />
                      Evolve Narrative
                    </>
                  )}
                </button>
              </div>

              {evolvedBullet && !isEvolving && (
                <div className="mt-10 p-10 bg-brand-accent/10 border-4 border-dashed border-brand-accent/20 rounded-[40px] animate-in zoom-in-95 duration-500 relative">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-deep rounded-3xl flex items-center justify-center text-brand-accent shadow-2xl rotate-12 border border-brand-accent/30">
                    <Sparkles size={32} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Evolved Output</span>
                       <div className="flex items-center gap-2 text-emerald-400">
                          <Activity size={12} className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">+88% Impact Score</span>
                       </div>
                    </div>
                    <p className="text-xl md:text-2xl font-black text-white italic leading-relaxed">
                      "{evolvedBullet}"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Core Methodology Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: "Impact Density", desc: "We convert passive duties into outcome-driven scripts that trigger LinkedIn's high-intent filters." },
                { icon: Search, title: "Keyword Indexing", desc: "Claire maps your assets against current market demand for your specific professional node." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[40px] space-y-4 hover:border-brand-primary transition-colors">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl font-black text-white italic">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            {/* Context Widget: How to Learn */}
            <section className="bg-brand-deep p-10 rounded-[56px] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-[5s]" />
              <div className="relative z-10 space-y-10">
                <div>
                   <h3 className="text-2xl font-black italic mb-4 tracking-tight">The Evolution Path</h3>
                   <p className="text-sm text-white/40 font-medium leading-relaxed">
                     Success is a repeatable formula. To truly <strong>learn about LinkedIn</strong>, you must master the iterative loop:
                   </p>
                </div>
                
                <div className="space-y-8">
                   {[
                     { step: "01", title: "Establish Baseline", desc: "Import your current CV node." },
                     { step: "02", title: "Claire Audit", desc: "Identify low-velocity phrases." },
                     { step: "03", title: "Neural Synthesis", desc: "Iterate with impact-first logic." },
                     { step: "04", title: "Market Sync", desc: "Export and dominate searches." }
                   ].map((node, i) => (
                     <div key={i} className="flex gap-6 items-start group/node">
                        <div className="text-2xl font-black text-brand-accent/20 group-hover/node:text-brand-accent transition-colors italic">{node.step}</div>
                        <div>
                           <h5 className="font-bold text-white mb-1">{node.title}</h5>
                           <p className="text-xs text-white/30 font-medium">{node.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-white/5">
                   <div className="p-6 bg-white/5 rounded-3xl text-center">
                      <p className="text-[10px] font-black uppercase text-brand-accent tracking-[0.4em] mb-2">Theoretical Velocity gain</p>
                      <p className="text-4xl font-black italic">+340%</p>
                   </div>
                </div>
              </div>
            </section>

            {/* Statistics Node */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] flex flex-col items-center text-center space-y-6">
               <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <TrendingUp size={40} />
               </div>
               <h4 className="text-xl font-black text-white italic">Algorithmic Advantage</h4>
               <p className="text-xs font-bold leading-relaxed text-slate-500 px-4">
                 Our system identified that "evolved" bullets receive 3.4x more engagement from human recruiters than standard descriptions.
               </p>
               <div className="flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                 <CheckCircle2 size={16} /> Verified Node Activity
               </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="space-y-16 mb-32">
           <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white italic mb-6">Real-World <span className="text-brand-accent">Synthesis.</span></h2>
              <p className="text-slate-500 font-medium">Behold the transformation of a Senior Product Manager node from basic to high-performance.</p>
           </div>

           <div className="grid md:grid-cols-2 gap-0 border border-white/10 rounded-[64px] overflow-hidden shadow-2xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                 <div className="w-16 h-16 bg-slate-950 border border-white/10 rounded-full flex items-center justify-center text-brand-accent shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <ArrowRight size={32} />
                 </div>
              </div>

              <div className="bg-white/5 p-12 md:p-20 space-y-10 relative">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Static CV (Base)</span>
                 </div>
                 <div className="space-y-8 opacity-40 grayscale">
                    <div className="space-y-3">
                       <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
                       <div className="h-4 w-full bg-slate-800 rounded-lg" />
                       <div className="h-4 w-5/6 bg-slate-800 rounded-lg" />
                    </div>
                    <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                       <p className="text-sm font-medium italic">"Responsible for launching new features and managing the product roadmap. Worked with engineering teams."</p>
                    </div>
                 </div>
              </div>

              <div className="bg-brand-deep p-12 md:p-20 space-y-10 border-l border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-brand-primary/5 blur-3xl" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                       <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Evolved CV (Neural)</span>
                    </div>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <div className="h-6 w-3/4 bg-brand-primary/20 rounded-lg" />
                          <div className="h-4 w-full bg-brand-primary/10 rounded-lg" />
                          <div className="h-4 w-5/6 bg-brand-primary/10 rounded-lg" />
                       </div>
                       <div className="p-8 bg-brand-primary/10 rounded-3xl border border-brand-primary/20 shadow-xl shadow-brand-primary/5">
                          <p className="text-lg md:text-xl font-black text-white italic">"Accelerated user adoption by 140% by architecting a data-driven feature evolution roadmap and leading a cross-functional squad of 15 engineers."</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center py-20 bg-white/5 border border-white/10 rounded-[64px] relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10 space-y-10 px-8">
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Ready to evolve <br />your professional node?</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button 
                  onClick={onGetStarted}
                  className="px-12 py-6 gradient-brand text-white rounded-[32px] font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                 >
                    Initialize Account
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <button 
                  onClick={onBack}
                  className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[32px] font-black text-xl hover:bg-white/10 transition-all active:scale-95"
                 >
                    Explore Protocol
                 </button>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.5em]">Join 14,000+ Professionals in the Evolution Hub.</p>
           </div>
        </section>
      </div>

      {/* Modern Footer Mini */}
      <footer className="py-20 border-t border-white/5 text-center">
         <div className="flex items-center justify-center gap-3 mb-6">
           <div className="w-8 h-8 gradient-brand rounded-lg" />
           <span className="text-lg font-black italic tracking-tighter text-white uppercase">Learnwith<span className="text-brand-primary">Linked.in</span></span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">© 2025 AURORA SYSTEMS • THE NEURAL CAREER PROTOCOL</p>
      </footer>
    </div>
  );
};

export default CVEvolution;
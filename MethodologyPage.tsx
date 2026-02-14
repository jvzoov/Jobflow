import React from 'react';
import { 
  Workflow, 
  Target, 
  Zap, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  Cpu, 
  BrainCircuit,
  Eye,
  BarChart4,
  Layers,
  Code2,
  MousePointer2,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface MethodologyPageProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const arkFramework = [
    {
      phase: "A",
      title: "Action Synthesis",
      desc: "We extract raw duties and convert them into aggressive, intent-driven neural signatures. 'Managed team' becomes 'Architected high-velocity cross-functional squads'.",
      color: "text-violet-600",
      bg: "bg-violet-50"
    },
    {
      phase: "R",
      title: "Result Quantization",
      desc: "Every node must have a metric weight. Claire scans your history for implied growth, identifying missing ROI markers that trigger executive-level filters.",
      color: "text-brand-accent",
      bg: "bg-cyan-50"
    },
    {
      phase: "K",
      title: "Keyword Stacking",
      desc: "We align your assets with 'High-Intent Clusters'. These are the exact phrases recruiters in your specific hub use when setting up LinkedIn search nodes.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  const protocolSteps = [
    { id: "01", title: "Asset Ingestion", desc: "Sync your existing node via LinkedIn or PDF. Our parser breaks your history into raw metadata." },
    { id: "02", title: "Neural Scrutiny", desc: "Claire identifies 'Visibility Gaps'—areas where your profile logic fails to match market demand." },
    { id: "03", title: "Iterative Build", desc: "ARK Framework synthesis. We draft 3 versions of every bullet point for optimal algorithmic weight." },
    { id: "04", title: "Signal Launch", desc: "Deploy your optimized node. Our tracker monitors recruiter eye patterns and application velocity." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-primary/10 font-sans">
      {/* Elegant Nav */}
      <nav className="fixed top-0 w-full z-[100] glass px-6 md:px-12 py-5 border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-slate-500 hover:text-brand-primary transition-all group"
          >
            <div className="p-2 bg-white border rounded-xl group-hover:border-brand-primary">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Platform</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white shadow-lg">
                <Workflow size={16} />
             </div>
             <span className="text-lg font-black text-brand-deep tracking-tight italic">Learnabout<span className="text-brand-primary">linked.in</span></span>
          </div>
          {!isAuthenticated && (
            <button onClick={onGetStarted} className="gradient-brand text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
              Initialize Node
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
            <Sparkles size={16} className="text-brand-primary" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Learn about LinkedIn Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-brand-deep leading-[1] tracking-tighter italic">
            The Science of <br />
            <span className="text-gradient">Professional Velocity.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Stop guessing. Our methodology is built on 4,000+ audited recruiter nodes. Discover how to <strong>learn about LinkedIn</strong> algorithms through data-backed career iteration.
          </p>

          <div className="flex justify-center gap-4 pt-8">
             <button onClick={onGetStarted} className="px-10 py-6 gradient-brand text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-brand-primary/30 hover:scale-105 transition-all flex items-center gap-4 group">
               Apply Methodology
               <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
           <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full" />
           <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-brand-accent/5 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* The ARK Framework Interactive Grid */}
      <section className="py-24 md:py-40 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-brand-deep mb-8 italic tracking-tight">The ARK <span className="text-brand-primary">Framework.</span></h2>
             <p className="text-slate-500 font-medium leading-relaxed">
                The core of Learnaboutlinked.in. We transform your professional data points through three neural filters to ensure maximum recruiter indexing.
             </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {arkFramework.map((f, i) => (
              <div key={i} className="group p-12 rounded-[56px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-20 h-20 ${f.bg} ${f.color} rounded-[32px] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                   <span className="text-4xl font-black italic">{f.phase}</span>
                </div>
                <h3 className="text-2xl font-black text-brand-deep mb-4 italic uppercase tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 0.6s Protocol (Visual Demonstration) */}
      <section className="py-24 md:py-40 px-6 bg-brand-surface overflow-hidden">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="inline-flex items-center gap-3 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full">
                  <Eye size={16} className="text-rose-600" />
                  <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest">Recruiter Eye-Track Data</span>
               </div>
               <h2 className="text-4xl md:text-7xl font-black text-brand-deep italic leading-none tracking-tighter">The 0.6s <br /><span className="text-brand-primary">Protocol.</span></h2>
               <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Recruiters decide your future in under a second. To <strong>learn about LinkedIn</strong> success, you must master "Above the Fold" gravity. 
               </p>
               <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm shrink-0 border border-slate-100">
                        <Target size={24} />
                     </div>
                     <div>
                        <h4 className="font-black text-brand-deep italic text-xl mb-1 uppercase tracking-tight">The Hook Node</h4>
                        <p className="text-sm text-slate-400 font-medium">Your headline must serve a dual purpose: SEO indexing for the algorithm and intent-locking for the human recruiter.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm shrink-0 border border-slate-100">
                        <Layers size={24} />
                     </div>
                     <div>
                        <h4 className="font-black text-brand-deep italic text-xl mb-1 uppercase tracking-tight">Semantic Density</h4>
                        <p className="text-sm text-slate-400 font-medium">We stack high-value industry nodes within your summary to trigger "Recommended Match" status instantly.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="bg-white p-12 rounded-[64px] border border-slate-200 shadow-[0_50px_100px_-30px_rgba(30,27,75,0.1)] relative group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/5 blur-3xl rounded-full" />
                  
                  <div className="space-y-10 relative z-10">
                     <div className="flex justify-between items-center border-b pb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-100 rounded-full" />
                           <div className="space-y-2">
                              <div className="h-4 w-32 bg-slate-100 rounded" />
                              <div className="h-2 w-20 bg-slate-50 rounded" />
                           </div>
                        </div>
                        <div className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Simulation Node</div>
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-4">
                           <div className="flex justify-between text-[10px] font-black uppercase text-brand-primary tracking-widest">
                              <span>Headline Scan Intensity</span>
                              <span>98%</span>
                           </div>
                           <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                              <div className="h-full gradient-brand w-[98%] animate-pulse" />
                           </div>
                        </div>

                        <div className="p-8 bg-brand-surface rounded-[40px] border border-dashed border-brand-mint relative group/code">
                           <div className="absolute top-4 right-4">
                              <Code2 size={16} className="text-brand-primary opacity-20" />
                           </div>
                           <p className="text-xs font-mono text-slate-400 mb-6 leading-relaxed">// NEURAL_ITERATION_v3.1</p>
                           <p className="text-sm font-bold text-brand-deep leading-relaxed">
                              Accelerated <mark className="bg-brand-accent/20 px-1 rounded-sm">Market Expansion</mark> by 140% via <mark className="bg-brand-primary/10 px-1 rounded-sm text-brand-primary">Neural Stacking</mark> and high-velocity squad leadership across EMEA nodes.
                           </p>
                        </div>
                     </div>

                     <div className="pt-8 border-t flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <MousePointer2 size={20} className="text-brand-primary animate-bounce" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Target Decision Locked</span>
                        </div>
                        <span className="text-xs font-black italic text-emerald-500 uppercase tracking-tighter">Velocity: 0.4s</span>
                     </div>
                  </div>
               </div>
               
               {/* Floating Stat */}
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-2xl border border-slate-100 hidden md:flex items-center gap-6 group hover:scale-105 transition-transform">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner">
                     <BarChart4 size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Interview Velocity</p>
                     <p className="text-3xl font-black text-brand-deep italic">+310%</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* The 4-Phase Protocol Vertical Timeline */}
      <section className="py-24 md:py-40 px-6 bg-white">
         <div className="max-w-4xl mx-auto space-y-24">
            <div className="text-center">
               <h2 className="text-4xl md:text-6xl font-black text-brand-deep italic tracking-tight mb-8">The Lifecycle of <br /><span className="text-brand-primary">Career Sync.</span></h2>
               <p className="text-slate-500 font-medium">A repeatable methodology for modern professionals.</p>
            </div>

            <div className="space-y-12">
               {protocolSteps.map((step) => (
                  <div key={step.id} className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start relative">
                     <div className="md:w-32 shrink-0 pt-2">
                        <span className="text-6xl font-black italic text-slate-100 group-hover:text-brand-primary/10 transition-colors leading-none tracking-tighter">{step.id}</span>
                     </div>
                     <div className="flex-1 p-10 rounded-[48px] bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-2xl group-hover:border-brand-primary/20 transition-all duration-500">
                        <h4 className="text-2xl font-black text-brand-deep italic mb-3 uppercase tracking-tight">{step.title}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Evidence & ROI Section */}
      <section className="py-24 md:py-40 px-6 bg-brand-deep text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[150px] rounded-full animate-pulse-aurora" />
         <div className="max-w-7xl mx-auto relative z-10 text-center space-y-20">
            <div className="space-y-8 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter">Quantifiable <span className="text-brand-accent">Dominance.</span></h2>
               <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed">
                  We tracked 10,000 nodes using our methodology vs. traditional job seeking. The results confirm that to <strong>learn about LinkedIn</strong> success is to master the data cycle.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
               {[
                 { label: "Profile Reach", val: "+420%", sub: "Recruiter Appears" },
                 { label: "Offer Delta", val: "2.4X", sub: "Higher Initial Comp" },
                 { label: "Time-to-Hire", val: "-62%", sub: "Faster Deployment" }
               ].map((stat, i) => (
                 <div key={i} className="p-12 rounded-[56px] bg-white/5 border border-white/10 backdrop-blur-md space-y-6 group hover:border-brand-accent transition-all">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-accent">
                       <CheckCircle2 size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">{stat.label}</p>
                    <p className="text-6xl font-black italic tracking-tighter text-white group-hover:text-brand-accent transition-colors">{stat.val}</p>
                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{stat.sub}</p>
                 </div>
               ))}
            </div>

            <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-12">
               <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Node Sync: Optimal</span>
               </div>
               <div className="flex items-center gap-4">
                  <ShieldCheck className="text-brand-accent" size={20} />
                  <span className="text-xs font-black uppercase tracking-widest text-white/50">GDPR v2025 Compliant</span>
               </div>
            </div>
         </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-6 py-40">
         <div className="max-w-5xl mx-auto gradient-brand rounded-[64px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(124,58,237,0.4)]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full" />
            <div className="relative z-10 space-y-12">
               <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-tight">Apply the methodology <br />to your professional node.</h2>
               <p className="text-lg md:text-2xl text-white/70 font-medium max-w-xl mx-auto leading-relaxed">
                  Join 14,000+ professionals who mastered how to <strong>learn about LinkedIn</strong> and secure their future.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button onClick={onGetStarted} className="w-full sm:w-auto bg-white text-brand-primary px-12 py-7 rounded-3xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                     Initialize Account
                     <ChevronRight size={24} />
                  </button>
                  <button onClick={onBack} className="text-white/60 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors underline underline-offset-8">
                     Back to Platform
                  </button>
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">ZERO NOISE. 100% INTELLIGENCE. PALO ALTO HUB.</p>
            </div>
         </div>
      </section>

      {/* Modern Footer Mini */}
      <footer className="py-24 border-t border-slate-100 bg-white text-center">
         <div className="flex items-center justify-center gap-3 mb-8">
           <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Workflow size={24} />
           </div>
           <span className="text-2xl font-black italic tracking-tighter text-brand-deep uppercase leading-none">Learnabout<span className="text-brand-primary">linked.in</span></span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2025 AURORA SYSTEMS • THE NEURAL CAREER METHODOLOGY • VERIFIED v3.1</p>
      </footer>
    </div>
  );
};

export default MethodologyPage;
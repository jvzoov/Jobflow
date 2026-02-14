import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Sparkles, 
  Zap, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Target,
  Globe,
  Award,
  Linkedin,
  Search,
  Loader2,
  ShieldCheck,
  Rocket,
  BarChart4,
  Cpu,
  Star,
  CheckCircle2,
  Mail,
  Layers,
  ArrowUpRight,
  MousePointer2,
  Menu,
  X,
  FileText,
  Activity,
  Boxes
} from 'lucide-react';
import { analyzeHeadline } from '../services/geminiService';
import { ViewState } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate?: (view: ViewState) => void;
}

const LogoIcon = ({ className, size = 32 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7c3aed" />
        <stop offset="1" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="10" fill="url(#brandGrad)" />
    <path d="M12 28V12H15V25H28V28H12Z" fill="white" />
    <circle cx="28" cy="12" r="5" fill="#06b6d4" />
    <path d="M28 17L22 23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onNavigate }) => {
  const [headline, setHeadline] = useState('');
  const [analysis, setAnalysis] = useState<{ score: number; suggestion: string; feedback: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const avatarIds = [
    "1534528741775-53994a69daeb",
    "1507003211169-0a1dd7228f2d",
    "1494790108377-be9c29b29330"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnalyze = async () => {
    if (!headline.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeHeadline(headline);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const features = [
    {
      title: "AI CV Evolution",
      desc: "Turn passive resume bullets into high-performance achievement nodes that recruiters can't ignore.",
      icon: Layers,
      color: "text-violet-600",
      bg: "bg-violet-50",
      view: ViewState.CV_EVOLUTION
    },
    {
      title: "Recruiter SEO Audit",
      desc: "Quantify your visibility gravity. See exactly how top search algorithms index your profile.",
      icon: Search,
      color: "text-brand-accent",
      bg: "bg-cyan-50",
      view: ViewState.SEO_AUDIT
    },
    {
      title: "Claire AI Strategist",
      desc: "A personalized AI career agent that drafts cover letters and prepares you for high-stakes interviews.",
      icon: BrainCircuit,
      color: "text-rose-600",
      bg: "bg-rose-50",
      view: ViewState.CLAIRE_HUB
    }
  ];

  const steps = [
    { id: "01", title: "Establish Sync", desc: "Connect your LinkedIn data or upload your CV to establish your baseline node." },
    { id: "02", title: "Neural Scrutiny", desc: "Claire performs a deep audit, identifying missed keyword opportunities." },
    { id: "03", title: "Iterative Build", desc: "Draft high-impact professional assets tailored to elite recruiter filters." },
    { id: "04", title: "Launch Cycle", desc: "Track application velocity and secure higher offers with automated alerts." }
  ];

  const benefits = [
    { title: "3x More Interviews", desc: "Optimized profiles receive 240% higher recruiter engagement." },
    { title: "Save 20 Hours Weekly", desc: "Automate tracking and document preparation with AI-first logic." },
    { title: "Data Sovereignty", desc: "Your career data is encrypted and remains strictly under your control." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-primary/10">
      {/* Dynamic Header */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-5 ${scrolled ? 'glass py-4 shadow-sm border-b' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <LogoIcon size={36} />
            <div className="flex flex-col">
              <span className="text-xl font-black text-brand-deep tracking-tight leading-none italic">Learnabout</span>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">linked.in</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <button onClick={() => onNavigate?.(ViewState.TOOLS_HUB)} className="hover:text-brand-primary transition-all text-brand-primary">Free Tools</button>
            <button onClick={() => onNavigate?.(ViewState.PROCESS)} className="hover:text-brand-primary transition-all">Process</button>
            <button onClick={() => onNavigate?.(ViewState.AI_LAB)} className="hover:text-brand-primary transition-all">AI Lab</button>
            <button onClick={() => onNavigate?.(ViewState.METHODOLOGY)} className="hover:text-brand-primary transition-all">Methodology</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onGetStarted} className="hidden sm:block text-slate-600 font-bold text-xs uppercase tracking-widest hover:text-brand-primary">Sign In</button>
            <button onClick={onGetStarted} className="gradient-brand text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
              Sign Up Free
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full glass border-b p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-2">
            <button onClick={() => { onNavigate?.(ViewState.TOOLS_HUB); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-brand-primary text-left italic">Free Tools</button>
            <button onClick={() => { onNavigate?.(ViewState.PROCESS); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-brand-deep text-left">Process</button>
            <button onClick={() => { onNavigate?.(ViewState.AI_LAB); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-brand-deep text-left">AI Lab</button>
            <button onClick={() => { onNavigate?.(ViewState.METHODOLOGY); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-brand-deep text-left">Methodology</button>
            <hr />
            <button onClick={onGetStarted} className="py-4 gradient-brand text-white rounded-2xl font-bold uppercase tracking-widest">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 blur-[100px] rounded-full -ml-32 -mb-32" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full mb-10 border border-slate-200 shadow-sm">
              <Sparkles size={16} className="text-brand-primary" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Learn about LinkedIn Dominance</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-brand-deep leading-[1.1] mb-10 tracking-tight">
              Master the <br />Algorithm. <br />
              <span className="text-gradient italic">Learn about LinkedIn.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed max-w-xl font-medium">
              We built <strong>Learnaboutlinked.in</strong> to help high-performance professionals audit their visibility and secure Top 1% career opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button 
                onClick={onGetStarted}
                className="gradient-brand text-white px-10 py-6 rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-xl"
              >
                Join the Network
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => onNavigate?.(ViewState.TOOLS_HUB)} className="bg-white text-brand-primary border border-brand-primary px-10 py-6 rounded-3xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3">
                <Boxes size={20} /> Free AI Tools
              </button>
            </div>

            <div className="flex items-center gap-5">
               <div className="flex -space-x-4">
                  {avatarIds.map((id, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-lg bg-slate-200 overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=60&w=100`} className="w-full h-full object-cover" alt="User Avatar" />
                    </div>
                  ))}
               </div>
               <div className="text-sm font-bold text-slate-500">
                  <div className="flex gap-1 mb-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-amber-400 fill-current" />)}
                  </div>
                  Trusted by 14,000+ Professionals
               </div>
            </div>
          </div>

          {/* Interactive Demo Block */}
          <div className="relative animate-float">
             <div className="bg-white p-8 md:p-12 rounded-[56px] shadow-[0_40px_100px_-30px_rgba(30,27,75,0.1)] border border-white relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 gradient-brand" />
                
                <div className="flex justify-between items-center mb-10">
                   <div>
                      <span className="text-[10px] font-bold uppercase text-brand-primary tracking-widest mb-1 block italic">Live AI Audit Node</span>
                      <h3 className="text-2xl font-black text-brand-deep">Headline SEO Scanner</h3>
                   </div>
                   <div className="w-12 h-12 bg-brand-surface rounded-2xl flex items-center justify-center text-brand-primary shadow-inner">
                      <Cpu size={24} />
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Input Current Headline</label>
                      <textarea 
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="e.g. Senior Software Engineer at TechGlobal"
                        className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[28px] outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-sm font-bold min-h-[120px] resize-none"
                      />
                   </div>
                   
                   <button 
                     onClick={handleAnalyze}
                     disabled={isAnalyzing || !headline}
                     className="w-full py-5 gradient-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/10 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                   >
                     {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                     {isAnalyzing ? 'SYNTHESIZING...' : 'SCAN MY HEADLINE'}
                   </button>

                   {analysis && (
                     <div className="mt-8 p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 animate-in zoom-in-95 relative">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Visibility Score</span>
                           <span className="text-3xl font-black text-emerald-500 italic">{analysis.score}%</span>
                        </div>
                        <p className="text-slate-700 font-bold italic leading-relaxed">"{analysis.suggestion}"</p>
                     </div>
                   )}
                </div>
             </div>
             
             {/* Floating UI Elements */}
             <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                   <TrendingUp size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Weekly Reach</p>
                   <p className="text-lg font-black text-brand-deep">+420%</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tools Callout */}
      <section className="py-20 bg-brand-surface border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
             <h2 className="text-3xl font-black text-brand-deep italic">Free AI Tools Hub</h2>
             <p className="text-slate-500 font-medium max-w-lg">
                No credit card. No login required. Access our core LinkedIn optimization engines to audit your professional presence instantly.
             </p>
          </div>
          <button 
            onClick={() => onNavigate?.(ViewState.TOOLS_HUB)}
            className="px-12 py-6 bg-brand-deep text-white rounded-3xl font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-4"
          >
            Launch Free Suite <Rocket size={20} className="text-brand-accent" />
          </button>
        </div>
      </section>

      {/* Trust Grid */}
      <div className="py-12 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-10 italic">Dominating the network across global hubs</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {['Google', 'Meta', 'Stripe', 'Airbnb', 'Nvidia', 'Tesla'].map(brand => (
                <span key={brand} className="text-2xl font-black tracking-tighter text-slate-800 uppercase italic">{brand}</span>
              ))}
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto animate-in slide-in-from-bottom-10">
             <h2 className="text-4xl md:text-7xl font-black text-brand-deep mb-8 tracking-tight italic">Engineered for <br /><span className="text-brand-primary">Elite Outcomes.</span></h2>
             <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
               Most job seekers operate in the dark. <strong>Learnaboutlinked.in</strong> provides the infrared vision needed to bypass standard filters.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={i} className="group p-12 rounded-[48px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500">
                <div className={`w-16 h-16 ${f.bg} ${f.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-brand-deep mb-4 italic">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{f.desc}</p>
                <div className="pt-8 border-t border-slate-200 mt-auto">
                   <button onClick={() => onNavigate?.(f.view)} className="text-[10px] font-black uppercase text-brand-primary tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Learn more <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="how-it-works" className="py-24 md:py-40 px-6 bg-brand-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-accent/5 blur-[100px] rounded-full -translate-x-1/2" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <h2 className="text-4xl md:text-6xl font-black text-brand-deep italic leading-tight">The 4-Phase <br /><span className="text-brand-primary">Protocol.</span></h2>
               <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                 To truly <strong>learn about LinkedIn</strong> algorithms, you must follow a repeatable sync cycle. Our platform automates the heavy lifting.
               </p>
               <div className="space-y-4">
                  {steps.map((step) => (
                    <div key={step.id} className="flex gap-6 p-8 bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                       <div className="text-3xl font-black text-brand-primary/20 italic group-hover:text-brand-primary transition-colors">{step.id}</div>
                       <div>
                          <h4 className="font-black text-xl text-brand-deep mb-1 italic">{step.title}</h4>
                          <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="aspect-[4/5] bg-slate-200 rounded-[64px] overflow-hidden border-8 border-white shadow-2xl relative group">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]" alt="Career Dashboard" />
                  <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Floating Notification */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[85%] glass p-6 rounded-[32px] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
                     <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white">
                        <CheckCircle2 size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-brand-deep tracking-tight italic">Offer Received: Nvidia</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visibility Index: 98%</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / ROI Section */}
      <section id="roi" className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
           {benefits.map((b, i) => (
             <div key={i} className="text-center space-y-6 p-10">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                   <Target className="text-brand-primary" size={32} />
                </div>
                <h3 className="text-3xl font-black text-brand-deep italic">{b.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Final CTA Node */}
      <section className="px-6 py-24 md:py-40">
         <div className="max-w-5xl mx-auto gradient-brand rounded-[64px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(124,58,237,0.4)]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full" />
            <div className="relative z-10 space-y-12">
               <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-tight">Ready to evolve <br />your professional node?</h2>
               <p className="text-lg md:text-2xl text-white/70 font-medium max-w-xl mx-auto">
                 Join 14,000+ professionals who mastered how to <strong>learn about LinkedIn</strong> and secure their future.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button onClick={onGetStarted} className="w-full sm:w-auto bg-white text-brand-primary px-12 py-7 rounded-3xl font-black text-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                     Get Started Free
                     <ChevronRight size={24} />
                  </button>
                  <button onClick={() => onNavigate?.(ViewState.TOOLS_HUB)} className="text-white/60 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors underline underline-offset-8">
                     Explore Free Tools
                  </button>
               </div>
               <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Zero noise. 100% Intelligence. GDPR Ready.</p>
            </div>
         </div>
      </section>

      {/* SEO Footer */}
      <footer className="py-24 bg-white border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2 space-y-8">
               <div className="flex items-center gap-3">
                  <LogoIcon size={44} />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-brand-deep tracking-tight leading-none italic uppercase">Learnabout</span>
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">linked.in</span>
                  </div>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                 The definitive platform for professionals who want to <strong>learn about LinkedIn</strong> and high-velocity career growth. Deployed at the edge.
               </p>
            </div>
            
            <div className="space-y-6">
               <h5 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Protocol</h5>
               <ul className="space-y-4 text-sm font-bold text-slate-400">
                  <li><button onClick={() => onNavigate?.(ViewState.TOOLS_HUB)} className="hover:text-brand-primary transition-all">Free Tools Hub</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.CV_EVOLUTION)} className="hover:text-brand-primary transition-all">CV Evolution</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.SEO_AUDIT)} className="hover:text-brand-primary transition-all">SEO Audit</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.PROCESS)} className="hover:text-brand-primary transition-all">Process</button></li>
               </ul>
            </div>

            <div className="space-y-6">
               <h5 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Network</h5>
               <ul className="space-y-4 text-sm font-bold text-slate-400">
                  <li><button onClick={() => onNavigate?.(ViewState.CLAIRE_HUB)} className="hover:text-brand-primary transition-all">Claire AI</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.AI_LAB)} className="hover:text-brand-primary transition-all">Research Lab</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.NEWSLETTERS)} className="hover:text-brand-primary transition-all">Magazines</button></li>
               </ul>
            </div>

            <div className="space-y-6">
               <h5 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Safety</h5>
               <ul className="space-y-4 text-sm font-bold text-slate-400">
                  <li><button onClick={() => onNavigate?.(ViewState.SAFETY)} className="hover:text-brand-primary transition-all">Sovereignty</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.TERMS)} className="hover:text-brand-primary transition-all">Protocol Terms</button></li>
                  <li><button onClick={() => onNavigate?.(ViewState.NODES)} className="hover:text-brand-primary transition-all">Global Nodes</button></li>
               </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
             <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">© 2025 LEARNABOUTLINKED.IN BY AURORA SYSTEMS. ALL RIGHTS RESERVED.</p>
             <div className="flex gap-8 text-slate-300">
                <span className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Palo Alto Hub
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> London Node
                </span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
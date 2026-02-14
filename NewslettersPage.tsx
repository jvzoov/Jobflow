
import React, { useState } from 'react';
import { 
  Mail, Zap, TrendingUp, ShieldCheck, ArrowLeft, ChevronRight, 
  Sparkles, Bell, Globe, Activity, FileText, CheckCircle2, 
  Loader2, Radio, Target, Search, X, BookOpen, Quote,
  // Fix: Added missing ArrowRight icon import
  ArrowRight
} from 'lucide-react';

interface NewslettersPageProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const NewslettersPage: React.FC<NewslettersPageProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [activeTracks, setActiveTracks] = useState<string[]>(['algo']);
  const [showPreview, setShowPreview] = useState(false);

  const tracks = [
    {
      id: 'algo',
      icon: Target,
      title: "The Algorithm Audit",
      desc: "Deep-dives into monthly LinkedIn SEO weight shifts and indexing patterns.",
      frequency: "Bi-Weekly",
      color: "text-brand-primary"
    },
    {
      id: 'salary',
      icon: TrendingUp,
      title: "Salary Signal",
      desc: "Real-time benchmarking data from verified Top 1% offers across tech hubs.",
      frequency: "Monthly",
      color: "text-emerald-500"
    },
    {
      id: 'stealth',
      icon: ShieldCheck,
      title: "Executive Stealth",
      desc: "Tactics for high-profile job searching while maintaining current node security.",
      frequency: "Weekly",
      color: "text-brand-accent"
    }
  ];

  const archive = [
    { date: "JAN 12", title: "The 0.6s Rule Breakdown", type: "Strategy" },
    { date: "JAN 05", title: "Semantic Stacking Explained", type: "Technical" },
    { date: "DEC 28", title: "Q1 Market Predictions", type: "Intelligence" }
  ];

  const toggleTrack = (id: string) => {
    setActiveTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-deep font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* Editorial Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse-aurora" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[100px] rounded-full animate-pulse-aurora" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation Interface */}
        <div className="flex justify-between items-center mb-16 md:mb-32">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 hover:text-brand-deep transition-all"
          >
            <div className="p-3 bg-white border border-slate-100 rounded-2xl group-hover:bg-brand-aurora group-hover:border-brand-primary/30 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Exit Portal</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-aurora border border-brand-primary/10 rounded-full">
              <Radio size={14} className="text-brand-primary animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Live Signal Node: LWL-MAG</span>
            </div>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 gradient-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Sync All Nodes
              </button>
            )}
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="grid lg:grid-cols-12 gap-20 items-end mb-32">
           <div className="lg:col-span-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 bg-white border border-slate-100 px-5 py-2.5 rounded-full mb-10 shadow-sm">
                 <Mail size={16} className="text-brand-primary" />
                 <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500">The Career Intelligence Feed</span>
              </div>
              <h1 className="text-5xl md:text-9xl font-black text-brand-deep leading-[0.9] tracking-tighter italic mb-10">
                 The Signal <br />
                 <span className="text-gradient">Protocol.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                 In a competitive market, information is your ultimate lever. <strong>Learn about LinkedIn</strong> through our exclusive intelligence tracks.
              </p>
           </div>
           <div className="lg:col-span-4 hidden lg:block">
              <div className="p-10 bg-brand-deep rounded-[48px] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent">Current Issue</p>
                 <h3 className="text-3xl font-black italic leading-tight relative z-10">Why your 'About' section is failing the AI parser.</h3>
                 <div className="pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                    <span className="text-xs font-bold text-white/40">ISSUE #42</span>
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="text-brand-accent font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group/btn"
                    >
                       Read Preview <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Intelligence Track Selection */}
        <section className="space-y-16 mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 pb-10">
              <div>
                 <h2 className="text-4xl font-black text-brand-deep italic tracking-tight mb-2">Signal Customization</h2>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Select the tracks to sync with your email node</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-300 tracking-widest">
                 <CheckCircle2 size={14} className="text-emerald-500" /> 14.2k Active Listeners
              </div>
           </div>

           <div className="grid md:grid-cols-3 gap-10">
              {tracks.map((track) => (
                 <button 
                   key={track.id}
                   onClick={() => toggleTrack(track.id)}
                   className={`p-10 rounded-[56px] border text-left transition-all relative overflow-hidden group ${activeTracks.includes(track.id) ? 'bg-white border-brand-primary shadow-[0_40px_80px_-20px_rgba(124,58,237,0.15)] ring-4 ring-brand-primary/5' : 'bg-white border-slate-100 hover:border-brand-primary/30'}`}
                 >
                    <div className="relative z-10 flex flex-col h-full">
                       <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-all ${activeTracks.includes(track.id) ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/30' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-aurora group-hover:text-brand-primary'}`}>
                          <track.icon size={32} />
                       </div>
                       <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-center">
                             <h4 className="text-2xl font-black text-brand-deep italic tracking-tight">{track.title}</h4>
                             {activeTracks.includes(track.id) && <Sparkles size={20} className="text-brand-primary animate-pulse" />}
                          </div>
                          <p className="text-slate-500 font-medium leading-relaxed">{track.desc}</p>
                       </div>
                       <div className="pt-8 mt-10 border-t border-slate-50 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{track.frequency}</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${activeTracks.includes(track.id) ? 'text-brand-primary' : 'text-slate-300'}`}>
                             {activeTracks.includes(track.id) ? 'Active Sync' : 'Tap to Sync'}
                          </span>
                       </div>
                    </div>
                 </button>
              ))}
           </div>
        </section>

        {/* Subscription Engine */}
        <section className="bg-brand-deep rounded-[64px] p-10 md:p-24 relative overflow-hidden mb-40 group">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
           
           <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
              <div className="space-y-6">
                 <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Initialize Your <br /><span className="text-brand-accent">Intelligence Sync.</span></h2>
                 <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl mx-auto">
                    Join the elite network of professionals who never miss a beat on how to <strong>learn about LinkedIn</strong> algorithms.
                 </p>
              </div>

              {!subscribed ? (
                 <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto space-y-8">
                    <div className="relative group">
                       <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors" size={24} />
                       <input 
                         required
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="Enter your professional node email..."
                         className="w-full pl-20 pr-8 py-8 bg-white/5 border border-white/10 rounded-[32px] outline-none focus:ring-4 focus:ring-brand-accent/20 transition-all text-white text-xl font-bold placeholder-white/10 shadow-inner"
                       />
                    </div>
                    <button 
                      disabled={isSubmitting || activeTracks.length === 0}
                      className="w-full py-8 bg-brand-accent text-brand-deep rounded-[32px] font-black text-2xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:shadow-[0_0_70px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center justify-center gap-5"
                    >
                       {isSubmitting ? <Loader2 className="animate-spin" size={32} /> : <Zap size={32} />}
                       {isSubmitting ? 'ESTABLISHING HANDSHAKE...' : 'ESTABLISH SYNC'}
                    </button>
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em]">ZERO NOISE. 100% SIGNAL. GDPR v2025 COMPLIANT.</p>
                 </form>
              ) : (
                 <div className="bg-emerald-500/10 border border-emerald-500/20 p-16 rounded-[56px] animate-in zoom-in-95 duration-500 space-y-6">
                    <div className="w-24 h-24 bg-emerald-500 rounded-[32px] flex items-center justify-center text-brand-deep mx-auto shadow-2xl mb-8">
                       <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-4xl font-black text-white italic">Sync Established.</h3>
                    <p className="text-emerald-400/60 font-bold uppercase tracking-widest">Protocol initialized for {email}</p>
                    <button onClick={() => setSubscribed(false)} className="text-white/30 hover:text-white transition-colors text-xs font-black uppercase tracking-widest pt-8">
                       Sync another node
                    </button>
                 </div>
              )}
           </div>
        </section>

        {/* Signal Archive Node */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="inline-flex items-center gap-3 bg-brand-aurora border border-brand-primary/10 px-4 py-1.5 rounded-full">
                 <Globe size={14} className="text-brand-primary" />
                 <span className="text-[10px] font-black uppercase text-brand-primary tracking-widest">Global Telemetry</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-deep italic leading-none tracking-tighter">Browse the <br />Neural Archive.</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                Our signals have helped over 14,000 professionals <strong>learn about LinkedIn</strong> strategy. Past issues are accessible only to active nodes.
              </p>
              <div className="flex gap-4">
                 <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex-1 shadow-sm">
                    <Activity className="text-brand-primary mb-4" size={24} />
                    <p className="text-2xl font-black text-brand-deep italic">98.8%</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Accuracy Rating</p>
                 </div>
                 <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex-1 shadow-sm">
                    <FileText className="text-emerald-500 mb-4" size={24} />
                    <p className="text-2xl font-black text-brand-deep italic">240+</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Signal Reports</p>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              {archive.map((item, i) => (
                 <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] flex items-center justify-between group hover:border-brand-primary hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest shrink-0">{item.date}</span>
                       <div>
                          <h4 className="font-black text-brand-deep italic group-hover:text-brand-primary transition-colors">{item.title}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{item.type}</span>
                       </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:bg-brand-primary group-hover:text-white transition-all">
                       <ChevronRight size={18} />
                    </div>
                 </div>
              ))}
              <button className="w-full py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] hover:text-brand-primary transition-colors">
                 View Full Archive Node
              </button>
           </div>
        </section>

        {/* Issue Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-brand-deep/80 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="bg-white rounded-[56px] shadow-2xl w-full max-w-3xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col max-h-[90vh]">
                <div className="p-8 md:p-12 border-b border-slate-100 flex justify-between items-center bg-brand-deep text-white">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-deep shadow-lg">
                         <BookOpen size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Issue #42 Preview</p>
                         <h2 className="text-2xl font-black italic tracking-tight">The AI Parser Vulnerability</h2>
                      </div>
                   </div>
                   <button onClick={() => setShowPreview(false)} className="p-4 hover:bg-white/10 rounded-full transition-colors">
                      <X size={28} />
                   </button>
                </div>
                
                <div className="p-10 md:p-16 overflow-y-auto custom-scrollbar flex-1 text-slate-600">
                   <div className="space-y-8 max-w-2xl mx-auto">
                      <div className="flex gap-4 items-start">
                         <Quote className="text-brand-primary shrink-0 opacity-20" size={48} />
                         <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-800">
                            LinkedIn's 2025 algorithm update has prioritized 'Semantic Density' over raw keyword count. This means a standard skills list is now less effective than achievement-based skill integration.
                         </p>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-lg font-black text-brand-deep uppercase tracking-wider border-l-4 border-brand-primary pl-4">The Synthesis</h4>
                         <p className="text-lg leading-relaxed">
                            Our recent laboratory audits across 5,000 profile nodes confirm that profiles using the <strong>'Action-Result-Keyword' (ARK)</strong> framework are being indexed 42% faster in recruiter search filters. 
                         </p>
                         <p className="text-lg leading-relaxed">
                            Static summaries that start with "I am a motivated professional..." are currently flagged as low-intent by the latest neural filters. Instead, establish your authority node in the first 6 words.
                         </p>
                      </div>

                      <div className="bg-brand-aurora p-8 rounded-[40px] border border-brand-primary/10">
                         <h5 className="font-black text-brand-deep mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                            <Target className="text-brand-primary" size={16} /> Key Takeaway
                         </h5>
                         <p className="text-sm font-bold text-slate-600 leading-loose uppercase tracking-wide">
                            PURGE ALL PASSIVE VERBS. CONVERT YOUR SUMMARY INTO A NEURAL SIGNATURE THAT RECRUITERS CANNOT IGNORE.
                         </p>
                      </div>
                   </div>
                </div>

                <div className="p-8 md:p-12 border-t border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-6 items-center justify-between">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ready to read the full report?</p>
                   <button 
                     onClick={() => { setShowPreview(false); window.scrollTo({ top: document.getElementById('newsletter')?.offsetTop || 0, behavior: 'smooth' }); }}
                     className="px-10 py-5 gradient-brand text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                   >
                      Subscribe for Full Access <ArrowRight size={18} />
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Protocol Footer */}
        <footer className="py-24 border-t border-slate-100 mt-40 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
                 <Mail size={24} />
              </div>
              <div className="flex flex-col">
                 <span className="text-xl md:text-2xl font-black text-brand-deep tracking-tighter italic leading-none uppercase">Learnwith<span className="text-brand-primary">Linked.in</span></span>
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">The Signal Intelligence Node</span>
              </div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">© 2025 AURORA SYSTEMS • ALL RIGHTS RESERVED • PALO ALTO HUB</p>
        </footer>
      </div>
    </div>
  );
};

export default NewslettersPage;

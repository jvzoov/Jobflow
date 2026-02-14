import React, { useState } from 'react';
import { 
  Cpu, Zap, BrainCircuit, Search, ArrowLeft, Sliders, 
  Terminal, Activity, Eye, EyeOff, BarChart3, Fingerprint, 
  Sparkles, Layers, SlidersHorizontal, RefreshCw, ChevronRight, 
  Target, Rocket, Info
} from 'lucide-react';
import { analyzeHeadline } from '../services/geminiService';

interface AILabViewProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
}

const AILabView: React.FC<AILabViewProps> = ({ onBack, onGetStarted, isAuthenticated }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [neuralVision, setNeuralVision] = useState(false);
  const [analysis, setAnalysis] = useState<{ score: number; suggestion: string; feedback: string } | null>(null);

  const handleTest = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    try {
      const result = await analyzeHeadline(input);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const gravityKws = [
    { word: "Senior", weight: 0.95 },
    { word: "Product", weight: 0.88 },
    { word: "Manager", weight: 0.82 },
    { word: "Strategy", weight: 0.91 },
    { word: "Growth", weight: 0.75 }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-400 font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden">
      {/* Lab Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation Interface */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-brand-primary transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Decommission session</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
              <Activity size={14} className="text-brand-primary animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Neural Load: 12%</span>
            </div>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-accent transition-all active:scale-95"
              >
                Access Lab Tools
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-32 animate-fade-in-up">
           <div className="inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary/20 px-5 py-2 rounded-full mb-10">
              <Cpu size={16} className="text-brand-primary animate-spin-slow" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Intelligence Prototyping</span>
           </div>
           <h1 className="text-5xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter italic mb-10">
              Career <br />
              <span className="text-gradient">Physics Lab.</span>
           </h1>
           <p className="text-xl md:text-3xl text-slate-500 font-medium leading-relaxed max-w-3xl">
              Break your professional brand into metadata. <strong>Learn about LinkedIn</strong> gravity by simulating recruiter-eye patterns and algorithmic indexing.
           </p>
        </div>

        {/* The Sandbox Interface */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
           <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 rounded-[64px] p-8 md:p-16 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary animate-pulse" />
              
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-white italic">Neural Sandbox v1</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Model: Claire-Ultra-Preview</p>
                 </div>
                 <button 
                   onClick={() => setNeuralVision(!neuralVision)}
                   className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${neuralVision ? 'bg-brand-primary/20 border-brand-primary text-brand-primary shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'bg-white/5 border-white/10 text-slate-500'}`}
                 >
                    {neuralVision ? <Eye size={18} /> : <EyeOff size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural Vision</span>
                 </button>
              </div>

              <div className="space-y-8">
                 <div className="relative">
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Input headline or bullet for stress testing..."
                      className={`w-full p-10 bg-black border border-white/10 rounded-[40px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-mono text-lg resize-none min-h-[240px] placeholder-slate-800 ${neuralVision ? 'text-brand-accent' : 'text-white'}`}
                    />
                    {neuralVision && (
                       <div className="absolute inset-0 pointer-events-none p-10 font-mono text-lg opacity-20 overflow-hidden">
                          {Array(10).fill(0).map((_, i) => (
                             <div key={i} className="whitespace-nowrap">{Math.random().toString(36).substring(2, 20)} TOKEN_MAP_{i} SEO_WEIGHT_0.{Math.floor(Math.random()*99)}</div>
                          ))}
                       </div>
                    )}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={handleTest}
                      disabled={isProcessing || !input}
                      className="flex-1 py-8 bg-white text-black rounded-[32px] font-black text-xl uppercase tracking-[0.2em] hover:bg-brand-accent transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-20"
                    >
                       {isProcessing ? <RefreshCw className="animate-spin" size={28} /> : <Zap size={28} />}
                       {isProcessing ? 'COMPUTING...' : 'RUN STRESS TEST'}
                    </button>
                    <button className="px-10 py-8 bg-white/5 border border-white/10 text-slate-500 rounded-[32px] font-black uppercase text-xs tracking-widest hover:text-white transition-all">
                       Clear Nodes
                    </button>
                 </div>
              </div>

              {analysis && !isProcessing && (
                 <div className="mt-12 p-10 bg-brand-primary/5 border border-brand-primary/20 rounded-[48px] animate-in zoom-in-95 duration-500 space-y-10 relative">
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-primary rounded-3xl flex items-center justify-center text-white shadow-2xl rotate-12">
                       <Sparkles size={32} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Logic Trace</span>
                          <p className="text-sm font-medium italic text-slate-300 leading-relaxed">"{analysis.feedback}"</p>
                       </div>
                       <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Optimization Path</span>
                          <div className="p-6 bg-black rounded-3xl border border-white/5 text-lg font-black text-white italic">
                             {analysis.suggestion}
                          </div>
                       </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Algorithmic Rank</p>
                          <div className="text-5xl font-black text-white italic tracking-tighter">TIER {analysis.score > 80 ? '01' : '02'}</div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Sync Index</p>
                          <div className="text-2xl font-black text-brand-accent italic">{analysis.score}%</div>
                       </div>
                    </div>
                 </div>
              )}
           </div>

           <div className="lg:col-span-4 space-y-12">
              {/* Keyword Gravity Widget */}
              <div className="bg-white/5 border border-white/10 p-10 rounded-[56px] space-y-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/10 blur-[60px] rounded-full" />
                 <h4 className="text-xl font-black text-white italic flex items-center gap-3">
                    <Target size={20} className="text-brand-accent" /> Gravity Map
                 </h4>
                 <div className="space-y-8 relative z-10">
                    {gravityKws.map((kw, i) => (
                       <div key={i} className="space-y-2 group/kw">
                          <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                             <span className="text-white group-hover/kw:text-brand-accent transition-colors">{kw.word}</span>
                             <span className="text-slate-600">{(kw.weight * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-brand-accent transition-all duration-1000" 
                               style={{ width: `${kw.weight * 100}%` }} 
                             />
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                    <Info size={14} className="text-slate-600" />
                    <p className="text-[9px] font-black uppercase text-slate-600 leading-relaxed">Weights are calculated based on current Top 1% LinkedIn engagement nodes.</p>
                 </div>
              </div>

              {/* Model Comparison */}
              <div className="bg-brand-deep border border-brand-primary/20 p-10 rounded-[56px] space-y-8 shadow-2xl relative group">
                 <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h4 className="text-xl font-black text-white italic">Node Comparison</h4>
                 <div className="space-y-4">
                    {[
                      { node: "Encouraging-v3", status: "Active", latency: "42ms" },
                      { node: "Direct-v1", status: "Optimizing", latency: "11ms" },
                      { node: "Academic-v2", status: "Idle", latency: "--" }
                    ].map((m, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary/40 transition-all cursor-pointer">
                          <div>
                             <span className="block text-xs font-black text-white">{m.node}</span>
                             <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{m.status}</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-primary">{m.latency}</span>
                       </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-brand-primary/20 border border-brand-primary/30 text-brand-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">
                    Load Custom Parameters
                 </button>
              </div>
           </div>
        </div>

        {/* Data Architecture Section */}
        <section className="grid lg:grid-cols-2 gap-20 items-center mb-40">
           <div className="space-y-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                 <Fingerprint size={16} className="text-brand-accent" />
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sovereignty Protocol</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Tokenized <br /><span className="text-brand-accent">Professionalism.</span></h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                 How does LearnwithLinked.in protect you? We convert your career data into anonymous "Neural Signatures." This ensures you can <strong>learn about LinkedIn</strong> SEO without exposing your private professional history to the public network.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 text-center">
                    <BarChart3 className="text-brand-primary mx-auto mb-4" size={32} />
                    <p className="text-2xl font-black text-white italic">Zero-Leak</p>
                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Privacy Standard</p>
                 </div>
                 <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 text-center">
                    <Rocket className="text-emerald-400 mx-auto mb-4" size={32} />
                    <p className="text-2xl font-black text-white italic">14.2ms</p>
                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Processing Speed</p>
                 </div>
              </div>
           </div>

           <div className="order-1 lg:order-2">
              <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-16 rounded-[64px] relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8">
                    <Terminal size={40} className="text-brand-primary opacity-20" />
                 </div>
                 <div className="font-mono text-xs space-y-6">
                    <div className="space-y-1">
                       <span className="text-slate-600">// INITIALIZING_SOVEREIGNTY_PROTOCOL</span>
                       <span className="text-brand-primary block">SYNCING WITH PALO_ALTO_HUB... DONE</span>
                    </div>
                    <div className="p-6 bg-black rounded-2xl border border-brand-primary/20 text-brand-accent">
                       {`{
  "node_id": "LWL-9912",
  "privacy_layer": "AES-256-LOCAL",
  "data_tokens": ["EXP_1", "SKILL_NODE_01"],
  "masking_status": "HIGH_DENSITY"
}`}
                    </div>
                    <div className="space-y-1">
                       <span className="text-slate-600">// TRACING_RECRUITER_SEARCH_INDEX</span>
                       <span className="text-emerald-500 block">OPTIMAL_PATH_FOUND (RANK #01)</span>
                    </div>
                 </div>
                 <div className="mt-12 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Handshake Verified</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 bg-brand-primary/5 border border-brand-primary/10 rounded-[64px] relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10 space-y-12">
              <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Ready to leave <br />the static CV behind?</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center px-6">
                 <button onClick={onGetStarted} className="px-12 py-7 gradient-brand text-white rounded-[32px] font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/40 transition-all flex items-center justify-center gap-4 group">
                    Begin Lab Session
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <button onClick={onBack} className="px-12 py-7 bg-white/5 border border-white/10 text-white rounded-[32px] font-black text-xl hover:bg-white/10 transition-all">
                    Global Telemetry
                 </button>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-700 tracking-[0.6em]">JOIN 14k+ RESEARCH-BACKED PROFESSIONALS</p>
           </div>
        </section>
      </div>

      {/* Lab Footer */}
      <footer className="py-24 border-t border-white/5 text-center opacity-40">
         <div className="flex items-center justify-center gap-4 mb-6">
           <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white">
              <Cpu size={24} />
           </div>
           <span className="text-2xl font-black italic tracking-tighter text-white uppercase">Learnwith<span className="text-brand-primary">Linked.in</span></span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2025 AURORA SYSTEMS • THE AI INTELLIGENCE LAB • PALO ALTO HUB</p>
      </footer>
    </div>
  );
};

export default AILabView;
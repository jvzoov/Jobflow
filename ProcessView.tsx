import React, { useState, useEffect } from 'react';
import { 
  Cpu, BrainCircuit, ArrowLeft, ChevronRight, Layers, 
  Zap, Search, Target, ShieldCheck, Rocket, 
  LineChart, Workflow, FileSearch, Sparkles, Database,
  Terminal, Activity, Globe, Loader2, CheckCircle2, Play,
  RefreshCw, List
} from 'lucide-react';
import { searchJobs, scoreJobRelevance, generateCoverLetter } from '../services/geminiService';
import { Job, JobStatus, Resume } from '../types';

interface ProcessViewProps {
  onBack: () => void;
  onGetStarted: () => void;
  isAuthenticated: boolean;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  resume: Resume;
}

const ProcessView: React.FC<ProcessViewProps> = ({ onBack, onGetStarted, isAuthenticated, jobs, setJobs, resume }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activePhase, setActivePhase] = useState<number>(-1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [automationKeywords, setAutomationKeywords] = useState('Product Manager');
  const [automationLocation, setAutomationLocation] = useState('Remote');
  
  const [results, setResults] = useState<{
    found: number;
    scored: number;
    qualified: number;
    drafted: number;
  }>({ found: 0, scored: 0, qualified: 0, drafted: 0 });

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  const runAutopilot = async () => {
    if (!isAuthenticated) {
      onGetStarted();
      return;
    }
    
    setIsRunning(true);
    setTerminalLogs([]);
    setResults({ found: 0, scored: 0, qualified: 0, drafted: 0 });
    
    // Step 1: SEARCH & DEDUP (Tutorial 39 Step 1)
    setActivePhase(0);
    addLog(`INITIATING_SEARCH for "${automationKeywords}" in "${automationLocation}"...`);
    const foundRoles = await searchJobs(automationKeywords, automationLocation, 'Technology');
    
    // N8N Logic: Aggregate matching companyName + title
    const existingKeys = new Set(jobs.map(j => `${j.company}-${j.role}`));
    const uniqueRoles = foundRoles.filter(r => !existingKeys.has(`${r.company}-${r.title}`));
    
    setResults(prev => ({ ...prev, found: uniqueRoles.length }));
    addLog(`Found ${foundRoles.length} nodes. Removed ${foundRoles.length - uniqueRoles.length} duplicates.`);
    
    if (uniqueRoles.length === 0) {
      addLog("SYNC_COMPLETE: No new candidates found.");
      setIsRunning(false);
      return;
    }

    // Step 2: CHECK RELEVANCE (Tutorial 39 Step 2)
    setActivePhase(1);
    addLog("PHASE_02: Initiating Relevance Scrutiny...");
    
    const qualifiedRoles: any[] = [];
    for (const role of uniqueRoles) {
      addLog(`Auditing: ${role.title} @ ${role.company}...`);
      const evaluation = await scoreJobRelevance(resume.summary + " " + resume.skills, role.snippet || role.title);
      
      setResults(prev => ({ ...prev, scored: prev.scored + 1 }));
      
      // N8N Filter: If score >= 3
      if (evaluation.score >= 3) {
        qualifiedRoles.push({ ...role, score: evaluation.score });
        setResults(prev => ({ ...prev, qualified: prev.qualified + 1 }));
        addLog(`Match Verified: Rank ${evaluation.score}/5. Reasoning: ${evaluation.reasoning.substring(0, 40)}...`);
      } else {
        addLog(`Node Rejected: Rank ${evaluation.score}/5. Low semantic density.`);
      }
    }

    // Step 3: ASSET PREPARATION (Tutorial 39 Step 3)
    setActivePhase(2);
    addLog("PHASE_03: Synthesizing Narrative Assets...");
    
    for (const role of qualifiedRoles) {
      addLog(`Drafting tailored Cover Letter for ${role.company}...`);
      const letter = await generateCoverLetter(role.company, role.title, role.snippet || "General Role", resume.skills);
      
      const newJob: Job = {
        id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        company: role.company,
        role: role.title,
        location: role.location || automationLocation,
        status: JobStatus.DRAFT,
        dateApplied: new Date().toISOString().split('T')[0],
        description: role.snippet || "Found via automated search node.",
        coverLetter: letter,
        link: role.link,
        email: '',
        origin: 'application'
      };
      
      setJobs(prev => [newJob, ...prev]);
      setResults(prev => ({ ...prev, drafted: prev.drafted + 1 }));
      addLog(`Asset Created: Document moved to Dashboard Vault.`);
    }

    setActivePhase(3);
    addLog("SYNC_COMPLETE: Autopilot cycle successful.");
    setIsRunning(false);
  };

  const phases = [
    { title: "Neural Ingestion", meta: "PHASE 01", icon: Database, color: "text-brand-primary" },
    { title: "Algorithmic Audit", meta: "PHASE 02", icon: FileSearch, color: "text-brand-accent" },
    { title: "Iterative Synthesis", meta: "PHASE 03", icon: BrainCircuit, color: "text-violet-400" },
    { title: "Market Deployment", meta: "PHASE 04", icon: Rocket, color: "text-emerald-400" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden">
      {/* Background Blueprint Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:60px_60px]" />
         <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-primary/5 blur-[180px] rounded-full animate-pulse-aurora" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-brand-accent/5 blur-[150px] rounded-full animate-pulse-aurora" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation Interface */}
        <div className="flex justify-between items-center mb-16 md:mb-32">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Core</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Terminal size={14} className="text-brand-accent animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Autopilot Node: LWL-SYNC-v4</span>
            </div>
            {!isAuthenticated && (
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 gradient-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Sync All Nodes
              </button>
            )}
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="max-w-4xl mb-24 animate-fade-in-up">
           <div className="inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary/20 px-5 py-2 rounded-full mb-10">
              <Workflow size={16} className="text-brand-primary" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Automated Intelligence Protocol</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic mb-10">
              The Autopilot <br />
              <span className="text-gradient">Protocol.</span>
           </h1>
           <p className="text-xl md:text-4xl text-slate-400 font-medium leading-relaxed max-w-3xl">
              We've converted our complete N8N workflow into a front-end node. Launch an automated cycle to <strong>learn about LinkedIn</strong> demand and auto-draft your next career moves.
           </p>
        </div>

        {/* Automation Hub (N8N Logic Realization) */}
        <div className="grid lg:grid-cols-12 gap-10 mb-32">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[56px] p-8 md:p-12 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-emerald-500" />
               
               <div className="flex justify-between items-center mb-10 relative z-10">
                 <div>
                    <h3 className="text-2xl font-black text-white italic">Node Configuration</h3>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Map keywords to search node</p>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Handshake Ready</span>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6 mb-10 relative z-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Target Job Title</label>
                    <input 
                      type="text" 
                      value={automationKeywords}
                      onChange={(e) => setAutomationKeywords(e.target.value)}
                      className="w-full p-6 bg-slate-950 border border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-brand-primary/20 text-white font-bold"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Geospatial Node</label>
                    <input 
                      type="text" 
                      value={automationLocation}
                      onChange={(e) => setAutomationLocation(e.target.value)}
                      className="w-full p-6 bg-slate-950 border border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-brand-primary/20 text-white font-bold"
                    />
                 </div>
               </div>

               <button 
                onClick={runAutopilot}
                disabled={isRunning}
                className="w-full py-8 gradient-brand text-white rounded-[32px] font-black text-2xl uppercase tracking-[0.2em] shadow-2xl hover:shadow-brand-primary/40 active:scale-95 transition-all flex items-center justify-center gap-5 disabled:opacity-50"
               >
                 {isRunning ? <Loader2 className="animate-spin" size={32} /> : <Play size={32} />}
                 {isRunning ? 'EXECUTING LOGIC...' : 'LAUNCH AUTOPILOT'}
               </button>
            </div>

            {/* Live Visualization of the N8N Pipeline */}
            <div className="grid md:grid-cols-4 gap-4">
               {phases.map((phase, i) => (
                 <div key={i} className={`p-6 rounded-[32px] border transition-all duration-700 relative overflow-hidden ${activePhase === i ? 'bg-white border-white shadow-2xl scale-105' : 'bg-white/5 border-white/5 opacity-40'}`}>
                    {activePhase === i && <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />}
                    <div className="relative z-10 space-y-4 text-center">
                       <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center ${activePhase === i ? 'bg-brand-primary text-white' : 'bg-white/5 text-slate-500'}`}>
                          <phase.icon size={24} />
                       </div>
                       <div>
                          <p className={`text-[8px] font-black uppercase tracking-widest ${activePhase === i ? 'text-brand-primary' : 'text-slate-600'}`}>{phase.meta}</p>
                          <h4 className={`text-xs font-black italic uppercase ${activePhase === i ? 'text-brand-deep' : 'text-slate-400'}`}>{phase.title}</h4>
                       </div>
                       {activePhase === i && <Activity size={14} className="mx-auto text-brand-primary animate-bounce" />}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Real-time Terminal Output */}
            <div className="bg-slate-950 border border-white/10 rounded-[48px] p-8 space-y-6 shadow-2xl h-full flex flex-col">
               <div className="flex justify-between items-center pb-4 border-b border-white/5">
                 <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-brand-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live_Protocol_Logs</span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               
               <div className="flex-1 font-mono text-[10px] space-y-3 overflow-hidden">
                 {terminalLogs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-800 italic">
                       System Idle. Awaiting Initiation...
                    </div>
                 ) : (
                    terminalLogs.map((log, i) => (
                      <div key={i} className={`animate-in slide-in-from-bottom-1 duration-300 ${i === 0 ? 'text-brand-accent' : 'text-slate-600'}`}>
                        {log}
                      </div>
                    ))
                 )}
               </div>

               <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                     <span>Successful Handshakes</span>
                     <span className="text-white">{results.drafted}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-brand-primary transition-all duration-1000" 
                        style={{ width: `${(results.scored / 5) * 100}%` }}
                     />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Process Intelligence Node (Interactive Callout) */}
        <section className="bg-white/5 border border-white/10 rounded-[64px] p-10 md:p-24 relative overflow-hidden group mb-40">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full" />
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-12">
                 <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Security Integrated</span>
                 </div>
                 <h2 className="text-4xl md:text-7xl font-black text-white italic leading-none tracking-tighter">Zero-Knowledge <br /><span className="text-brand-accent">Iteration.</span></h2>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">
                    Privacy is the baseline of our process. Your sensitive data is masked at the edge before Claire ever begins the synthesis. Our process ensures you can <strong>learn about LinkedIn</strong> search patterns without exposing your current professional node.
                 </p>
                 <div className="flex gap-4">
                    <div className="p-8 bg-white/5 rounded-[40px] flex-1 border border-white/5 text-center">
                       <Database className="text-brand-primary mx-auto mb-4" size={32} />
                       <p className="text-2xl font-black text-white italic">Local-First</p>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Primary Data Node</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[40px] flex-1 border border-white/5 text-center">
                       <Globe className="text-brand-accent mx-auto mb-4" size={32} />
                       <p className="text-2xl font-black text-white italic">Neural Edge</p>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Synthesis Matrix</p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900/80 border border-white/10 rounded-[56px] p-10 md:p-16 space-y-12 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent)]" />
                 <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-center pb-8 border-b border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Sync Summary</span>
                       <div className="flex items-center gap-2">
                          <List size={14} className="text-brand-accent" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Session</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                          <p className="text-2xl font-black text-white italic">{results.found}</p>
                          <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Found</p>
                       </div>
                       <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                          <p className="text-2xl font-black text-white italic">{results.qualified}</p>
                          <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Qualified</p>
                       </div>
                    </div>

                    <div className="p-6 bg-brand-primary/10 rounded-3xl border border-brand-primary/20 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <FileSearch size={20} className="text-brand-primary" />
                          <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Asset Queue:</span>
                       </div>
                       <span className="text-lg font-black text-white italic">{results.drafted} Documents</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center py-40">
           <div className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter">Your evolution <br />starts with Phase 01.</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={onGetStarted} className="px-12 py-7 gradient-brand text-white rounded-[32px] font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-4 group">
                    Initialize Neural Sync
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <button onClick={onBack} className="px-12 py-7 bg-white/5 border border-white/10 text-white rounded-[32px] font-black text-xl hover:bg-white/10 transition-all">
                    View Network Nodes
                 </button>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.8em]">AVERAGE SYNC TIME: 0.4 SECONDS • PALO ALTO HUB</p>
           </div>
        </section>

        {/* Process Footer */}
        <footer className="py-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left opacity-40">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white">
                 <Workflow size={24} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Learnwith<span className="text-brand-primary">Linked.in</span></span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2025 AURORA SYSTEMS • THE NEURAL CAREER PROCESS • EST. 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default ProcessView;
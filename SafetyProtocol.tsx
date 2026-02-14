import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Cpu, Activity, Zap, EyeOff, RefreshCw, Server, 
  Terminal, ShieldAlert, Globe, Radio, Fingerprint, HardDrive, 
  Target, Briefcase, DollarSign, FileCheck, Search
} from 'lucide-react';

interface SafetyProtocolProps {
  onBack?: () => void;
}

const SafetyProtocol: React.FC<SafetyProtocolProps> = ({ onBack }) => {
  const [maskLevel, setMaskLevel] = useState(75);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'masking' | 'scenarios' | 'network'>('scenarios');

  const scenarios = [
    {
      id: 'stealth',
      icon: Target,
      title: "Stealth Search (Competitors)",
      case: "You are currently employed at Apple and applying to Google.",
      action: "Claire identifies competitor-specific keywords and suggests obfuscation of proprietary internal project names before generating iterations.",
      protection: "IP Leakage Prevention Layer 4",
      color: "text-rose-400"
    },
    {
      id: 'negotiation',
      icon: DollarSign,
      title: "Revenue Protection",
      case: "You are generating a negotiation script for a $200k offer.",
      action: "The protocol ensures your previous salary data is never stored in the AI's long-term memory, only used in the immediate context window.",
      protection: "Financial Privacy Node",
      color: "text-emerald-400"
    },
    {
      id: 'authenticity',
      icon: FileCheck,
      title: "Attribute Protection",
      case: "Iterating a CV for a high-security clearance role.",
      action: "All iterations are audited for 'Neural Plagiarism' to ensure your professional assets remain 100% unique and owned by you.",
      protection: "Asset Sovereignty Scan",
      color: "text-brand-accent"
    }
  ];

  useEffect(() => {
    const events = [
      "Neural Node Synchronized", "AES-256 Handshake Verified", "PII Scrubber: Latency Check < 2ms",
      "Data Sovereignty Node Active", "Zero-Knowledge Proof Established", "GDPR Compliance Packet Sent"
    ];
    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLogs(prev => [ `${new Date().toLocaleTimeString()} [SYS]: ${randomEvent}`, ...prev].slice(0, 8));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-slate-950 text-slate-300 p-6 md:p-12 font-sans selection:bg-brand-accent selection:text-brand-deep">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-16 h-16 bg-white/5 border border-brand-accent/30 rounded-2xl flex items-center justify-center text-brand-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <ShieldCheck size={40} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Safety Node: A-77</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">Safety <span className="text-brand-accent">Protocol.</span></h1>
            </div>
          </div>
          {onBack && (
            <button onClick={onBack} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:border-brand-accent transition-all flex items-center gap-3 backdrop-blur-md">
              <RefreshCw size={14} /> Return to Core
            </button>
          )}
        </div>

        {/* Real-time Lab Navigation */}
        <div className="flex gap-4 border-b border-white/5 pb-8">
          {(['scenarios', 'masking', 'network'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brand-accent text-brand-deep shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab === 'scenarios' ? 'Real-time Use Cases' : tab === 'masking' ? 'Neural Masking Lab' : 'Global Audit'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {activeTab === 'scenarios' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid gap-6">
                  {scenarios.map((s) => (
                    <div key={s.id} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:border-brand-accent transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <s.icon size={120} />
                      </div>
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 bg-white/5 rounded-2xl ${s.color}`}>
                            <s.icon size={24} />
                          </div>
                          <h4 className="text-xl font-black text-white italic">{s.title}</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 pt-4">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Scenario</span>
                            <p className="text-sm font-bold text-slate-300">{s.case}</p>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase text-brand-accent tracking-widest">Protocol Response</span>
                            <p className="text-sm font-bold text-slate-400">{s.action}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{s.protection}</span>
                          <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                            <Activity size={12} /> Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'masking' && (
              <section className="bg-white/5 border border-white/10 rounded-[48px] p-12 space-y-10 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <Fingerprint className="text-brand-accent" size={28} />
                  <h3 className="text-2xl font-black text-white italic">Masking Depth Control</h3>
                </div>
                <div className="p-8 bg-slate-900 border border-white/5 rounded-3xl space-y-8">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Obfuscation Depth</span>
                    <span className="text-brand-accent italic">{maskLevel}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={maskLevel} onChange={(e) => setMaskLevel(parseInt(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-accent" />
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                     <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-slate-600 block mb-2">[RAW_INPUT]</span>
                        <span className="text-white/40">Jordan_Executive_Strategy_2025</span>
                     </div>
                     <div className="p-4 bg-brand-accent/10 rounded-xl border border-brand-accent/20">
                        <span className="text-brand-accent block mb-2">[MASKED_NODES]</span>
                        <span className="text-brand-accent">J{ "█".repeat(maskLevel/5) }_STR_202X</span>
                     </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'network' && (
              <section className="bg-slate-900/50 border border-white/10 rounded-[48px] p-12 space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white italic flex items-center gap-3">
                    <Radio className="text-brand-accent" size={24} />
                    System Heartbeat
                  </h3>
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">All Systems Nominal</div>
                </div>
                <div className="font-mono text-[10px] space-y-4 h-80 overflow-y-auto custom-scrollbar">
                   {logs.map((log, i) => (
                     <div key={i} className={`flex gap-4 ${i === 0 ? 'text-brand-accent' : 'text-slate-600'}`}>
                       <span className="shrink-0">{log.split(' ')[0]}</span>
                       <span className="italic">{log.split(' ').slice(1).join(' ')}</span>
                     </div>
                   ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-10">
            <section className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Compliance Status</h3>
              <div className="space-y-6">
                 {[
                   { label: 'GDPR 2025', status: 'Ready' },
                   { label: 'California Privacy', status: 'Ready' },
                   { label: 'Neural Transparency', status: 'Verified' }
                 ].map(item => (
                   <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white/80">{item.label}</span>
                      <ShieldCheck size={16} className="text-emerald-500" />
                   </div>
                 ))}
              </div>
            </section>

            <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-[40px] space-y-4">
              <ShieldAlert className="text-rose-500" size={32} />
              <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest italic">Safety Warning</h4>
              <p className="text-xs font-medium text-rose-200/60 leading-relaxed">
                The protocol is currently in "High Obfuscation" mode. Any AI generations will prioritize identity safety over exact detail accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyProtocol;
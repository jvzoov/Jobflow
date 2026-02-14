import React, { useState, useEffect } from 'react';
import { Globe, Server, Activity, Zap, ShieldCheck, RefreshCw, BarChart3, Database } from 'lucide-react';

interface GlobalNodesProps {
  onBack?: () => void;
}

const GlobalNodes: React.FC<GlobalNodesProps> = ({ onBack }) => {
  const [nodes, setNodes] = useState([
    { id: 'US-E', name: 'Aurora-US-East', location: 'Virginia, USA', status: 'Optimal', latency: '4ms', load: '12%' },
    { id: 'EU-C', name: 'Aurora-EU-Central', location: 'Frankfurt, DE', status: 'Optimal', latency: '22ms', load: '45%' },
    { id: 'AS-S', name: 'Aurora-AS-South', location: 'Singapore', status: 'Active', latency: '68ms', load: '08%' },
    { id: 'NEURAL', name: 'Neural-Scrub-Node', location: 'Edge Matrix', status: 'Optimal', latency: '1ms', load: '100%' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        latency: `${Math.floor(Math.random() * 80 + 2)}ms`,
        load: `${Math.floor(Math.random() * 20 + 5)}%`
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-brand-deep text-white p-6 md:p-12 animate-in fade-in duration-1000 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-primary/20 rounded-3xl border border-brand-primary/30 flex items-center justify-center text-brand-accent shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Globe size={40} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter italic">Global <span className="text-brand-accent">Nodes.</span></h1>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Infrastructure Telemetry</p>
            </div>
          </div>
          {onBack && (
            <button onClick={onBack} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-brand-accent transition-all flex items-center gap-3">
              <RefreshCw size={14} /> Sync Metrics
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {nodes.map((node) => (
              <div key={node.id} className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex items-center justify-between group hover:border-brand-accent transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-brand-accent transition-colors">
                    <Server size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black italic">{node.name}</h4>
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{node.location}</p>
                  </div>
                </div>
                <div className="flex gap-12 text-right">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block">Latency</span>
                    <span className="text-sm font-black text-emerald-500 italic">{node.latency}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block">Load</span>
                    <span className="text-sm font-black text-brand-accent italic">{node.load}</span>
                  </div>
                  <div className="flex items-center gap-3 pl-8 border-l border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-10">
            <section className="bg-brand-primary/10 border border-brand-primary/20 p-10 rounded-[48px] text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-brand-primary shadow-inner">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-black italic">Network Velocity</h3>
              <div className="space-y-2">
                 <p className="text-4xl font-black italic tracking-tighter text-brand-accent">1.4 Petabytes</p>
                 <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Monthly Intelligence Throughput</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-black uppercase text-white/50 mb-2">
                  <span>Bandwidth Usage</span>
                  <span>42%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full gradient-brand w-[42%] animate-pulse" />
                </div>
              </div>
            </section>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] flex flex-col items-center text-center space-y-6">
               <Database className="text-slate-500" size={40} />
               <h4 className="text-sm font-black uppercase tracking-widest text-white/40 italic">Data Sovereignty Status</h4>
               <p className="text-xs font-bold leading-relaxed text-white/60 px-4">
                 LearnwithLinked.in operates on a Local-First architecture. Your primary career data stays on your machine, while only "Neural Signatures" are processed by our global node network.
               </p>
               <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                 <ShieldCheck size={14} /> Zero-Knowledge Verified
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNodes;
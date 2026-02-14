import React from 'react';
import { ScrollText, ShieldCheck, BrainCircuit, Scale, UserCheck, RefreshCw } from 'lucide-react';

interface TermsOfIterationProps {
  onBack?: () => void;
}

const TermsOfIteration: React.FC<TermsOfIterationProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-brand-surface p-6 md:p-12 animate-in fade-in duration-1000">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center text-white">
                <ScrollText size={28} />
              </div>
              <h1 className="text-4xl font-black text-brand-deep tracking-tighter italic">Terms of <span className="text-brand-primary">Iteration.</span></h1>
            </div>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Protocol v2.0 - Effective Jan 2025</p>
          </div>
          {onBack && (
            <button onClick={onBack} className="px-6 py-3 bg-white border border-slate-100 rounded-xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-all">
              Exit Protocol
            </button>
          )}
        </div>

        <div className="space-y-12 pb-20">
          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-brand-deep flex items-center gap-3">
              <BrainCircuit className="text-brand-primary" size={24} />
              1. The AI-User Compact
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              By using LearnwithLinked.in, you acknowledge that all generated assets are a result of "Iterative Synthesis." The AI acts as your professional augment, not a replacement. You retain 100% ownership of any CV, Cover Letter, or Guide generated through your account nodes.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-aurora p-8 rounded-[40px] border border-brand-primary/10 space-y-4">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-black text-brand-deep italic">Originality Guarantee</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                We guarantee that every iteration of your professional assets is passed through a "Neural Plagiarism" filter. Your professional brand remains uniquely yours and is never duplicated across the network.
              </p>
            </div>
            <div className="bg-brand-deep p-8 rounded-[40px] text-white space-y-4">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-brand-accent">
                <UserCheck size={20} />
              </div>
              <h4 className="font-black italic">Identity Sovereignty</h4>
              <p className="text-xs text-white/50 font-bold leading-relaxed">
                You have the right to a "Nuclear Reset" at any time. This purges your local career intelligence and destroys all session hashes associated with your identity node.
              </p>
            </div>
          </div>

          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-brand-deep flex items-center gap-3 italic">
              <Scale className="text-emerald-500" size={24} />
              Ethical Boundaries
            </h3>
            <div className="space-y-6">
              {[
                { title: "No False Representations", text: "You agree not to use AI to generate experience or skills you do not possess. Our AI is for optimization, not fabrication." },
                { title: "Algorithmic Integrity", text: "Users may not attempt to 'reverse engineer' Claire to harvest recruiter metadata or bypass LinkedIn search filters via malicious automation." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-brand-primary font-black">0{idx+2}.</div>
                  <div>
                    <h5 className="font-bold text-slate-800 mb-1">{item.title}</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfIteration;
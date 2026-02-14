import React, { useState } from 'react';
import { X, Linkedin, Mail, Lock, User, Briefcase, ChevronRight, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-md rounded-[48px] border border-slate-200 shadow-[0_50px_100px_-20px_rgba(30,27,75,0.1)] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="h-2 gradient-brand w-full" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-brand-primary transition-colors hover:bg-slate-100 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="p-10 pt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-brand-deep tracking-tight italic leading-none mb-2">
              Access <span className="text-brand-primary">Protocol.</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Learnaboutlinked.in Sync Node
            </p>
          </div>

          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'login' ? 'bg-white text-brand-primary shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setTab('register')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'register' ? 'bg-white text-brand-primary shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Register
            </button>
          </div>

          <div className="space-y-3 mb-8">
            <button 
              onClick={onLogin}
              className="w-full bg-[#0077b5] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-blue-500/10"
            >
              <Linkedin size={18} fill="currentColor" />
              Sync via LinkedIn
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            {tab === 'register' && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input required type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-primary/5 text-sm font-bold text-brand-deep" />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input required type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-primary/5 text-sm font-bold text-brand-deep" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input required type="password" placeholder="Key Phrase" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-primary/5 text-sm font-bold text-brand-deep" />
            </div>

            <button type="submit" className="w-full py-5 gradient-brand text-white rounded-[24px] font-black text-lg uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 mt-6">
              {tab === 'login' ? 'Authenticate' : 'Initialize Node'}
              <ChevronRight size={20} />
            </button>
          </form>

          <p className="text-center mt-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-loose">
            By syncronizing, you accept our <br />
            <span className="text-slate-400 underline cursor-pointer">Neural Protocol</span> & <span className="text-slate-400 underline cursor-pointer">Sovereignty Terms</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
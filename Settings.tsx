
import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Trash2, 
  Download, 
  BrainCircuit, 
  Sparkles, 
  ToggleRight, 
  ToggleLeft,
  Globe,
  Lock,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  // Fix: Added missing Zap icon import
  Zap
} from 'lucide-react';
import { UserSettings, Resume } from '../types';

interface SettingsProps {
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  onReset: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings, resume, setResume, onReset }) => {
  const toggleSetting = (key: keyof UserSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const setTone = (tone: UserSettings['claireTone']) => {
    setSettings(prev => ({ ...prev, claireTone: tone }));
  };

  return (
    <div className="p-10 space-y-12 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-3 h-10 gradient-brand rounded-full" />
          <h1 className="text-5xl font-black text-brand-deep tracking-tighter italic">System <span className="text-brand-primary">Config.</span></h1>
        </div>
        <p className="text-slate-500 font-bold text-lg">Fine-tune your career intelligence and data sovereignty nodes.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Identity Sync */}
          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-brand-deep flex items-center gap-3">
              <User className="text-brand-primary" size={24} />
              Foundation Identity
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Display Name</label>
                <input 
                  type="text" 
                  value={resume.fullName}
                  onChange={(e) => setResume(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-slate-700" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Protocol</label>
                <div className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-400 flex items-center justify-between">
                  {resume.email}
                  <Lock size={14} />
                </div>
              </div>
            </div>
          </section>

          {/* AI Persona Hub */}
          <section className="bg-brand-deep p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full animate-pulse-aurora" />
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-3 italic tracking-tight">
                  <BrainCircuit className="text-brand-accent" size={24} />
                  Claire Persona Node
                </h3>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent animate-pulse">Live Syncing</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {(['direct', 'encouraging', 'academic'] as const).map(tone => (
                  <button
                    key={tone}
                    onClick={() => setTone(tone)}
                    className={`p-6 rounded-[32px] border transition-all flex flex-col items-center gap-4 group/btn ${
                      settings.claireTone === tone 
                        ? 'bg-white text-brand-deep border-white shadow-xl scale-[1.05]' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-brand-accent'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${settings.claireTone === tone ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white/5 text-white/20 group-hover/btn:text-brand-accent'}`}>
                      {tone === 'direct' ? <Zap size={20} /> : tone === 'encouraging' ? <Sparkles size={20} /> : <Globe size={20} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{tone}</span>
                  </button>
                ))}
              </div>
              <p className="text-white/40 text-xs font-medium leading-relaxed italic text-center">
                Persona changes are reflected instantly in all AI generated assets and chat sessions.
              </p>
            </div>
          </section>

          {/* Data Sovereignty */}
          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-brand-deep flex items-center gap-3">
              <Shield className="text-emerald-500" size={24} />
              Data Sovereignty
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Zero-Knowledge Masking</h5>
                    <p className="text-xs text-slate-400 font-medium">Obfuscate sensitive identity data in AI generations.</p>
                  </div>
                </div>
                <button onClick={() => toggleSetting('privacyMode')}>
                  {settings.privacyMode ? <ToggleRight className="text-emerald-500" size={40} /> : <ToggleLeft className="text-slate-200" size={40} />}
                </button>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 p-6 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center gap-4 group hover:bg-brand-aurora hover:border-brand-primary transition-all">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-brand-primary">
                    <Download size={20} />
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-slate-800">Vault Export</h5>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Download JSON Package</p>
                  </div>
                </button>
                <button 
                  onClick={() => { if(confirm('INITIATE NUCLEAR RESET? This will purge all local career data.')) onReset(); }}
                  className="flex-1 p-6 bg-rose-50 border border-rose-100 rounded-[32px] flex items-center gap-4 group hover:bg-rose-500 hover:border-rose-600 transition-all"
                >
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-500 group-hover:text-white">
                    <Trash2 size={20} />
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-slate-800 group-hover:text-white">Nuclear Reset</h5>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest group-hover:text-white/60">Purge Intelligence</p>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
          {/* Notification Engine */}
          <section className="bg-brand-aurora p-10 rounded-[48px] border border-brand-primary/10 space-y-10">
            <h3 className="text-xl font-black text-brand-deep italic">Signals Node</h3>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Bell className="text-brand-primary" size={20} />
                  <span className="text-xs font-black uppercase text-slate-600 tracking-widest">Browser Push</span>
                </div>
                <button onClick={() => toggleSetting('notificationsEnabled')}>
                   {settings.notificationsEnabled ? <ToggleRight className="text-brand-primary" size={32} /> : <ToggleLeft className="text-slate-300" size={32} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-brand-primary" size={20} />
                  <span className="text-xs font-black uppercase text-slate-600 tracking-widest">Daily Email Digest</span>
                </div>
                <button onClick={() => toggleSetting('emailAlerts')}>
                   {settings.emailAlerts ? <ToggleRight className="text-brand-primary" size={32} /> : <ToggleLeft className="text-slate-300" size={32} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Smartphone className="text-brand-primary" size={20} />
                  <span className="text-xs font-black uppercase text-slate-600 tracking-widest">SMS Logic Alerts</span>
                </div>
                <span className="px-2 py-1 bg-brand-primary text-white text-[8px] font-black uppercase rounded-lg">Pro</span>
              </div>
            </div>

            <div className="p-6 bg-white/60 backdrop-blur border border-brand-primary/5 rounded-[32px] text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Sync Frequency</p>
              <p className="text-2xl font-black text-brand-deep italic">600 SECS</p>
            </div>
          </section>

          {/* Security Status */}
          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
             <div className="w-20 h-20 gradient-brand rounded-[24px] flex items-center justify-center text-white mb-6 animate-pulse">
                <Shield size={32} />
             </div>
             <h4 className="text-lg font-black text-brand-deep italic mb-2">Security Protocol A-1</h4>
             <p className="text-xs text-slate-400 font-bold mb-8">All career data encrypted with AES-256 local-first standard.</p>
             <button className="w-full py-4 bg-brand-aurora text-brand-primary rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3">
                <RefreshCw size={14} /> Update Logic Node
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState, useMemo } from 'react';
import { JobAlert, JobMatch } from '../types';
import { Plus, Bell, MapPin, Briefcase, Trash2, Search, Loader2, ExternalLink, Mail, Zap, Filter, ToggleLeft, ToggleRight, Clock, CalendarDays } from 'lucide-react';
import { searchJobs } from '../services/geminiService';

interface JobAlertsProps {
  alerts: JobAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<JobAlert[]>>;
}

const JobAlerts: React.FC<JobAlertsProps> = ({ alerts, setAlerts }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<JobMatch[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [frequencyFilter, setFrequencyFilter] = useState<'All' | 'daily' | 'weekly'>('All');
  
  const [newAlert, setNewAlert] = useState<Partial<JobAlert>>({
    keywords: '',
    location: '',
    industry: '',
    frequency: 'daily',
    isActive: true
  });

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesStatus = 
        statusFilter === 'All' ? true : 
        statusFilter === 'Active' ? alert.isActive : !alert.isActive;
      
      const matchesFrequency = 
        frequencyFilter === 'All' ? true : alert.frequency === frequencyFilter;
        
      return matchesStatus && matchesFrequency;
    });
  }, [alerts, statusFilter, frequencyFilter]);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.keywords) return;

    const alertToAdd: JobAlert = {
      id: Date.now().toString(),
      keywords: newAlert.keywords,
      location: newAlert.location || 'Remote',
      industry: newAlert.industry || 'Tech',
      frequency: newAlert.frequency as 'daily' | 'weekly',
      isActive: true,
      lastChecked: new Date().toISOString().split('T')[0]
    };

    setAlerts(prev => [alertToAdd, ...prev]);
    setShowAddModal(false);
    setNewAlert({ keywords: '', location: '', industry: '', frequency: 'daily', isActive: true });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const toggleAlertStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const runCheck = async (alert: JobAlert) => {
    setIsSearching(true);
    setMatchedJobs([]);
    try {
      const results = await searchJobs(alert.keywords, alert.location, alert.industry);
      setMatchedJobs(results as JobMatch[]);
      
      // Update last checked date in state
      const today = new Date().toISOString().split('T')[0];
      setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, lastChecked: today } : a));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-deep flex items-center gap-2">
            <Bell className="text-brand-primary" />
            Personalized Job Alerts
          </h1>
          <p className="text-slate-500 text-sm mt-1">Get notified when new roles match your criteria.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl hover:bg-brand-deep transition shadow-lg shadow-brand-primary/20 font-bold"
        >
          <Plus size={18} />
          Create Alert
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Alerts List Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Alerts</h3>
            <span className="text-xs font-bold text-brand-primary bg-brand-surface px-2 py-0.5 rounded-full">
              {filteredAlerts.length} total
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-mint shadow-sm space-y-3">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                  <Filter size={10} /> Status
                </div>
                <div className="flex gap-1">
                  {(['All', 'Active', 'Inactive'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setStatusFilter(opt)}
                      className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all border ${
                        statusFilter === opt 
                          ? 'bg-brand-primary text-white border-brand-primary' 
                          : 'bg-brand-surface text-slate-500 border-transparent hover:border-brand-mint'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
             </div>
             
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                  <Clock size={10} /> Frequency
                </div>
                <div className="flex gap-1">
                  {(['All', 'daily', 'weekly'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFrequencyFilter(opt)}
                      className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all border ${
                        frequencyFilter === opt 
                          ? 'bg-brand-primary text-white border-brand-primary' 
                          : 'bg-brand-surface text-slate-500 border-transparent hover:border-brand-mint'
                      }`}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
             </div>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-brand-mint text-center text-slate-400">
              <p className="text-sm">No alerts match these filters.</p>
              <button 
                onClick={() => {setStatusFilter('All'); setFrequencyFilter('All');}}
                className="text-brand-primary text-xs font-bold mt-2 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div key={alert.id} className={`bg-white p-5 rounded-2xl border shadow-sm transition-all group ${alert.isActive ? 'border-brand-mint hover:border-brand-primary' : 'border-slate-100 opacity-60'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-slate-800 text-lg leading-tight">{alert.keywords}</div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className={`text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${alert.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {alert.isActive ? 'Active' : 'Paused'}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded bg-brand-surface text-brand-primary border border-brand-mint">
                        {alert.frequency}
                      </span>
                      {alert.lastChecked && (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                          <Clock size={10} className="text-slate-400" />
                          {alert.lastChecked}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={(e) => toggleAlertStatus(alert.id, e)}
                      className="text-slate-300 hover:text-brand-primary p-1 rounded transition-colors"
                      title={alert.isActive ? "Pause Alert" : "Activate Alert"}
                    >
                      {alert.isActive ? <ToggleRight size={20} className="text-brand-primary" /> : <ToggleLeft size={20} />}
                    </button>
                    <button 
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="text-brand-primary" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Briefcase size={14} className="text-brand-primary" />
                    {alert.industry}
                  </div>
                </div>
                <button 
                  onClick={() => runCheck(alert)}
                  disabled={isSearching || !alert.isActive}
                  className="w-full py-2 px-4 bg-brand-surface border border-brand-mint rounded-lg text-xs font-bold text-brand-primary hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  Check for Matches
                </button>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl border border-brand-mint shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-brand-mint flex justify-between items-center bg-brand-surface/30">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Zap className="text-amber-500" size={18} />
               Latest Matches
             </h3>
             <div className="flex items-center gap-2 text-xs font-bold text-brand-primary">
               <Mail size={14} />
               Email notifications enabled
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {isSearching ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
                <p className="font-medium">Claire is searching the web for matches...</p>
              </div>
            ) : matchedJobs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 text-center">
                <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center">
                   <Search size={32} />
                </div>
                <p className="max-w-xs">Click "Check for Matches" on an alert to see the latest job openings found by AI.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matchedJobs.map((job, idx) => (
                  <div key={idx} className="p-5 bg-brand-surface rounded-2xl border border-brand-mint flex justify-between items-center hover:bg-white hover:shadow-md transition-all group animate-in slide-in-from-right-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex-1 pr-4">
                       <h4 className="font-bold text-slate-800 text-lg group-hover:text-brand-primary transition-colors">{job.title}</h4>
                       <div className="text-sm text-slate-500 font-medium">{job.company} • {job.location}</div>
                    </div>
                    <a 
                      href={job.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white border border-brand-mint text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                ))}
                <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
                   <div className="p-2 bg-amber-100 rounded-lg">
                      <Zap className="text-amber-600" size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-amber-800 mb-1">AI Matching Optimization</h4>
                      <p className="text-sm text-amber-700 leading-relaxed">
                        Claire continuously scans professional networks for these specific criteria. You'll receive an email summary every morning if new high-quality matches are found.
                      </p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-brand-deep/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-md overflow-hidden border border-brand-mint animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-brand-mint flex justify-between items-center bg-brand-primary">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell size={20} />
                New Job Alert
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/70 hover:text-white transition">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleCreateAlert} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Keywords *</label>
                 <input 
                   required 
                   type="text" 
                   className="w-full p-3 border border-brand-mint rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none text-slate-800 placeholder-slate-400" 
                   placeholder="e.g. Senior Frontend Engineer"
                   value={newAlert.keywords} 
                   onChange={e => setNewAlert({...newAlert, keywords: e.target.value})} 
                 />
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                   <input 
                     type="text" 
                     className="w-full p-3 border border-brand-mint rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none text-slate-800 placeholder-slate-400" 
                     placeholder="e.g. Remote"
                     value={newAlert.location} 
                     onChange={e => setNewAlert({...newAlert, location: e.target.value})} 
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Industry</label>
                   <input 
                     type="text" 
                     className="w-full p-3 border border-brand-mint rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none text-slate-800 placeholder-slate-400" 
                     placeholder="e.g. Fintech"
                     value={newAlert.industry} 
                     onChange={e => setNewAlert({...newAlert, industry: e.target.value})} 
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1 text-left">Notification Frequency</label>
                 <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                      type="button"
                      onClick={() => setNewAlert({...newAlert, frequency: 'daily'})}
                      className={`py-2 px-4 rounded-lg text-sm font-bold transition-all border ${newAlert.frequency === 'daily' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-slate-500 border-brand-mint hover:bg-brand-surface'}`}
                    >
                      Daily
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewAlert({...newAlert, frequency: 'weekly'})}
                      className={`py-2 px-4 rounded-lg text-sm font-bold transition-all border ${newAlert.frequency === 'weekly' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-slate-500 border-brand-mint hover:bg-brand-surface'}`}
                    >
                      Weekly
                    </button>
                 </div>
               </div>

               <button 
                 type="submit" 
                 className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-deep transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 mt-4"
               >
                 Create AI Alert
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAlerts;
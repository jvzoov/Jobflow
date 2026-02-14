import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Job, JobStatus } from '../types';
import { TrendingUp, Clock, CheckCircle, XCircle, Award, Download, Briefcase, FileEdit, BarChart3, Bell, AlertCircle, ChevronRight, Activity } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-brand-primary hover:shadow-xl transition-all duration-500">
    <div className="flex items-start justify-between mb-8">
      <div className={`p-4 rounded-2xl ${bg} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-brand-primary transition-colors">Intelligence</div>
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <h3 className="text-4xl font-black text-brand-deep tracking-tighter leading-none">{value}</h3>
    </div>
  </div>
);

interface DashboardProps {
  jobs: Job[];
}

const Dashboard: React.FC<DashboardProps> = ({ jobs }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  // Calculate stats
  const totalJobs = jobs.length;
  const drafts = jobs.filter(j => j.status === JobStatus.DRAFT).length;
  const currentApplied = jobs.filter(j => j.status === JobStatus.APPLIED).length;
  const interviewing = jobs.filter(j => j.status === JobStatus.INTERVIEW).length;
  const offers = jobs.filter(j => j.status === JobStatus.OFFER).length;
  const rejected = jobs.filter(j => j.status === JobStatus.REJECTED).length;
  const accepted = jobs.filter(j => j.status === JobStatus.ACCEPTED).length;

  const upcomingReminders = useMemo(() => {
    return jobs
      .filter(j => j.followUpDate)
      .sort((a, b) => new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime())
      .slice(0, 5);
  }, [jobs]);

  const overdueCount = jobs.filter(j => j.followUpDate && new Date(j.followUpDate) < new Date()).length;

  const activityData = useMemo(() => {
    const data = [];
    const today = new Date();
    let daysToLookBack = 7;
    if (timeRange === '30d') daysToLookBack = 30;
    if (timeRange === 'all') daysToLookBack = 90;

    const appsByDate: Record<string, number> = {};
    const offersByDate: Record<string, number> = {};

    jobs.forEach(job => {
      if (job.dateApplied) {
        const isApp = job.origin === 'application' || (!job.origin && job.status !== JobStatus.OFFER);
        if (isApp) appsByDate[job.dateApplied] = (appsByDate[job.dateApplied] || 0) + 1;
        if (job.status === JobStatus.OFFER || job.status === JobStatus.ACCEPTED) {
          offersByDate[job.dateApplied] = (offersByDate[job.dateApplied] || 0) + 1;
        }
      }
    });
    
    for (let i = daysToLookBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      let displayDay = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (timeRange !== '7d') displayDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      data.push({ name: displayDay, apps: appsByDate[dateString] || 0, offers: offersByDate[dateString] || 0 });
    }
    return data;
  }, [jobs, timeRange]);

  const statusData = [
    { name: 'Applied', count: currentApplied, color: 'bg-brand-primary' },
    { name: 'Interview', count: interviewing, color: 'bg-brand-secondary' },
    { name: 'Offer', count: offers, color: 'bg-brand-accent' },
    { name: 'Accepted', count: accepted, color: 'bg-emerald-500' },
  ];

  const maxStatusCount = Math.max(...statusData.map(d => d.count), 1);

  return (
    <div className="p-10 space-y-12 animate-in fade-in duration-1000 max-w-[1600px] mx-auto min-w-0 bg-brand-aurora/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-3 h-10 gradient-brand rounded-full" />
            <h1 className="text-5xl font-black text-brand-deep tracking-tighter italic">Performance <span className="text-brand-primary">Protocol.</span></h1>
          </div>
          <p className="text-slate-500 font-bold text-lg">Monitoring career iteration cycles and talent velocity.</p>
        </div>
        <div className="flex gap-4">
          {overdueCount > 0 && (
            <div className="bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl text-xs font-black uppercase flex items-center gap-3 border border-rose-100 animate-pulse shadow-sm">
              <AlertCircle size={20} />
              {overdueCount} Critical Events
            </div>
          )}
          <button className="bg-brand-deep text-white px-8 py-4 rounded-[20px] text-sm font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-deep/20 flex items-center gap-3 group active:scale-95">
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            Export Intelligence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        <StatCard title="Target Roles" value={totalJobs} icon={Briefcase} color="text-brand-deep" bg="bg-slate-50" />
        <StatCard title="Draft Assets" value={drafts} icon={FileEdit} color="text-slate-400" bg="bg-slate-50" />
        <StatCard title="Active Cycle" value={currentApplied} icon={TrendingUp} color="text-brand-primary" bg="bg-brand-primary/10" />
        <StatCard title="Interview" value={interviewing} icon={Activity} color="text-brand-secondary" bg="bg-brand-secondary/10" />
        <StatCard title="Offer Stage" value={offers} icon={CheckCircle} color="text-brand-accent" bg="bg-brand-accent/10" />
        <StatCard title="Secured" value={accepted} icon={Award} color="text-emerald-600" bg="bg-emerald-100/50" />
        <StatCard title="Archived" value={rejected} icon={XCircle} color="text-rose-500" bg="bg-rose-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12 min-w-0">
          <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-16 relative z-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-aurora rounded-2xl flex items-center justify-center text-brand-primary">
                   <BarChart3 size={28} />
                </div>
                <h3 className="text-2xl font-black text-brand-deep tracking-tight">Growth Velocity</h3>
              </div>
              <div className="flex bg-slate-100 p-2 rounded-2xl w-fit">
                {(['7d', '30d', 'all'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 md:px-8 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                      timeRange === range ? 'bg-white text-brand-primary shadow-lg scale-105' : 'text-slate-400 hover:text-brand-primary'
                    }`}
                  >
                    {range === '7d' ? '7D' : range === '30d' ? '30D' : 'All'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 
                Fixed: ResponsiveContainer often fails with width(-1) in Flex/Grid. 
                Using width="99%" and a stable aspect ratio + minHeight 
                prevents the dimensions from being 0 or -1 during initial render.
            */}
            <div className="w-full relative z-10 overflow-hidden" style={{ minHeight: '400px' }}>
              <ResponsiveContainer width="99%" height={400} debounce={50}>
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '16px'}} />
                  <Area type="monotone" dataKey="offers" name="Winning Offers" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorOffers)" />
                  <Area type="monotone" dataKey="apps" name="Active Cycles" stroke="#7c3aed" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-brand-deep mb-10 flex items-center gap-4">
              <div className="p-3 bg-brand-aurora rounded-2xl text-brand-primary">
                 <Bell size={24} />
              </div>
              Algorithm Reminders
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingReminders.length === 0 ? (
                <div className="col-span-full h-40 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-[32px] border-4 border-dashed border-slate-100 font-black uppercase tracking-[0.2em] text-[12px] space-y-3">
                  <Clock size={32} className="opacity-20" />
                  <span>No Future Iterations</span>
                </div>
              ) : (
                upcomingReminders.map(job => (
                  <div key={job.id} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex justify-between items-center group hover:bg-white hover:border-brand-primary transition-all duration-500 hover:shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
                        <Clock size={28} />
                      </div>
                      <div>
                        <div className="font-black text-brand-deep text-lg leading-tight group-hover:text-brand-primary transition-colors">{job.role}</div>
                        <div className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mt-2 italic">@ {job.company}</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                       <ChevronRight size={24} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
          <div className="bg-brand-deep p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-[5s] animate-pulse-aurora" />
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-brand-accent mb-10">Success Pipeline</h3>
            <div className="space-y-12 relative z-10">
              {statusData.map((item) => (
                <div key={item.name} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{item.name}</span>
                    <span className="text-xl font-black italic">{item.count}</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-[1.5s] ease-out shadow-[0_0_15px_rgba(124,58,237,0.5)]`}
                      style={{ width: `${(item.count / maxStatusCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-accent p-12 rounded-[56px] text-brand-deep shadow-2xl shadow-brand-accent/30 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
             <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mb-8 shadow-inner animate-float">
                <TrendingUp size={40} />
             </div>
             <p className="text-[12px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Neural Precision</p>
             <h3 className="text-6xl font-black italic tracking-tighter mb-6">98.4%</h3>
             <p className="text-sm font-bold opacity-80 leading-relaxed px-4">System performing at theoretical maximum for your specific profile metadata.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
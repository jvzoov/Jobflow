import React from 'react';
import { LayoutDashboard, Briefcase, FileText, UserCircle2, Settings, LogOut, CheckCircle, Bell, Bookmark, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout?: () => void;
  hasUnreadMessages?: boolean;
}

const LogoIcon = ({ className, size = 32 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="40" height="40" rx="10" fill="currentColor" />
    <path d="M12 28V12H15V25H28V28H12Z" fill="white" />
    <circle cx="28" cy="12" r="5" fill="#06b6d4" />
    <path d="M28 17L22 23" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, hasUnreadMessages = false }) => {
  const mainNavItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.JOBS, label: 'Applications', icon: Briefcase },
    { id: ViewState.SAVED, label: 'Saved Leads', icon: Bookmark },
    { id: ViewState.ALERTS, label: 'Job Alerts', icon: Bell },
    { id: ViewState.OFFERS, label: 'Offers', icon: CheckCircle },
    { id: ViewState.RESUME, label: 'CV Builder', icon: FileText },
    { id: ViewState.AVATAR, label: 'AI Avatar', icon: UserCircle2 },
  ];

  return (
    <div className="w-72 bg-white h-screen border-r border-slate-100 flex flex-col flex-shrink-0 no-print sticky top-0 shadow-sm z-20 overflow-hidden">
      <div className="p-8 flex items-center gap-3 cursor-pointer group" onClick={() => onChangeView(ViewState.DASHBOARD)}>
        <LogoIcon className="text-brand-primary transition-transform group-hover:scale-110 duration-500" size={36} />
        <div className="flex flex-col">
          <span className="text-lg font-black text-brand-deep leading-none tracking-tight">Learnabout</span>
          <span className="text-[10px] font-bold text-brand-primary leading-tight tracking-[0.2em] uppercase">linked.in</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 mt-2">Navigation</p>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group font-bold ${
                isActive
                  ? 'bg-slate-50 text-brand-primary shadow-sm ring-1 ring-slate-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-brand-primary' : 'text-slate-300 group-hover:text-brand-primary transition-colors'} />
                <span className="text-sm">{item.label}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
            </button>
          );
        })}

        <div className="my-6 border-t border-slate-100 mx-2"></div>
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">AI Strategist</p>

        <button
          onClick={() => onChangeView(ViewState.CLAIRE)}
          className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group font-bold border ${
            currentView === ViewState.CLAIRE
              ? 'bg-brand-primary text-white border-brand-primary shadow-lg'
              : 'border-slate-100 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-lg ${currentView === ViewState.CLAIRE ? 'bg-white/20' : 'bg-slate-50 text-brand-primary'}`}>
             <span className="text-xs">🤖</span>
          </div>
          <span className="text-sm">Claire AI</span>
          {hasUnreadMessages && (
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-auto"></span>
          )}
        </button>
      </nav>

      <div className="p-4 border-t border-slate-100 mt-auto">
        <button 
          onClick={() => onChangeView(ViewState.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold text-sm ${
            currentView === ViewState.SETTINGS ? 'text-brand-primary bg-slate-50' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors font-bold text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
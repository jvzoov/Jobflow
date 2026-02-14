import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import JobTracker from './components/JobTracker';
import ResumeBuilder from './components/ResumeBuilder';
import AvatarGenerator from './components/AvatarGenerator';
import JobAlerts from './components/JobAlerts';
import ClaireChat from './components/ClaireChat';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import SafetyProtocol from './components/SafetyProtocol';
import TermsOfIteration from './components/TermsOfIteration';
import GlobalNodes from './components/GlobalNodes';
import CVEvolution from './components/CVEvolution';
import SEOAuditNode from './components/SEOAuditNode';
import ClaireHub from './components/ClaireHub';
import NewslettersPage from './components/NewslettersPage';
import ProcessView from './components/ProcessView';
import AILabView from './components/AILabView';
import MethodologyPage from './components/MethodologyPage';
import FreeToolsSuite from './components/FreeToolsSuite';
import AuthModal from './components/AuthModal';
import { Job, ViewState, Resume, Message, JobStatus, JobAlert, UserSettings } from './types';
import { Loader2, Bell, X, Briefcase } from 'lucide-react';

const STORAGE_KEYS = {
  AUTH: 'jobflow_auth_v3',
  JOBS: 'jobflow_jobs_v3',
  ALERTS: 'jobflow_alerts_v3',
  RESUME: 'jobflow_resume_v3',
  MESSAGES: 'jobflow_messages_v3',
  SETTINGS: 'jobflow_settings_v3'
};

const DEFAULT_SETTINGS: UserSettings = {
  claireTone: 'encouraging',
  notificationsEnabled: true,
  emailAlerts: true,
  privacyMode: false,
  language: 'English'
};

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

const DEFAULT_RESUME: Resume = {
  fullName: 'Jordan Smith',
  email: 'jordan.s@learnaboutlinked.in',
  phone: '+1 (555) 789-0123',
  summary: 'Growth-focused professional using Learnaboutlinked.in to optimize career visibility and learn about LinkedIn algorithms.',
  skills: 'Career Strategy, LinkedIn SEO, Data Analysis, Professional Branding',
  experience: [
    {
      id: '1',
      title: 'Strategy Associate',
      company: 'GrowthHub',
      date: '2022 - Present',
      details: 'Managing cross-functional career development programs. Increased team visibility on professional networks by 60%.'
    }
  ],
  education: [
    {
      id: '1',
      title: 'M.B.A.',
      company: 'Business School Elite',
      date: '2020 - 2022',
      details: 'Focus on Digital Transformation and Career Networking.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Linked Evolution',
      technologies: 'AI, Networking Data',
      link: 'learnaboutlinked.in/case-study',
      description: 'A study on how iterative CV updates affect interview rates across major tech hubs.'
    }
  ]
};

const INITIAL_CLAIRE_MESSAGE: Message = {
  id: 'welcome',
  role: 'model',
  text: "Hello! I am Claire. Welcome to Learnaboutlinked.in. Ready to optimize your professional node and master your story?"
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(
    isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING
  );
  
  const [activeReminder, setActiveReminder] = useState<Job | null>(null);
  
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [alerts, setAlerts] = useState<JobAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALERTS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [resume, setResume] = useState<Resume>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUME);
      return saved ? JSON.parse(saved) : DEFAULT_RESUME;
    } catch (e) { return DEFAULT_RESUME; }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch (e) { return DEFAULT_SETTINGS; }
  });

  const [claireMessages, setClaireMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [INITIAL_CLAIRE_MESSAGE];
    } catch (e) { return [INITIAL_CLAIRE_MESSAGE]; }
  });

  const [unreadClaire, setUnreadClaire] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts)); }, [alerts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resume)); }, [resume]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(claireMessages)); }, [claireMessages]);

  useEffect(() => {
    if (currentView === ViewState.CLAIRE) {
      setUnreadClaire(false);
    }
  }, [currentView]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const triggered = jobs.find(job => 
        job.followUpDate && 
        !job.followUpNotified && 
        new Date(job.followUpDate) <= now &&
        job.status !== JobStatus.ACCEPTED &&
        job.status !== JobStatus.REJECTED
      );
      if (triggered) {
        setActiveReminder(triggered);
        setJobs(prev => prev.map(j => j.id === triggered.id ? { ...j, followUpNotified: true } : j));
      }
    };
    const interval = setInterval(checkReminders, 10000);
    return () => clearInterval(interval);
  }, [jobs]);

  const handleLinkedInLogin = () => {
    setShowAuthModal(false);
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      setIsAuthenticating(false);
      setCurrentView(ViewState.DASHBOARD);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    setCurrentView(ViewState.LANDING);
  };

  const handleReset = () => {
    setJobs([]);
    setAlerts([]);
    setResume(DEFAULT_RESUME);
    setClaireMessages([INITIAL_CLAIRE_MESSAGE]);
    setSettings(DEFAULT_SETTINGS);
    setCurrentView(ViewState.DASHBOARD);
    localStorage.clear();
  };

  const renderContent = () => {
    if (currentView === ViewState.SAFETY) return <SafetyProtocol onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} />;
    if (currentView === ViewState.TERMS) return <TermsOfIteration onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} />;
    if (currentView === ViewState.NODES) return <GlobalNodes onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} />;
    if (currentView === ViewState.CV_EVOLUTION) return <CVEvolution onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.SEO_AUDIT) return <SEOAuditNode onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.CLAIRE_HUB) return <ClaireHub onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.NEWSLETTERS) return <NewslettersPage onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.PROCESS) return <ProcessView onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} jobs={jobs} setJobs={setJobs} resume={resume} />;
    if (currentView === ViewState.AI_LAB) return <AILabView onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.METHODOLOGY) return <MethodologyPage onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;
    if (currentView === ViewState.TOOLS_HUB) return <FreeToolsSuite onBack={() => setCurrentView(isAuthenticated ? ViewState.DASHBOARD : ViewState.LANDING)} onGetStarted={() => setShowAuthModal(true)} isAuthenticated={isAuthenticated} />;

    if (!isAuthenticated || currentView === ViewState.LANDING) {
      return (
        <>
          <LandingPage onGetStarted={() => setShowAuthModal(true)} onNavigate={(v) => setCurrentView(v)} />
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
            onLogin={handleLinkedInLogin} 
          />
        </>
      );
    }

    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard jobs={jobs} />;
      case ViewState.JOBS: return <JobTracker jobs={jobs} setJobs={setJobs} resume={resume} viewMode="applications" />;
      case ViewState.OFFERS: return <JobTracker jobs={jobs} setJobs={setJobs} resume={resume} viewMode="offers" />;
      case ViewState.SAVED: return <JobTracker jobs={jobs} setJobs={setJobs} resume={resume} viewMode="saved" />;
      case ViewState.ALERTS: return <JobAlerts alerts={alerts} setAlerts={setAlerts} />;
      case ViewState.RESUME: return <ResumeBuilder resume={resume} setResume={setResume} />;
      case ViewState.AVATAR: return <AvatarGenerator onAttachToResume={(url) => setResume(p => ({...p, avatar: url}))} />;
      case ViewState.CLAIRE: return <ClaireChat messages={claireMessages} setMessages={setClaireMessages} tone={settings.claireTone} />;
      case ViewState.SETTINGS: return <Settings settings={settings} setSettings={setSettings} resume={resume} setResume={setResume} onReset={handleReset} />;
      default: return <Dashboard jobs={jobs} />;
    }
  };

  if (isAuthenticating) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white animate-in fade-in duration-500">
        <div className="mb-10 text-brand-primary">
          <LogoIcon size={80} />
        </div>
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-8 py-4 rounded-full">
          <Loader2 className="animate-spin text-brand-primary" size={24} />
          <span className="text-slate-600 font-bold uppercase tracking-widest text-sm">Authenticating Protocol...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-brand-surface text-brand-deep font-sans ${!isAuthenticated ? 'overflow-auto' : ''}`}>
      {isAuthenticated && (
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          hasUnreadMessages={unreadClaire}
          onLogout={handleLogout}
        />
      )}
      <main className={`flex-1 h-screen overflow-auto relative custom-scrollbar ${!isAuthenticated ? 'w-full' : ''}`}>
        {renderContent()}
        {activeReminder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-deep/20 backdrop-blur-md animate-in fade-in duration-500">
             <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in zoom-in-95">
                <div className="p-12 text-center flex flex-col items-center">
                   <div className="w-20 h-20 bg-brand-primary rounded-[24px] flex items-center justify-center text-white mb-8 animate-bounce shadow-xl">
                      <Bell size={40} />
                   </div>
                   <h2 className="text-2xl font-bold text-brand-deep mb-4">Follow-up Required</h2>
                   <p className="text-slate-500 mb-10 font-medium">
                     Time to re-engage with <span className="text-brand-primary font-bold">{activeReminder.company}</span> for the <span className="text-brand-primary font-bold">{activeReminder.role}</span> role.
                   </p>
                   <div className="w-full space-y-4">
                      <button onClick={() => { setCurrentView(ViewState.JOBS); setActiveReminder(null); }} className="w-full py-5 gradient-brand text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
                        <Briefcase size={20} /> Open Tracker
                      </button>
                      <button onClick={() => setActiveReminder(null)} className="w-full py-4 text-slate-400 font-bold text-sm hover:text-slate-600">
                        Dismiss
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
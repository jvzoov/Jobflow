import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Job, JobStatus, Resume } from '../types';
import { generateCoverLetter, generateInterviewGuide } from '../services/geminiService';
import { 
  Plus, Search, MapPin, DollarSign, Calendar, ChevronRight, ChevronDown, 
  X, Loader2, Sparkles, Trash2, FileText, BookOpen, Save, Wand2, 
  SlidersHorizontal, Mail, Check, Bookmark, Bell, ExternalLink, 
  Briefcase, Linkedin, Copy, Link2, Globe, Clock, CheckSquare,
  Circle
} from 'lucide-react';

interface JobTrackerProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  resume: Resume;
  viewMode?: 'applications' | 'offers' | 'saved';
  onStatusChange?: (job: Job, newStatus: JobStatus) => void;
}

type SortOption = 'Newest' | 'Salary High-Low' | 'Salary Low-High' | 'Company A-Z';

// Enhanced Custom Dropdown for Job Filtering
const FilterDropdown = ({ 
  label, 
  value, 
  options, 
  onChange, 
  icon: Icon,
  className = "" 
}: { 
  label: string; 
  value: string; 
  options: { label: string; value: string }[]; 
  onChange: (val: string) => void; 
  icon: React.ElementType;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || label;
  const isDefault = value === 'All';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-2.5 bg-white border rounded-xl text-xs font-bold transition-all shadow-sm ${
          isOpen 
            ? 'ring-2 ring-brand-primary/10 border-brand-primary text-brand-primary' 
            : isDefault 
              ? 'border-brand-mint text-slate-600 hover:border-brand-primary/50' 
              : 'border-brand-primary/40 text-brand-primary bg-brand-primary/5'
        }`}
      >
        <Icon size={16} className={isDefault ? 'text-slate-400' : 'text-brand-primary'} />
        <span className="truncate max-w-[140px]">{selectedLabel}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-brand-mint rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 mb-1 border-b border-brand-mint/50">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
          </div>
          <div className="max-h-72 overflow-y-auto custom-scrollbar p-1">
            {options.map((opt) => {
              const isActive = value === opt.value;
              const isAllOption = opt.value === 'All';
              
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between mb-0.5 ${
                    isActive 
                      ? 'bg-brand-primary text-white' 
                      : 'text-slate-600 hover:bg-brand-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isAllOption ? (
                      <Circle size={14} className={isActive ? 'text-white' : 'text-slate-300'} />
                    ) : (
                      <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                    )}
                    <span className={isAllOption ? 'uppercase tracking-wide' : ''}>{opt.label}</span>
                  </div>
                  {isActive && <Check size={14} className="text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;
  const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return <span>{text}</span>;
  const pattern = new RegExp(`(${keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <span>
      {parts.map((part, i) => (
        keywords.some(kw => part.toLowerCase() === kw.toLowerCase()) ? (
          <mark key={i} className="bg-brand-primary/20 text-brand-deep rounded-sm px-0.5 border-b border-brand-primary/30 font-semibold">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </span>
  );
};

const FormattedDisplay = ({ text }: { text: string | undefined }) => {
  if (!text) return <div className="h-full flex items-center justify-center text-slate-400 italic">No content generated yet.</div>;
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
         const trimmed = line.trim();
         if (!trimmed) return <div key={i} className="h-3" />;
         if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 80) {
            return <h3 key={i} className="text-brand-primary font-bold text-base mt-4 mb-2">{trimmed.replace(/\*\*/g, '')}</h3>;
         }
         return <p key={i} className="text-slate-700 text-sm leading-relaxed mb-1">{line.replace(/\*\*/g, '')}</p>;
      })}
    </div>
  );
};

const JobTracker: React.FC<JobTrackerProps> = ({ jobs, setJobs, resume, viewMode = 'applications', onStatusChange }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMappingData, setIsMappingData] = useState(false);
  const [mappingStep, setMappingStep] = useState(0);
  
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [salaryFilter, setSalaryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [linkFilter, setLinkFilter] = useState<'All' | 'Has Link' | 'No Link'>('All');
  
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);

  const handleGenerateInterviewGuide = async () => {
    if (!selectedJob) return;
    setIsGeneratingGuide(true);
    try {
      const guide = await generateInterviewGuide(selectedJob.company, selectedJob.role, selectedJob.description);
      setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, interviewGuide: guide } : j));
      setSelectedJob(prev => prev ? { ...prev, interviewGuide: guide } : null);
    } catch (error) {
      console.error("Failed to generate interview guide", error);
    } finally {
      setIsGeneratingGuide(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!selectedJob) return;
    setIsGeneratingLetter(true);
    try {
      const letter = await generateCoverLetter(selectedJob.company, selectedJob.role, selectedJob.description, resume.skills);
      setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, coverLetter: letter } : j));
      setSelectedJob(prev => prev ? { ...prev, coverLetter: letter } : null);
    } catch (error) {
      console.error("Failed to generate cover letter", error);
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Negotiable';
    if (min && !max) return `$${(min/1000).toFixed(0)}k+`;
    if (!min && max) return `Up to $${(max/1000).toFixed(0)}k`;
    return `$${(min!/1000).toFixed(0)}k - $${(max!/1000).toFixed(0)}k`;
  };

  const handleApplyViaLinkedIn = (link: string) => {
    setIsMappingData(true);
    setMappingStep(0);
    const interval = setInterval(() => {
      setMappingStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setIsMappingData(false);
            window.open(link, '_blank', 'noopener,noreferrer');
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  const handleApplyViaEmail = (job: Job) => {
    if (!job.email) return;
    const subject = encodeURIComponent(`Application: ${job.role} at ${job.company} - ${resume.fullName}`);
    
    // Clean body text (remove markdown formatting for email client compatibility)
    const cleanLetter = job.coverLetter 
      ? job.coverLetter.replace(/\*\*/g, '').replace(/###/g, '').replace(/# /g, '').replace(/\* /g, '• ')
      : `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${job.role} position at ${job.company}. Based on the job description, I believe my background makes me an excellent candidate for the role.\n\nPlease find my resume attached for your review. I would welcome the opportunity to discuss how my skills and experience can contribute to the team at ${job.company}.\n\nBest regards,\n\n${resume.fullName}\n${resume.email}\n${resume.phone}`;

    const body = encodeURIComponent(cleanLetter);
    window.location.href = `mailto:${job.email}?subject=${subject}&body=${body}`;
  };

  const handleStatusChange = (jobId: string, newStatusStr: string) => {
    const newStatus = newStatusStr as JobStatus;
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
    if (selectedJob && selectedJob.id === jobId) setSelectedJob(prev => prev ? { ...prev, status: newStatus } : null);
    if (onStatusChange) {
      const job = jobs.find(j => j.id === jobId);
      if (job) onStatusChange(job, newStatus);
    }
  };

  const handleToggleSave = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
    // If detail view is open for this job, update the local selectedJob state as well
    if (selectedJob?.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, isSaved: !prev.isSaved } : null);
    }
  };

  // Pre-configured filter options
  const salaryRanges = [
    { label: 'All Salaries', value: 'All' },
    { label: '< $80k', value: '0-80000' },
    { label: '$80k - $120k', value: '80000-120000' },
    { label: '$120k - $180k', value: '120000-180000' },
    { label: '$180k - $250k', value: '180000-250000' },
    { label: '$250k+', value: '250000-plus' }
  ];

  const uniqueLocations = useMemo(() => {
    const locs = new Set(jobs.map(j => j.location).filter(Boolean));
    return ['All', ...Array.from(locs).sort()];
  }, [jobs]);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(localSearchQuery), 300);
    return () => clearTimeout(timer);
  }, [localSearchQuery]);

  const displayedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      let matchesView = false;
      const isOffersMode = viewMode === 'offers';
      const isSavedMode = viewMode === 'saved';

      if (isSavedMode) matchesView = !!job.isSaved;
      else {
        const isOfferType = job.status === JobStatus.OFFER || job.status === JobStatus.ACCEPTED;
        matchesView = isOffersMode ? isOfferType : !isOfferType;
      }

      if (!matchesView) return false;
      if (statusFilter !== 'All' && job.status !== statusFilter) return false;
      if (locationFilter !== 'All' && job.location !== locationFilter) return false;
      if (linkFilter === 'Has Link' && !job.link) return false;
      if (linkFilter === 'No Link' && job.link) return false;
      
      if (salaryFilter !== 'All') {
        const minVal = job.minSalary || 0;
        const maxVal = job.maxSalary || minVal;
        
        if (salaryFilter === '0-80000' && minVal >= 80000) return false;
        if (salaryFilter === '80000-120000' && (maxVal < 80000 || minVal > 120000)) return false;
        if (salaryFilter === '120000-180000' && (maxVal < 120000 || minVal > 180000)) return false;
        if (salaryFilter === '180000-250000' && (maxVal < 180000 || minVal > 250000)) return false;
        if (salaryFilter === '250000-plus' && maxVal < 250000) return false;
      }
      
      if (searchQuery.trim()) {
        const kw = searchQuery.toLowerCase();
        return job.company.toLowerCase().includes(kw) || job.role.toLowerCase().includes(kw) || job.location.toLowerCase().includes(kw);
      }
      return true;
    });
    return filtered.sort((a, b) => b.id.localeCompare(a.id));
  }, [jobs, viewMode, statusFilter, locationFilter, salaryFilter, linkFilter, searchQuery]);

  return (
    <div className="h-full flex flex-col relative bg-brand-surface">
      {/* LinkedIn Mapping Loading State */}
      {isMappingData && (
        <div className="fixed inset-0 z-[200] bg-brand-deep/60 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
           <div className="relative mb-8">
              <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                 <Linkedin size={48} className="text-brand-primary" fill="currentColor" />
                 <div className="absolute bottom-0 left-0 right-0 bg-brand-primary/10 transition-all duration-500 ease-out" style={{ height: `${(mappingStep / 5) * 100}%` }} />
              </div>
           </div>
           <h2 className="text-3xl font-black mb-2 tracking-tight">AI LinkedIn Integration</h2>
           <p className="text-white/70 font-bold">Mapping professional profile for {resume.fullName}...</p>
        </div>
      )}

      {/* Header */}
      <div className="p-8 pb-4 flex justify-between items-center border-b border-brand-mint bg-white/80 backdrop-blur sticky top-0 z-30 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {viewMode === 'offers' ? 'Offers Received' : viewMode === 'saved' ? 'Saved Leads' : 'My Applications'}
          </h1>
          <p className="text-slate-500 text-sm font-medium">{displayedJobs.length} roles tracked</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-deep transition-all shadow-lg shadow-brand-primary/20 font-bold active:scale-95">
          <Plus size={20} />
          <span>Add Role</span>
        </button>
      </div>

      {/* Enhanced Filter Bar with Dropdowns and Icons */}
      <div className="px-8 py-5 bg-white border-b border-brand-mint sticky top-[89px] z-20 flex flex-col gap-5 shadow-sm">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={20} />
          <input 
            type="text" 
            value={localSearchQuery} 
            onChange={(e) => setLocalSearchQuery(e.target.value)} 
            placeholder="Search company, role or location..." 
            className="w-full pl-12 pr-12 py-4 bg-brand-surface/50 border border-brand-mint rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all text-sm font-bold text-slate-700" 
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown 
            label="Status" 
            value={statusFilter} 
            onChange={(val) => setStatusFilter(val as any)} 
            icon={CheckSquare}
            options={[{ label: 'All Statuses', value: 'All' }, ...Object.values(JobStatus).map(s => ({ label: s, value: s }))]}
          />

          <FilterDropdown 
            label="Location" 
            value={locationFilter} 
            onChange={setLocationFilter} 
            icon={MapPin}
            options={uniqueLocations.map(l => ({ label: l === 'All' ? 'All Locations' : l, value: l }))}
          />

          <FilterDropdown 
            label="Salary Range" 
            value={salaryFilter} 
            onChange={setSalaryFilter} 
            icon={DollarSign}
            options={salaryRanges}
          />

          <FilterDropdown 
            label="Origin" 
            value={linkFilter} 
            onChange={(val) => setLinkFilter(val as any)} 
            icon={Globe}
            options={[
              { label: 'All Sources', value: 'All' },
              { label: 'With Apply Link', value: 'Has Link' },
              { label: 'No Link Found', value: 'No Link' }
            ]}
          />

          {(statusFilter !== 'All' || locationFilter !== 'All' || salaryFilter !== 'All' || linkFilter !== 'All' || localSearchQuery) && (
            <button 
              type="button"
              onClick={() => { setStatusFilter('All'); setLocationFilter('All'); setSalaryFilter('All'); setLinkFilter('All'); setLocalSearchQuery(''); }} 
              className="ml-auto text-xs font-black uppercase text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1.5"
            >
              <X size={14} />
              Reset All
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Job List Column */}
        <div className={`flex-1 overflow-y-auto p-8 custom-scrollbar ${selectedJob ? 'w-1/2 hidden md:block' : 'w-full'}`}>
           <div className="grid grid-cols-1 gap-4">
             {displayedJobs.map(job => {
               const isOverdue = job.followUpDate && new Date(job.followUpDate) < new Date();
               return (
                 <div 
                   key={job.id} 
                   onClick={() => { setSelectedJob(job); setEditedDescription(job.description); setIsEditingDescription(false); }} 
                   className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer hover:shadow-xl group relative overflow-hidden ${selectedJob?.id === job.id ? 'border-brand-primary ring-2 ring-brand-primary/10' : 'border-brand-mint'}`}
                 >
                   <div className="absolute top-0 right-0 p-2">
                     <button 
                       type="button"
                       onClick={(e) => handleToggleSave(e, job.id)}
                       title={job.isSaved ? "Unsave Job" : "Save Job"}
                       className={`p-1.5 rounded-full transition-all hover:scale-110 active:scale-95 ${job.isSaved ? 'text-brand-primary bg-brand-surface' : 'text-slate-200 group-hover:text-slate-400 bg-transparent hover:bg-slate-100'}`}
                     >
                        <Bookmark size={18} fill={job.isSaved ? "currentColor" : "none"} />
                     </button>
                   </div>

                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-surface border border-brand-mint flex items-center justify-center text-brand-primary font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                          {job.company.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-brand-primary transition-colors text-lg leading-tight">
                            <Highlight text={job.role} query={searchQuery} />
                          </h3>
                          <p className="text-slate-500 font-semibold">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                        {job.followUpDate && (
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-tighter ${isOverdue ? 'bg-rose-50 border-rose-100 text-rose-500 animate-pulse' : 'bg-brand-surface border-brand-mint text-slate-400'}`}>
                            <Bell size={12} />
                            {isOverdue ? 'Overdue' : `Follow-up: ${new Date(job.followUpDate).toLocaleDateString()}`}
                          </div>
                        )}
                      </div>
                   </div>

                   <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-brand-mint/50 pt-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-brand-primary" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-brand-primary" />
                        <span className="font-medium">{formatSalary(job.minSalary, job.maxSalary)}</span>
                      </div>
                      {job.email && (
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleApplyViaEmail(job); }}
                          className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-tighter hover:text-brand-primary transition-colors group/btn"
                        >
                          <Mail size={14} className="group-hover/btn:scale-110 transition-transform" /> 
                          <span>Quick Apply</span>
                        </button>
                      )}
                      <div className="flex items-center gap-2 ml-auto text-slate-400 font-bold uppercase tracking-tighter">
                        <Calendar size={14} /> {job.dateApplied}
                      </div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Detail Panel */}
        {selectedJob && (
          <div className="w-full md:w-[600px] border-l border-brand-mint bg-slate-50 flex flex-col h-full shadow-2xl z-40 absolute md:static inset-0 animate-in slide-in-from-right duration-300">
             <div className="p-8 border-b border-brand-mint bg-white shadow-sm space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-2xl shadow-inner">
                       {selectedJob.company.substring(0,1)}
                     </div>
                     <div>
                       <h2 className="text-2xl font-black text-slate-800 leading-tight mb-1">{selectedJob.role}</h2>
                       <div className="text-brand-primary font-bold flex items-center gap-2">
                         {selectedJob.company}
                         {selectedJob.link && <a href={selectedJob.link} target="_blank" rel="noopener" className="p-1.5 bg-brand-surface rounded-lg hover:bg-brand-mint transition-colors"><ExternalLink size={14} /></a>}
                       </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={(e) => handleToggleSave(e, selectedJob.id)}
                      className={`p-2 rounded-xl transition-all border ${selectedJob.isSaved ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-slate-50 border-brand-mint text-slate-400 hover:text-slate-600'}`}
                      title={selectedJob.isSaved ? "Remove from Saved" : "Save this Job"}
                    >
                      <Bookmark size={20} fill={selectedJob.isSaved ? "currentColor" : "none"} />
                    </button>
                    <button type="button" onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-brand-primary transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedJob.link && (
                    <button 
                      type="button"
                      onClick={() => handleApplyViaLinkedIn(selectedJob.link!)} 
                      className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-[24px] font-black text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-xl shadow-indigo-600/30 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <Linkedin size={24} fill="currentColor" />
                      <span>Apply via LinkedIn</span>
                    </button>
                  )}
                  {selectedJob.email && (
                    <div className="flex gap-3">
                       <button 
                        type="button"
                        onClick={() => handleApplyViaEmail(selectedJob)} 
                        className="flex-1 flex items-center justify-center gap-3 bg-slate-800 text-white py-5 rounded-[24px] font-black text-lg hover:bg-slate-950 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]"
                      >
                         <Mail size={24} />
                         <span>Apply via Email</span>
                       </button>
                       <button 
                        type="button"
                        onClick={() => { navigator.clipboard.writeText(selectedJob.email); setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }} 
                        className={`px-6 rounded-[24px] border transition-all flex items-center justify-center ${copiedEmail ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-brand-mint text-slate-600 hover:bg-brand-surface'}`}
                        title="Copy Contact Email"
                      >
                         {copiedEmail ? <Check size={24} /> : <Copy size={24} />}
                       </button>
                    </div>
                  )}
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                <div className="p-6 bg-white rounded-3xl border border-brand-mint shadow-sm space-y-6">
                   <div className="flex items-center justify-between border-b border-brand-mint pb-4">
                      <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                        <SlidersHorizontal size={14} className="text-brand-primary" /> Application Details
                      </h3>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Status</span>
                         <select value={selectedJob.status} onChange={(e) => handleStatusChange(selectedJob.id, e.target.value)} className="w-full p-3 bg-brand-surface border border-brand-mint rounded-xl text-sm font-bold text-brand-primary outline-none cursor-pointer hover:bg-white transition-colors">
                            {Object.values(JobStatus).map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Salary</span>
                         <div className="p-3 bg-brand-surface border border-brand-mint rounded-xl text-sm font-bold text-slate-700">
                           {formatSalary(selectedJob.minSalary, selectedJob.maxSalary)}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Enhanced Job Link Display with Placeholder */}
                <div className="p-6 bg-white rounded-3xl border border-brand-mint shadow-sm space-y-4">
                   <div className="flex items-center justify-between">
                      <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                        <Link2 size={14} className="text-brand-primary" /> Application Source Link
                      </h3>
                   </div>
                   {selectedJob.link ? (
                     <a 
                       href={selectedJob.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="group/link flex items-center gap-3 p-4 bg-brand-surface rounded-2xl border border-brand-mint hover:border-brand-primary/40 hover:bg-white transition-all shadow-inner"
                     >
                       <div className="p-2 bg-white rounded-xl shadow-sm border border-brand-mint group-hover/link:bg-brand-primary group-hover/link:text-white transition-colors">
                         <Globe size={18} />
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Original Posting</div>
                         <div className="text-brand-primary font-bold text-xs truncate">{selectedJob.link}</div>
                       </div>
                       <ExternalLink size={16} className="text-slate-400 group-hover/link:text-brand-primary transition-colors" />
                     </a>
                   ) : (
                     <div className="p-5 bg-brand-surface rounded-2xl border border-brand-mint border-dashed text-slate-400 text-sm italic text-center">
                       No source link provided for this role.
                     </div>
                   )}
                </div>

                <div className="p-6 bg-white rounded-3xl border border-brand-mint shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                      <Bell size={14} className="text-brand-primary" /> Follow-up Reminders
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="datetime-local" 
                      className="flex-1 p-3 border border-brand-mint rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary bg-brand-surface font-bold text-slate-700" 
                      value={selectedJob.followUpDate || ''} 
                      onChange={(e) => setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, followUpDate: e.target.value, followUpNotified: false } : j))} 
                    />
                    {selectedJob.followUpDate && (
                      <button type="button" onClick={() => setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, followUpDate: undefined } : j))} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-brand-mint shadow-sm space-y-4">
                   <div className="flex items-center justify-between">
                      <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                        <FileText size={14} className="text-brand-primary" /> Job Description
                      </h3>
                      <button type="button" onClick={() => setIsEditingDescription(!isEditingDescription)} className="text-[10px] font-black uppercase text-brand-primary hover:underline">
                        {isEditingDescription ? 'Cancel' : 'Edit'}
                      </button>
                   </div>
                   {isEditingDescription ? (
                     <div className="space-y-3">
                        <textarea 
                          value={editedDescription} 
                          onChange={e => setEditedDescription(e.target.value)} 
                          className="w-full p-4 border border-brand-primary/50 rounded-2xl text-sm min-h-[300px] outline-none shadow-inner bg-brand-surface font-medium" 
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, description: editedDescription } : j));
                            setIsEditingDescription(false);
                          }}
                          className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-deep transition-colors"
                        >
                          Save Changes
                        </button>
                     </div>
                   ) : (
                     <div className="text-slate-600 text-sm whitespace-pre-wrap font-medium leading-relaxed">{selectedJob.description || 'No description provided.'}</div>
                   )}
                </div>

                {/* AI-powered application assets */}
                <div className="space-y-4">
                  <button 
                    type="button"
                    onClick={() => handleGenerateInterviewGuide()}
                    disabled={isGeneratingGuide}
                    className="w-full p-6 bg-violet-50 border border-violet-100 rounded-3xl text-left group hover:border-violet-300 transition-all flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-600">
                         <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-violet-900 text-sm">AI Interview Preparation</h4>
                        <p className="text-violet-600/70 text-xs font-bold uppercase tracking-tighter">Generate custom prep guide</p>
                      </div>
                    </div>
                    {isGeneratingGuide ? <Loader2 className="animate-spin text-violet-400" /> : <ChevronRight className="text-violet-400 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  {selectedJob.interviewGuide && (
                    <div className="p-6 bg-white rounded-3xl border border-brand-mint animate-in fade-in duration-500 shadow-sm">
                       <FormattedDisplay text={selectedJob.interviewGuide} />
                    </div>
                  )}

                  <button 
                    type="button"
                    onClick={() => handleGenerateCoverLetter()}
                    disabled={isGeneratingLetter}
                    className="w-full p-6 bg-rose-50 border border-rose-100 rounded-3xl text-left group hover:border-rose-300 transition-all flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-600">
                         <Wand2 size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-rose-900 text-sm">Tailored Cover Letter</h4>
                        <p className="text-rose-600/70 text-xs font-bold uppercase tracking-tighter">AI-written for this role</p>
                      </div>
                    </div>
                    {isGeneratingLetter ? <Loader2 className="animate-spin text-rose-400" /> : <ChevronRight className="text-rose-400 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  {selectedJob.coverLetter && (
                    <div className="p-6 bg-white rounded-3xl border border-brand-mint space-y-4 animate-in fade-in duration-500 shadow-sm">
                       <FormattedDisplay text={selectedJob.coverLetter} />
                       <div className="flex gap-3">
                         <button onClick={() => navigator.clipboard.writeText(selectedJob.coverLetter)} className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-brand-primary bg-brand-surface px-4 py-3 rounded-xl border border-brand-mint hover:bg-white transition-colors">
                          <Check size={14} /> Copy to Clipboard
                        </button>
                        {selectedJob.email && (
                          <button onClick={() => handleApplyViaEmail(selectedJob)} className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-brand-primary px-4 py-3 rounded-xl hover:bg-brand-deep transition-all shadow-md">
                            <Mail size={14} /> Send via Email
                          </button>
                        )}
                       </div>
                    </div>
                  )}
                </div>
             </div>

             <div className="p-4 bg-white border-t border-brand-mint flex justify-end gap-3">
                <button type="button" onClick={() => { if(confirm('Remove this application from tracking?')) { setJobs(prev => prev.filter(j => j.id !== selectedJob.id)); setSelectedJob(null); } }} className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-rose-500 hover:bg-rose-50 transition-colors">
                  Delete Role
                </button>
             </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-brand-deep/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-brand-mint animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-brand-mint flex justify-between items-center bg-brand-primary">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Briefcase size={24} /> Track Role
              </h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white p-2 transition-colors"><X size={28} /></button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const job: Job = {
                  id: Date.now().toString(),
                  company: data.get('company') as string,
                  role: data.get('role') as string,
                  location: data.get('location') as string || 'Remote',
                  status: JobStatus.APPLIED,
                  dateApplied: new Date().toISOString().split('T')[0],
                  description: data.get('description') as string,
                  email: data.get('email') as string || '',
                  link: data.get('link') as string || '',
                  coverLetter: '',
                  minSalary: Number(data.get('minSalary')) || undefined,
                  maxSalary: Number(data.get('maxSalary')) || undefined,
                };
                setJobs(prev => [job, ...prev]);
                setShowAddModal(false);
              }} 
              className="p-8 space-y-6 overflow-y-auto max-h-[75vh] custom-scrollbar"
            >
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Company Name *</label>
                   <input required name="company" type="text" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
                 </div>
                 <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Job Role *</label>
                   <input required name="role" type="text" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Min Salary ($)</label>
                   <input name="minSalary" type="number" placeholder="e.g. 80000" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
                 </div>
                 <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Max Salary ($)</label>
                   <input name="maxSalary" type="number" placeholder="e.g. 120000" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Posting Link (Optional)</label>
                 <input name="link" type="url" placeholder="Paste URL of the job posting" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
               </div>
               <div>
                 <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Contact Email (Optional)</label>
                 <input name="email" type="email" placeholder="Hiring manager or recruiter email" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
               </div>
               <div>
                 <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Location</label>
                 <input name="location" type="text" placeholder="Remote / City" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20" />
               </div>
               <div>
                 <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Job Description *</label>
                 <textarea required name="description" className="w-full p-4 bg-brand-surface border border-brand-mint rounded-2xl text-sm font-medium h-48 resize-none outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="Paste the full job description to enable AI tailored features..." />
               </div>
               <button type="submit" className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-lg hover:bg-brand-deep transition-all shadow-xl shadow-brand-primary/20 active:scale-95">
                 Add to Dashboard
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status: JobStatus) => {
  switch (status) {
    case JobStatus.SAVED: return 'bg-amber-50 text-amber-700 border border-amber-100';
    case JobStatus.APPLIED: return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
    case JobStatus.INTERVIEW: return 'bg-violet-50 text-violet-700 border border-violet-100';
    case JobStatus.OFFER: return 'bg-rose-50 text-rose-700 border border-rose-100';
    case JobStatus.ACCEPTED: return 'bg-brand-primary text-white border border-brand-deep shadow-sm shadow-brand-primary/20';
    case JobStatus.REJECTED: return 'bg-rose-50 text-rose-700 border border-rose-100';
    case JobStatus.DRAFT: return 'bg-slate-100 text-slate-600 border border-slate-200';
    default: return 'bg-slate-50 text-slate-700';
  }
};

export default JobTracker;
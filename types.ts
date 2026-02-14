export enum JobStatus {
  SAVED = 'Saved',
  APPLIED = 'Applied',
  INTERVIEW = 'Interviewing',
  OFFER = 'Offer',
  REJECTED = 'Rejected',
  DRAFT = 'Draft',
  ACCEPTED = 'Accepted'
}

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  minSalary?: number;
  maxSalary?: number;
  status: JobStatus;
  dateApplied: string;
  description: string;
  coverLetter: string;
  interviewGuide?: string;
  email: string;
  origin?: 'application' | 'offer'; // Track where the job was created
  link?: string; // URL of the job posting
  isSaved?: boolean; // Bookmark status
  followUpDate?: string; // ISO string for reminder
  followUpNotified?: boolean; // Flag to avoid duplicate notifications
}

export interface JobAlert {
  id: string;
  keywords: string;
  location: string;
  industry: string;
  frequency: 'daily' | 'weekly';
  isActive: boolean;
  lastChecked?: string;
}

export interface JobMatch {
  title: string;
  company: string;
  location: string;
  link: string;
  snippet: string;
  source: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  company: string;
  date: string;
  details: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  link: string;
  description: string;
}

export interface Resume {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experience: ResumeSection[];
  education: ResumeSection[];
  projects: Project[];
  avatar?: string;
}

export interface UserSettings {
  claireTone: 'direct' | 'encouraging' | 'academic';
  notificationsEnabled: boolean;
  emailAlerts: boolean;
  privacyMode: boolean;
  language: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  JOBS = 'JOBS',
  OFFERS = 'OFFERS',
  SAVED = 'SAVED',
  ALERTS = 'ALERTS',
  RESUME = 'RESUME',
  AVATAR = 'AVATAR',
  CLAIRE = 'CLAIRE',
  SETTINGS = 'SETTINGS',
  SAFETY = 'SAFETY',
  TERMS = 'TERMS',
  NODES = 'NODES',
  CV_EVOLUTION = 'CV_EVOLUTION',
  SEO_AUDIT = 'SEO_AUDIT',
  CLAIRE_HUB = 'CLAIRE_HUB',
  NEWSLETTERS = 'NEWSLETTERS',
  PROCESS = 'PROCESS',
  AI_LAB = 'AI_LAB',
  METHODOLOGY = 'METHODOLOGY',
  TOOLS_HUB = 'TOOLS_HUB'
}

import React, { useState, useRef } from 'react';
import { Resume, ResumeSection, Project } from '../types';
import { Printer, Plus, Trash2, Image as ImageIcon, Upload, Loader2, Sparkles, Download } from 'lucide-react';
import { parseAndImproveResume, improveResumeFromText } from '../services/geminiService';
import * as mammoth from 'mammoth';

interface ResumeBuilderProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ resume, setResume }) => {
  const [editMode, setEditMode] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const experienceHtml = resume.experience.map(exp => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${exp.title}</span>
          <span class="item-date">${exp.date}</span>
        </div>
        <div class="item-subtitle">${exp.company}</div>
        <p class="item-details">${exp.details}</p>
      </div>
    `).join('');

    const educationHtml = resume.education.map(edu => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${edu.title}</span>
          <span class="item-date">${edu.date}</span>
        </div>
        <div class="item-subtitle">${edu.company}</div>
        <p class="item-details">${edu.details}</p>
      </div>
    `).join('');

    const projectsHtml = resume.projects.length > 0 ? `
      <section>
        <h2 class="section-title">Projects</h2>
        ${resume.projects.map(proj => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${proj.name}</span>
              <span class="item-date">${proj.technologies}</span>
            </div>
            ${proj.link ? `<div class="item-link">${proj.link}</div>` : ''}
            <p class="item-details">${proj.description}</p>
          </div>
        `).join('')}
      </section>
    ` : '';

    const avatarHtml = resume.avatar ? `<img src="${resume.avatar}" class="avatar" />` : '';

    printWindow.document.write(`
      <html>
        <head>
          <title>${resume.fullName} - Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; color: #1e293b; line-height: 1.6; padding: 20mm; max-width: 210mm; margin: 0 auto; }
            header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e1b4b; padding-bottom: 20px; margin-bottom: 30px; }
            .header-info h1 { font-size: 32pt; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: -0.02em; font-weight: 800; color: #1e1b4b; }
            .contact { font-size: 10pt; color: #64748b; font-weight: 500; }
            .avatar { width: 100px; height: 100px; border-radius: 8px; object-fit: cover; border: 1px solid #e2e8f0; }
            .section-title { font-size: 12pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 25px 0 15px 0; color: #1e1b4b; }
            .summary { font-size: 10pt; text-align: justify; margin-bottom: 20px; color: #334155; }
            .item { margin-bottom: 18px; }
            .item-header { display: flex; justify-content: space-between; align-items: baseline; }
            .item-title { font-weight: 700; font-size: 11pt; color: #1e1b4b; }
            .item-date { font-size: 9pt; color: #64748b; font-weight: 500; }
            .item-subtitle { font-weight: 600; font-size: 10pt; color: #6366f1; margin-bottom: 4px; }
            .item-link { font-size: 8.5pt; color: #6366f1; margin-bottom: 4px; font-weight: 500; }
            .item-details { font-size: 9.5pt; margin: 0; text-align: justify; color: #334155; }
            .skills { font-size: 10pt; color: #334155; }
            @media print { body { padding: 0; margin: 0; } @page { margin: 15mm; } }
          </style>
        </head>
        <body>
          <header>
            <div class="header-info">
              <h1>${resume.fullName}</h1>
              <div class="contact">${resume.email} &bull; ${resume.phone}</div>
            </div>
            ${avatarHtml}
          </header>
          <section><h2 class="section-title">Summary</h2><div class="summary">${resume.summary}</div></section>
          <section><h2 class="section-title">Experience</h2>${experienceHtml}</section>
          <section><h2 class="section-title">Education</h2>${educationHtml}</section>
          <section><h2 class="section-title">Skills</h2><div class="skills">${resume.skills}</div></section>
          ${projectsHtml}
          <script>window.onload = function() { window.print(); setTimeout(() => { window.close(); }, 500); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileName = file.name.toLowerCase();
      
      // Handle Word Documents (.docx) separately as Gemini doesn't natively parse them in inlineData
      if (fileName.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            const extractedText = result.value;
            const parsedData = await improveResumeFromText(extractedText);
            applyParsedData(parsedData);
          } catch (err) {
            console.error("Mammoth error:", err);
            alert("Could not read Word document. Please try PDF.");
          } finally {
            setIsUploading(false);
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        // Handle PDF and Images via Gemini's multi-modal capabilities
        const reader = new FileReader();
        reader.onloadend = async () => {
          const result = reader.result as string;
          const mimeType = file.type || (fileName.endsWith('.pdf') ? 'application/pdf' : 'image/png');
          
          try {
            const parsedData = await parseAndImproveResume(result, mimeType);
            applyParsedData(parsedData);
          } catch (err) {
            console.error("Gemini error:", err);
            alert("Analysis failed. Ensure the file is a standard PDF or Image.");
          } finally {
            setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to process file.");
      setIsUploading(false);
    }
  };

  const applyParsedData = (parsedData: any) => {
    if (parsedData) {
      setResume(prev => ({
        ...prev,
        ...parsedData,
        experience: parsedData.experience?.map((item: any, idx: number) => ({
          ...item, id: 'exp-' + Date.now() + '-' + idx
        })) || [],
        education: parsedData.education?.map((item: any, idx: number) => ({
          ...item, id: 'edu-' + Date.now() + '-' + idx
        })) || [],
        projects: parsedData.projects?.map((item: any, idx: number) => ({
          ...item, id: 'proj-' + Date.now() + '-' + idx
        })) || []
      }));
    }
  };

  const updateField = (field: keyof Resume, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const newId = Date.now().toString();
    if (section === 'projects') {
      setResume(prev => ({
        ...prev,
        projects: [...prev.projects, { id: newId, name: '', technologies: '', link: '', description: '' }]
      }));
    } else {
      setResume(prev => ({
        ...prev,
        [section]: [...prev[section], { id: newId, title: '', company: '', date: '', details: '' }]
      }));
    }
  };

  const removeItem = (section: 'experience' | 'education' | 'projects', id: string) => {
    setResume(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const updateItem = (section: 'experience' | 'education' | 'projects', id: string, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <div className="flex h-full">
      <div className={`w-1/3 bg-white border-r border-brand-mint overflow-y-auto p-6 no-print custom-scrollbar ${!editMode ? 'hidden' : ''}`}>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold text-indigo-800">Editor</h2>
           <button onClick={() => setEditMode(false)} className="text-sm text-brand-primary hover:underline md:hidden">Preview</button>
        </div>

        <div className="mb-8">
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx,image/*" onChange={handleFileUpload} />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-indigo-400 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin text-indigo-600 mb-2" size={24} />
                <span className="text-sm font-medium text-indigo-800">Syncing Node Assets...</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Upload className="text-indigo-600" size={20} />
                  <span className="font-bold text-indigo-800">Import CV (PDF, Word, Image)</span>
                </div>
                <p className="text-xs text-indigo-700/70 text-center">Claire will auto-fill and optimize your professional node</p>
              </>
            )}
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-3">Personal Info</h3>
            <div className="space-y-3">
              <input type="text" value={resume.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full p-2 border border-brand-mint rounded text-sm outline-none" placeholder="Full Name" />
              <input type="text" value={resume.email} onChange={(e) => updateField('email', e.target.value)} className="w-full p-2 border border-brand-mint rounded text-sm outline-none" placeholder="Email" />
              <input type="text" value={resume.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full p-2 border border-brand-mint rounded text-sm outline-none" placeholder="Phone" />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Professional Summary</h3>
              <Sparkles size={14} className="text-indigo-500" />
            </div>
            <textarea value={resume.summary} onChange={(e) => updateField('summary', e.target.value)} className="w-full p-2 border border-brand-mint rounded text-sm h-32 outline-none" placeholder="Summary" />
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Experience</h3>
              <button onClick={() => addItem('experience')} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded"><Plus size={16} /></button>
            </div>
            <div className="space-y-4">
              {resume.experience.map(exp => (
                <div key={exp.id} className="p-4 bg-indigo-50 rounded-lg border border-brand-mint space-y-2 relative">
                  <button onClick={() => removeItem('experience', exp.id)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Job Title" value={exp.title} onChange={e => updateItem('experience', exp.id, 'title', e.target.value)} />
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Company" value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} />
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Date" value={exp.date} onChange={e => updateItem('experience', exp.id, 'date', e.target.value)} />
                  <textarea className="w-full p-2 border border-brand-mint rounded text-sm h-20" placeholder="Details" value={exp.details} onChange={e => updateItem('experience', exp.id, 'details', e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Education</h3>
              <button onClick={() => addItem('education')} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded"><Plus size={16} /></button>
            </div>
            <div className="space-y-4">
              {resume.education.map(edu => (
                <div key={edu.id} className="p-4 bg-indigo-50 rounded-lg border border-brand-mint space-y-2 relative">
                  <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Degree" value={edu.title} onChange={e => updateItem('education', edu.id, 'title', e.target.value)} />
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Institution" value={edu.company} onChange={e => updateItem('education', edu.id, 'company', e.target.value)} />
                  <input className="w-full p-2 border border-brand-mint rounded text-sm" placeholder="Date" value={edu.date} onChange={e => updateItem('education', edu.id, 'date', e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-3">Skills</h3>
            <textarea value={resume.skills} onChange={(e) => updateField('skills', e.target.value)} className="w-full p-2 border border-brand-mint rounded text-sm h-20 outline-none" placeholder="Skills" />
          </section>
        </div>
      </div>

      <div className="flex-1 bg-brand-rose p-8 overflow-y-auto print:bg-white print:p-0 custom-scrollbar">
        <div className="max-w-[210mm] mx-auto mb-4 flex justify-end no-print gap-3">
           <button onClick={() => setEditMode(!editMode)} className="px-4 py-2 bg-white border rounded-lg text-sm md:hidden">{editMode ? 'Preview' : 'Edit'}</button>
           <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-lg"><Download size={18} />Download PDF</button>
           <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-mint rounded-xl text-sm"><Printer size={16} />Print</button>
        </div>

        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl p-[20mm]">
          <header className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2">{resume.fullName}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span>{resume.email}</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full self-center"></span>
                <span>{resume.phone}</span>
              </div>
            </div>
            {resume.avatar ? <img src={resume.avatar} alt="Profile" className="w-24 h-24 object-cover rounded-lg border ml-6" /> : <div className="w-24 h-24 border-2 border-dashed border-indigo-400 bg-indigo-50 rounded-lg ml-6 flex flex-col items-center justify-center text-center p-1 no-print"><ImageIcon className="text-indigo-500 mb-1" size={20} /><span className="text-[10px] text-indigo-800 font-medium">Headshot</span></div>}
          </header>

          <div className="space-y-8">
            <section><h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b pb-2 mb-4">Summary</h2><p className="text-slate-700 text-sm text-justify">{resume.summary}</p></section>
            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {resume.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800">{exp.title}</h3><span className="text-sm text-slate-500">{exp.date}</span></div>
                    <div className="text-sm font-medium text-brand-deep mb-2">{exp.company}</div>
                    <p className="text-sm text-slate-700 leading-relaxed text-justify">{exp.details}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b pb-2 mb-4">Education</h2>
              <div className="space-y-6">
                {resume.education.map((edu) => (
                  <div key={edu.id}>
                     <div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800">{edu.title}</h3><span className="text-sm text-slate-500">{edu.date}</span></div>
                    <div className="text-sm font-medium text-slate-600 mb-1">{edu.company}</div>
                  </div>
                ))}
              </div>
            </section>
            <section><h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b pb-2 mb-4">Skills</h2><p className="text-sm text-slate-700">{resume.skills}</p></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

import React, { useState, useRef } from 'react';
import { generateAvatar } from '../services/geminiService';
import { Wand2, Download, Loader2, Upload, X, Image as ImageIcon, FileCheck, FilePlus2, Sparkles } from 'lucide-react';

interface AvatarGeneratorProps {
  onAttachToResume?: (avatarUrl: string) => void;
}

const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ onAttachToResume }) => {
  const [stylePrompt, setStylePrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attached, setAttached] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setAttached(false);
    try {
      const image = await generateAvatar(selectedImage, stylePrompt);
      setGeneratedImage(image);
    } catch (error) {
      alert("Intelligence sync failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-brand-accent rounded-full" />
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Profile <span className="text-brand-accent">Studio.</span></h1>
          </div>
          <p className="text-slate-500 font-medium">Neural imaging for high-performance LinkedIn presence.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Source Material</label>
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-12 relative min-h-[360px] transition-all hover:bg-slate-100/50 hover:border-brand-primary/30 group">
              {!selectedImage ? (
                <>
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-brand-primary" size={40} />
                  </div>
                  <p className="text-slate-400 text-sm font-bold mb-8 text-center max-w-xs">Upload a clear portrait to begin the generative process.</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-brand-deep text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-primary transition shadow-xl shadow-brand-deep/20 flex items-center gap-3"
                  >
                    <Upload size={18} />
                    Import File
                  </button>
                </>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <img src={selectedImage} alt="Reference" className="max-h-[300px] object-contain" />
                  <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-3 bg-brand-deep text-white rounded-full hover:bg-rose-500 transition-colors shadow-xl">
                    <X size={20} />
                  </button>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Imaging Parameters</label>
            <input
              type="text"
              className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-brand-primary outline-none text-slate-900 font-bold placeholder-slate-400"
              placeholder="e.g. Sharp focus, charcoal suit, studio blur"
              value={stylePrompt}
              onChange={(e) => setStylePrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !selectedImage}
              className="w-full py-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-[32px] font-black text-lg uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-brand-primary/40 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
              {loading ? 'Synthesizing...' : 'Generate Presence'}
            </button>
          </div>
        </div>

        <div className="bg-brand-deep p-10 rounded-[40px] flex flex-col items-center justify-center min-h-[600px] shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           {generatedImage ? (
            <div className="w-full flex flex-col items-center relative z-10 animate-in zoom-in-95 duration-500">
              <div className="w-full max-w-md aspect-square bg-slate-900 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl mb-10">
                 <img src={generatedImage} alt="Neural Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-4 w-full max-w-md">
                <a href={generatedImage} download="lwl-avatar.png" className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition font-black text-[10px] uppercase tracking-widest text-center">
                  Download
                </a>
                <button 
                  onClick={() => { if(onAttachToResume) onAttachToResume(generatedImage!); setAttached(true); }}
                  disabled={attached}
                  className="flex-1 py-5 bg-brand-accent text-brand-deep rounded-2xl hover:brightness-110 transition font-black text-[10px] uppercase tracking-widest disabled:bg-slate-800 disabled:text-white/40"
                >
                  {attached ? 'Asset Attached' : 'Attach to CV'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 mb-10 animate-pulse-slow">
                <Sparkles className="text-white/20" size={64} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3 italic tracking-tight">Awaiting Neural Input</h3>
              <p className="text-white/30 text-sm max-w-xs font-bold uppercase tracking-widest leading-loose">Upload a source and initiate generation sequence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
import React, { useState } from 'react';
import { Brain, Sparkles, Rocket, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface GeneratorFormProps {
  onGenerate: (data: { companyName: string; segment: string; role: string }) => void;
  isLoading: boolean;
}

export function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    segment: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName && formData.segment && formData.role) {
      onGenerate(formData);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/20 rounded-2xl">
          <Brain className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Gerador de Landing Page</h2>
          <p className="text-emerald-400/60 text-sm font-medium">Personalize sua experiência com IA</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Nome da Empresa</label>
          <input
            type="text"
            required
            placeholder="Ex: Ótica Pagnathe"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Segmento</label>
          <input
            type="text"
            required
            placeholder="Ex: Varejo Óptico"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={formData.segment}
            onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Seu Cargo</label>
          <input
            type="text"
            required
            placeholder="Ex: Diretor Comercial"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
            isLoading && "animate-pulse"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gerando sua Landing Page...
            </>
          ) : (
            <>
              Gerar Landing Page Personalizada
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
        <div className="flex gap-4">
          <Sparkles className="w-4 h-4 text-white" />
          <Rocket className="w-4 h-4 text-white" />
        </div>
        <span className="text-[10px] text-white uppercase tracking-[0.2em]">Powered by Gemini AI</span>
      </div>
    </div>
  );
}

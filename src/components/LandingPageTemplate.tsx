import { LandingPageContent } from '../services/gemini';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageTemplateProps {
  content: LandingPageContent;
  onReset: () => void;
}

export function LandingPageTemplate({ content, onReset }: LandingPageTemplateProps) {
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Zap;
    return <IconComponent className="w-6 h-6 text-emerald-400" />;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-bottom border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Icons.Cpu className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">IA PARA NEGÓCIOS</span>
          </div>
          <button 
            onClick={onReset}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Voltar ao Gerador
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Icons.Sparkles className="w-3 h-3" />
              Conteúdo Personalizado
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                {content.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-bold rounded-xl transition-all">
                Ver Cronograma
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {content.problem.title}
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                {content.problem.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {content.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-white/40">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Aplicações Práticas</h2>
            <p className="text-white/40">Como a IA será implementada na sua rotina</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.solutions.map((solution, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  {renderIcon(solution.icon)}
                </div>
                <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-emerald-500 text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic">
              {content.aboutImmersion.title}
            </h2>
            <p className="text-xl font-medium leading-relaxed mb-10 opacity-80">
              {content.aboutImmersion.description}
            </p>
            <button className="px-10 py-5 bg-black text-white font-bold rounded-full flex items-center gap-3 hover:scale-105 transition-transform">
              Quero Garantir Minha Vaga
              <Icons.Zap className="w-5 h-5 fill-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Icons.Cpu className="w-5 h-5" />
            <span className="font-bold tracking-tight">IA PARA NEGÓCIOS</span>
          </div>
          <p className="text-white/30 text-sm">© 2024 Imersão IA para Negócios. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

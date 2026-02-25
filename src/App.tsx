import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GeneratorForm } from './components/GeneratorForm';
import { LandingPageTemplate } from './components/LandingPageTemplate';
import { generateLandingPageContent, LandingPageContent } from './services/gemini';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<LandingPageContent | null>(null);

  const handleGenerate = async (data: { companyName: string; segment: string; role: string }) => {
    setIsLoading(true);
    try {
      const content = await generateLandingPageContent(data.companyName, data.segment, data.role);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Ocorreu um erro ao gerar sua página. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-emerald-500/30">
      <AnimatePresence mode="wait">
        {!generatedContent ? (
          <motion.main
            key="generator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-4xl text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                IA para Negócios: O Futuro é Agora
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none uppercase italic">
                Transforme seu <span className="text-emerald-500">Negócio</span> <br />
                com Inteligência Artificial
              </h1>
              <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                Gere uma demonstração personalizada de como a IA pode revolucionar sua rotina profissional e os resultados da sua empresa.
              </p>
            </div>

            <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          </motion.main>
        ) : (
          <motion.div
            key="template"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <LandingPageTemplate content={generatedContent} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

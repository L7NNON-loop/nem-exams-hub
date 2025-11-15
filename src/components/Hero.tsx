import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, CheckCircle, Zap } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-3xl text-center space-y-8 animate-fade-in relative z-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <GraduationCap className="w-20 h-20 text-primary relative z-10" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Exames NEM 2025
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Prepare-se para os exames com materiais completos, atualizados e de qualidade profissional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto my-8">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">9ª, 10ª e 12ª Classe</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Apenas 257 MT</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Entrega Imediata</span>
          </div>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="px-10 py-6 text-lg font-semibold glow-effect hover:glow-effect hover:scale-105 transition-all duration-300"
        >
          <FileText className="w-5 h-5 mr-2" />
          Adquirir Exames Agora
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Receba via WhatsApp • Pagamento Seguro MPesa
        </p>
      </div>
    </div>
  );
};

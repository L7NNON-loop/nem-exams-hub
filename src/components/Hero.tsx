import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-8 animate-fade-in">
          <GraduationCap className="w-20 h-20 text-purple-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in gradient-text">
          Exames NEM
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Preparação Completa para o Sucesso
        </p>
        
        <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Acesse todos os exames escolares e prepare-se para os exames que começam em breve. 
          Materiais de qualidade profissional para garantir o seu sucesso.
        </p>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 animate-scale-in group"
          style={{ animationDelay: "0.3s" }}
        >
          <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Começar Agora
        </Button>
        
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Entrega em 5 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Todas as classes disponíveis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

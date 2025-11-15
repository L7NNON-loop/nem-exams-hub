import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, CheckCircle } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-6 animate-fade-in">
        <div className="flex justify-center mb-4">
          <GraduationCap className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Exames NEM 2025
        </h1>
        
        <p className="text-base text-muted-foreground max-w-lg mx-auto mb-6">
          Prepare-se para os exames com materiais completos e atualizados
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto mb-8">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <span>9ª, 10ª e 12ª Classe</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <span>257 MT</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Entrega Imediata</span>
          </div>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="px-8 py-6 text-base"
        >
          <FileText className="w-4 h-4 mr-2" />
          Adquirir Exames
        </Button>
      </div>
    </div>
  );
};

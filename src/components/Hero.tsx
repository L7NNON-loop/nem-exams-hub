import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, Award, ChevronRight } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Exames NEM
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Todos os exames escolares para você se preparar e alcançar o sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-scale-in">
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-base font-semibold mb-1 gradient-text">
                Material Completo
              </h3>
              <p className="text-xs text-muted-foreground">
                Exames atualizados de todas as classes
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-base font-semibold mb-1 gradient-text">
                Entrega Rápida
              </h3>
              <p className="text-xs text-muted-foreground">
                Receba em até 5 minutos no seu email
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <Award className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-base font-semibold mb-1 gradient-text">
                Qualidade Garantida
              </h3>
              <p className="text-xs text-muted-foreground">
                Materiais revisados e profissionais
              </p>
            </div>
          </Card>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="text-base px-6 py-5 shadow-lg transition-all duration-300 animate-scale-in group"
        >
          Começar Agora
          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

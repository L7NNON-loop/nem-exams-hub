import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SurveyData } from "./Survey";
import { CreditCard, GraduationCap, CheckCircle2, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface PaymentSummaryProps {
  surveyData: SurveyData;
}

export const PaymentSummary = ({ surveyData }: PaymentSummaryProps) => {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const validateMpesaNumber = (number: string): boolean => {
    const cleanNumber = number.replace(/\s/g, "");
    const mpesaRegex = /^(84|85)\d{7}$/;
    return mpesaRegex.test(cleanNumber);
  };

  const handlePayment = () => {
    if (!validateMpesaNumber(mpesaNumber)) {
      toast.error("Número MPesa inválido", {
        description: "O número deve ter 9 dígitos e começar com 84 ou 85"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Pagamento iniciado!", {
        description: "Você receberá seus exames em até 5 minutos no email fornecido."
      });
    }, 2000);
  };

  const formatMpesaNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue.slice(0, 9);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Finalizar Pedido
          </h2>
          <p className="text-muted-foreground">
            Está quase lá! Complete seu pagamento para receber os exames.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Resumo do Pedido
            </h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Nome</p>
                <p className="font-medium">{surveyData.name}</p>
              </div>
              
              <div className="pb-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{surveyData.email}</p>
              </div>
              
              <div className="pb-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Telefone</p>
                <p className="font-medium">{surveyData.phone}</p>
              </div>
              
              <div className="pb-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Classe Selecionada</p>
                <p className="font-medium gradient-text">{surveyData.class}</p>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total</span>
                  <span className="gradient-text">350,00 MT</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Entrega em até 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Exames completos da classe selecionada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Garantia de qualidade</span>
              </div>
            </div>
          </Card>

          {/* Payment Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" />
              Método de Pagamento
            </h3>

            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="font-semibold">M-Pesa</p>
                  <p className="text-sm text-muted-foreground">Pagamento via M-Pesa</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="mpesa" className="text-base mb-2 block">
                  Número M-Pesa
                </Label>
                <Input
                  id="mpesa"
                  type="tel"
                  placeholder="84XXXXXXX ou 85XXXXXXX"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(formatMpesaNumber(e.target.value))}
                  className="h-14 text-lg bg-background/50 border-border/50 focus:border-purple-500 transition-colors"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  9 dígitos, iniciando com 84 ou 85
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!validateMpesaNumber(mpesaNumber) || isProcessing}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:opacity-90 disabled:opacity-50"
              >
                {isProcessing ? "Processando..." : "Iniciar Pagamento"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao prosseguir, você concorda com nossos termos e condições
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

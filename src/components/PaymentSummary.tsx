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

// GibraPay API Configuration
const WALLET_ID = "50c282d1-843f-4b9c-a287-2140e9e8d94b";
const API_KEY = "b3b33cba8a903626a015d592754f1dcec756e9fbb12d411516f4a79b04aba8923ebb6396da29e61c899154ab005aaf056961b819c263e1ec5d88c60b9cae6aba";

export const PaymentSummary = ({ surveyData }: PaymentSummaryProps) => {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate price based on product type
  const price = surveyData.productType === "book" ? 500 : 350;

  const validateMpesaNumber = (number: string): boolean => {
    const cleanNumber = number.replace(/\s/g, "");
    const mpesaRegex = /^(84|85)\d{7}$/;
    return mpesaRegex.test(cleanNumber);
  };

  const handlePayment = async () => {
    if (!validateMpesaNumber(mpesaNumber)) {
      toast.error("Número MPesa inválido", {
        description: "O número deve ter 9 dígitos e começar com 84 ou 85"
      });
      return;
    }

    setIsProcessing(true);

    const payload = {
      wallet_id: WALLET_ID,
      amount: price,
      number_phone: mpesaNumber,
      alert_sms: {
        api_key: API_KEY,
        sender_id: "ExamesNEM",
        phone: surveyData.phone,
        phone_customer: mpesaNumber,
        message: `Pagamento de ${price}MZN recebido. Pedido: ${surveyData.product}`,
        customer_message: `Seu pedido de ${surveyData.product} foi confirmado. Você receberá os materiais em até 5 minutos no email ${surveyData.email}.`
      }
    };

    try {
      const response = await fetch("https://gibrapay.online/v1/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Pagamento iniciado!", {
          description: "Confirme com PIN no seu Mpesa. Você receberá os materiais em até 5 minutos no email fornecido."
        });
      } else {
        const errorMsg = data.message || "Falha no pagamento";
        toast.error("Erro no pagamento", {
          description: errorMsg
        });
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      toast.error("Erro de rede", {
        description: "Verifique sua conexão e tente novamente."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatMpesaNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue.slice(0, 9);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-6 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-1">
            Finalizar Pedido
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete seu pagamento para receber os materiais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Resumo do Pedido
            </h3>
            
            <div className="space-y-3">
              <div className="pb-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Nome</p>
                <p className="text-sm font-medium">{surveyData.name}</p>
              </div>
              
              <div className="pb-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-sm font-medium">{surveyData.email}</p>
              </div>
              
              <div className="pb-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                <p className="text-sm font-medium">{surveyData.phone}</p>
              </div>
              
              <div className="pb-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Produto Selecionado</p>
                <p className="text-sm font-medium gradient-text">{surveyData.product}</p>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="gradient-text">{price},00 MT</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Entrega em até 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Materiais completos e atualizados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>Garantia de qualidade</span>
              </div>
            </div>
          </Card>

          {/* Payment Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Método de Pagamento
            </h3>

            <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-semibold">M-Pesa</p>
                  <p className="text-xs text-muted-foreground">Pagamento via M-Pesa</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="mpesa" className="text-sm mb-2 block">
                  Número M-Pesa
                </Label>
                <Input
                  id="mpesa"
                  type="tel"
                  placeholder="84XXXXXXX ou 85XXXXXXX"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(formatMpesaNumber(e.target.value))}
                  className="h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  9 dígitos, iniciando com 84 ou 85
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!validateMpesaNumber(mpesaNumber) || isProcessing}
                className="w-full h-12 text-base"
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

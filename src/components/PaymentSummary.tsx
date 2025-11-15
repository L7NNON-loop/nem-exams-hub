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

const WALLET_ID = "50c282d1-843f-4b9c-a287-2140e9e8d94b";
const API_KEY = "b3b33cba8a903626a015d592754f1dcec756e9fbb12d411516f4a79b04aba8923ebb6396da29e61c899154ab005aaf056961b819c263e1ec5d88c60b9cae6aba";
const PRICE = 257;
const WHATSAPP_NUMBER = "258853984699";

export const PaymentSummary = ({ surveyData }: PaymentSummaryProps) => {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const validateMpesaNumber = (number: string): boolean => {
    const cleanNumber = number.replace(/\s/g, "");
    const mpesaRegex = /^(84|85)\d{7}$/;
    return mpesaRegex.test(cleanNumber);
  };

  const redirectToWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Acabei de fazer o pagamento.\n\n` +
      `Nome: ${surveyData.name}\n` +
      `Email: ${surveyData.email}\n` +
      `WhatsApp: ${surveyData.whatsapp}\n` +
      `Produto: ${surveyData.product}\n` +
      `Valor Pago: ${PRICE},00 MT`
    );
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
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
      amount: PRICE,
      number_phone: mpesaNumber,
      alert_sms: {
        api_key: API_KEY,
        sender_id: "ExamesNEM",
        phone: surveyData.whatsapp,
        phone_customer: mpesaNumber,
        message: `Pagamento de ${PRICE}MZN recebido. Pedido: ${surveyData.product}`,
        customer_message: `Seu pedido de ${surveyData.product} foi confirmado. Você receberá os materiais via WhatsApp.`
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
          description: "Confirme com PIN no seu Mpesa. Redirecionando para WhatsApp..."
        });
        
        setTimeout(() => {
          redirectToWhatsApp();
        }, 2000);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-4 text-center animate-fade-in">
          <h2 className="text-2xl font-bold gradient-text mb-1">
            Finalizar Pedido
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete seu pagamento para receber os materiais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Resumo do Pedido
            </h3>
            
            <div className="space-y-2">
              <div className="pb-2 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-0.5">Nome</p>
                <p className="text-sm font-medium">{surveyData.name}</p>
              </div>
              
              <div className="pb-2 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-sm font-medium">{surveyData.email}</p>
              </div>
              
              <div className="pb-2 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
                <p className="text-sm font-medium">{surveyData.whatsapp}</p>
              </div>
              
              <div className="pb-2 border-b border-border/50">
                <p className="text-xs text-muted-foreground mb-0.5">Produto Selecionado</p>
                <p className="text-sm font-medium text-primary">{surveyData.product}</p>
              </div>
              
              <div className="pt-1">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{PRICE},00 MT</span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                <span>Entrega via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                <span>Materiais completos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                <span>Garantia de qualidade</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Método de Pagamento
            </h3>

            <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">M-Pesa</p>
                  <p className="text-xs text-muted-foreground">Pagamento via M-Pesa</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="mpesa" className="text-sm mb-1.5 block">
                  Número M-Pesa
                </Label>
                <Input
                  id="mpesa"
                  type="tel"
                  placeholder="84XXXXXXX ou 85XXXXXXX"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(formatMpesaNumber(e.target.value))}
                  className="h-11 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  9 dígitos, iniciando com 84 ou 85
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!validateMpesaNumber(mpesaNumber) || isProcessing}
                className="w-full h-11 text-base"
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

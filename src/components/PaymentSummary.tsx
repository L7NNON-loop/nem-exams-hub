import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SurveyData } from "./Survey";
import { CreditCard, GraduationCap, CheckCircle2, Smartphone, Shield, Zap } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-5xl relative z-10">
        <div className="mb-6 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Finalizar Pedido
          </h2>
          <p className="text-base text-muted-foreground">
            Complete seu pagamento para receber os materiais via WhatsApp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 animate-scale-in shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Resumo do Pedido</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Nome</p>
                <p className="text-sm font-semibold">{surveyData.name}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-sm font-semibold">{surveyData.email}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">WhatsApp</p>
                <p className="text-sm font-semibold">{surveyData.whatsapp}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Produto Selecionado</p>
                <p className="text-base font-bold text-primary">{surveyData.product}</p>
              </div>
              
              <div className="pt-3 mt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total a Pagar</span>
                  <span className="text-2xl font-bold text-primary">{PRICE},00 MT</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-border space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Entrega via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Pagamento seguro via MPesa</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Garantia de qualidade</span>
              </div>
            </div>
          </Card>

          {/* Payment Card */}
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 animate-scale-in shadow-xl" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Pagamento</h3>
            </div>

            <div className="mb-6 p-4 rounded-xl bg-primary/10 border-2 border-primary/20">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-base font-bold">M-Pesa</p>
                  <p className="text-xs text-muted-foreground">Pagamento rápido e seguro</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label htmlFor="mpesa" className="text-base font-semibold mb-2 block">
                  Número M-Pesa
                </Label>
                <Input
                  id="mpesa"
                  type="tel"
                  placeholder="84XXXXXXX ou 85XXXXXXX"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(formatMpesaNumber(e.target.value))}
                  className="h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  9 dígitos, iniciando com 84 ou 85
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!validateMpesaNumber(mpesaNumber) || isProcessing}
                className="w-full h-14 text-lg font-bold glow-effect hover:scale-105 transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5 mr-2" />
                    Pagar {PRICE},00 MT
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                <Shield className="w-3 h-3 inline mr-1" />
                Pagamento seguro e protegido
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

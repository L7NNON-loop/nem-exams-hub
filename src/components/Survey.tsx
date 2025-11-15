import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, User, CheckCircle } from "lucide-react";

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

export interface SurveyData {
  name: string;
  email: string;
  whatsapp: string;
  product: string;
}

const products = [
  { name: "Exames - 9ª Classe", price: 257 },
  { name: "Exames - 10ª Classe", price: 257 },
  { name: "Exames - 12ª Classe", price: 257 },
];

export const Survey = ({ onComplete }: SurveyProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>({
    name: "",
    email: "",
    whatsapp: "",
    product: ""
  });

  const questions = [
    {
      question: "Qual é o seu nome completo?",
      field: "name" as keyof SurveyData,
      placeholder: "Digite seu nome completo",
      icon: User
    },
    {
      question: "Qual é o seu email?",
      field: "email" as keyof SurveyData,
      placeholder: "exemplo@email.com",
      icon: User
    },
    {
      question: "Qual é o seu número de WhatsApp?",
      field: "whatsapp" as keyof SurveyData,
      placeholder: "84XXXXXXX ou 85XXXXXXX",
      icon: User
    }
  ];

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductSelect = (product: typeof products[0]) => {
    const updatedData = { 
      ...formData, 
      product: product.name
    };
    setFormData(updatedData);
    setTimeout(() => {
      onComplete(updatedData);
    }, 300);
  };

  const isStepValid = () => {
    if (step < questions.length) {
      const field = questions[step].field;
      return formData[field].trim() !== "";
    }
    return formData.product !== "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-3">
            {step < questions.length && <User className="w-6 h-6 text-primary" />}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
            {step < questions.length ? questions[step].question : "Escolha seu exame"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Passo {step + 1} de {questions.length + 1}</span>
            <span className="text-primary">•</span>
            <span className="text-primary font-medium">257 MT</span>
          </div>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 animate-scale-in shadow-xl">
          {step < questions.length ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor={questions[step].field} className="text-base font-medium">
                  {questions[step].field === "name" && "Nome Completo"}
                  {questions[step].field === "email" && "Endereço de Email"}
                  {questions[step].field === "whatsapp" && "Número de WhatsApp"}
                </Label>
                <Input
                  id={questions[step].field}
                  type={questions[step].field === "email" ? "email" : "text"}
                  placeholder={questions[step].placeholder}
                  value={formData[questions[step].field]}
                  onChange={(e) => handleInputChange(questions[step].field, e.target.value)}
                  className="h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  autoFocus
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="w-full h-14 text-base font-semibold"
              >
                Continuar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <button
                  key={product.name}
                  onClick={() => handleProductSelect(product)}
                  className="w-full p-5 text-left rounded-xl border-2 border-border/50 bg-background/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 group card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-base font-semibold group-hover:text-primary transition-all">
                        {product.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">{product.price},00 MT</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

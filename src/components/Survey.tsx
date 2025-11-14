import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, User } from "lucide-react";

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

export interface SurveyData {
  name: string;
  email: string;
  phone: string;
  product: string;
  productType: "exam" | "book";
}

const products = [
  { name: "Exames - 8ª Classe", type: "exam" as const, price: 350 },
  { name: "Exames - 9ª Classe", type: "exam" as const, price: 350 },
  { name: "Exames - 10ª Classe", type: "exam" as const, price: 350 },
  { name: "Exames - 11ª Classe", type: "exam" as const, price: 350 },
  { name: "Exames - 12ª Classe", type: "exam" as const, price: 350 },
  { name: "Livro - 10ª Classe", type: "book" as const, price: 500 },
  { name: "Livro - 11ª Classe", type: "book" as const, price: 500 },
];

export const Survey = ({ onComplete }: SurveyProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>({
    name: "",
    email: "",
    phone: "",
    product: "",
    productType: "exam"
  });

  const questions = [
    {
      question: "Qual é o seu nome completo?",
      field: "name" as keyof SurveyData,
      placeholder: "Digite seu nome completo"
    },
    {
      question: "Qual é o seu email?",
      field: "email" as keyof SurveyData,
      placeholder: "exemplo@email.com"
    },
    {
      question: "Qual é o seu número de telefone?",
      field: "phone" as keyof SurveyData,
      placeholder: "84XXXXXXX ou 85XXXXXXX"
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
      product: product.name,
      productType: product.type
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-3">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold gradient-text mb-1">
            Vamos começar
          </h2>
          <p className="text-sm text-muted-foreground">
            Passo {step + 1} de {questions.length + 1}
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
          {step < questions.length ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4 gradient-text">
                  {questions[step].question}
                </h3>
                <div className="space-y-2">
                  <Label htmlFor={questions[step].field} className="text-sm">
                    {questions[step].field === "name" && "Nome"}
                    {questions[step].field === "email" && "Email"}
                    {questions[step].field === "phone" && "Telefone"}
                  </Label>
                  <Input
                    id={questions[step].field}
                    type={questions[step].field === "email" ? "email" : "text"}
                    placeholder={questions[step].placeholder}
                    value={formData[questions[step].field]}
                    onChange={(e) => handleInputChange(questions[step].field, e.target.value)}
                    className="h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="w-full h-12 text-base"
              >
                Continuar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 gradient-text">
                Escolha seu produto
              </h3>
              <div className="grid gap-2">
                {products.map((product) => (
                  <button
                    key={product.name}
                    onClick={() => handleProductSelect(product)}
                    className="p-3 text-left rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 hover:border-primary transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium group-hover:gradient-text transition-all">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{product.price},00 MT</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

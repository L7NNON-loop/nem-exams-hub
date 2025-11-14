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
  class: string;
}

const classes = [
  "8ª Classe",
  "10ª Classe", 
  "12ª Classe - Ciências",
  "12ª Classe - Letras",
  "12ª Classe - Técnico Profissional"
];

export const Survey = ({ onComplete }: SurveyProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>({
    name: "",
    email: "",
    phone: "",
    class: ""
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

  const handleClassSelect = (selectedClass: string) => {
    setFormData(prev => ({ ...prev, class: selectedClass }));
    setTimeout(() => {
      onComplete({ ...formData, class: selectedClass });
    }, 300);
  };

  const isStepValid = () => {
    if (step < questions.length) {
      const field = questions[step].field;
      return formData[field].trim() !== "";
    }
    return formData.class !== "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Vamos começar
          </h2>
          <p className="text-muted-foreground">
            Passo {step + 1} de {questions.length + 1}
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
          {step < questions.length ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-6 gradient-text">
                  {questions[step].question}
                </h3>
                <div className="space-y-2">
                  <Label htmlFor={questions[step].field} className="text-base">
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
                    className="h-14 text-lg bg-background/50 border-border/50 focus:border-purple-500 transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:opacity-90 disabled:opacity-50"
              >
                Continuar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">
                Qual é a sua classe?
              </h3>
              <div className="grid gap-3">
                {classes.map((classOption) => (
                  <button
                    key={classOption}
                    onClick={() => handleClassSelect(classOption)}
                    className="p-4 text-left rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 hover:border-purple-500 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium group-hover:gradient-text transition-all">
                        {classOption}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
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

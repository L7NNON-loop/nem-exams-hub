import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Survey, SurveyData } from "@/components/Survey";
import { PaymentSummary } from "@/components/PaymentSummary";
import { TermsFAB } from "@/components/TermsFAB";

type Step = "hero" | "survey" | "payment";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const handleStart = () => {
    setCurrentStep("survey");
  };

  const handleSurveyComplete = (data: SurveyData) => {
    setSurveyData(data);
    setCurrentStep("payment");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentStep === "hero" && <Hero onStart={handleStart} />}
      {currentStep === "survey" && <Survey onComplete={handleSurveyComplete} />}
      {currentStep === "payment" && surveyData && (
        <PaymentSummary surveyData={surveyData} />
      )}
      <TermsFAB />
    </div>
  );
};

export default Index;

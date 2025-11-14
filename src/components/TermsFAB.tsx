import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TermsFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:opacity-90 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 z-50"
        aria-label="Termos e Condições"
      >
        <FileText className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-card/95 backdrop-blur-sm border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">
              Termos e Condições
            </DialogTitle>
            <DialogDescription>
              Informações importantes sobre nosso serviço
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Termos
              </TabsTrigger>
              <TabsTrigger value="refund" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reembolso
              </TabsTrigger>
              <TabsTrigger value="guarantee" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Garantia
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[500px] mt-4 pr-4">
              <TabsContent value="terms" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Nosso Compromisso
                  </h3>
                  <p className="text-muted-foreground">
                    Somos dedicados a fornecer materiais educacionais de alta qualidade para 
                    ajudar estudantes moçambicanos a alcançarem o sucesso nos exames NEM.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    O Que Você Recebe
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Exames completos da classe selecionada</li>
                    <li>Material atualizado e revisado por professores</li>
                    <li>Gabaritos e soluções detalhadas</li>
                    <li>Dicas e estratégias de estudo</li>
                    <li>Entrega garantida em até 5 minutos após pagamento</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Nosso Foco
                  </h3>
                  <p className="text-muted-foreground">
                    Trabalhamos incansavelmente para garantir que cada estudante tenha acesso 
                    aos melhores recursos de preparação. Nosso objetivo é o seu sucesso acadêmico.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Uso do Material
                  </h3>
                  <p className="text-muted-foreground">
                    Os materiais fornecidos são para uso pessoal e educacional. A redistribuição 
                    ou venda não autorizada é estritamente proibida.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="refund" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Política de Reembolso
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Estamos comprometidos com a sua satisfação. Se você não receber o material 
                    dentro do prazo estipulado ou se houver algum problema com o conteúdo, 
                    oferecemos reembolso total.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Condições para Reembolso
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Material não recebido após 5 minutos do pagamento confirmado</li>
                    <li>Arquivos corrompidos ou ilegíveis</li>
                    <li>Conteúdo significativamente diferente do anunciado</li>
                    <li>Problemas técnicos comprovados na entrega</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Prazo de Solicitação
                  </h3>
                  <p className="text-muted-foreground">
                    Solicitações de reembolso devem ser feitas em até 24 horas após a compra. 
                    Entre em contato através do email fornecido durante o cadastro.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Processamento
                  </h3>
                  <p className="text-muted-foreground">
                    Reembolsos aprovados são processados em até 3 dias úteis através do mesmo 
                    método de pagamento utilizado na compra.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guarantee" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Nossa Garantia de Qualidade
                  </h3>
                  <p className="text-muted-foreground">
                    Garantimos que todos os materiais fornecidos são de alta qualidade, 
                    atualizados e verificados por profissionais da educação.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    O Que Garantimos
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Conteúdo alinhado com o currículo oficial NEM</li>
                    <li>Exames recentes e relevantes</li>
                    <li>Gabaritos corretos e soluções detalhadas</li>
                    <li>Formato legível e organizado</li>
                    <li>Entrega rápida e segura</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Suporte Contínuo
                  </h3>
                  <p className="text-muted-foreground">
                    Após receber seus exames, você receberá o material completo da classe 
                    selecionada conforme anunciado. O comprador receberá os exames no máximo 
                    5 minutos após o pagamento ser confirmado.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">
                    Privacidade e Segurança
                  </h3>
                  <p className="text-muted-foreground">
                    Seus dados pessoais e informações de pagamento são tratados com máxima 
                    confidencialidade e segurança. Não compartilhamos suas informações com terceiros.
                  </p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

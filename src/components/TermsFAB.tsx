import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
      >
        <FileText className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-lg">Termos e Condições</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mx-4" style={{ width: 'calc(100% - 2rem)' }}>
              <TabsTrigger value="terms" className="text-xs">Termos</TabsTrigger>
              <TabsTrigger value="refund" className="text-xs">Reembolso</TabsTrigger>
              <TabsTrigger value="guarantee" className="text-xs">Garantia</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[50vh] px-4 pb-4">
              <TabsContent value="terms" className="mt-3 text-sm space-y-3">
                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Nosso Objetivo</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Fornecemos materiais de estudo completos e atualizados para ajudar estudantes 
                    moçambicanos a se prepararem para os Exames Nacionais de Moçambique (NEM).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">O Que Oferecemos</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Exames completos para 9ª, 10ª e 12ª Classes</li>
                    <li>Materiais organizados e de fácil compreensão</li>
                    <li>Conteúdo atualizado conforme o currículo oficial</li>
                    <li>Entrega imediata via WhatsApp após confirmação de pagamento</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Entrega</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Os materiais serão enviados em formato PDF para o número de WhatsApp fornecido 
                    no máximo 5 minutos após a confirmação do pagamento.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="refund" className="mt-3 text-sm space-y-3">
                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Política de Reembolso</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Oferecemos reembolso total caso ocorra algum dos seguintes problemas:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li>Material não entregue após 24 horas do pagamento</li>
                    <li>Arquivo corrompido ou ilegível</li>
                    <li>Material errado enviado (classe diferente da solicitada)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Como Solicitar</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Para solicitar reembolso, entre em contato via WhatsApp com:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                    <li>Comprovativo de pagamento</li>
                    <li>Descrição detalhada do problema</li>
                    <li>Prints de tela, se aplicável</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    O reembolso será processado em até 3 dias úteis.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guarantee" className="mt-3 text-sm space-y-3">
                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Nossa Garantia</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Garantimos a qualidade e autenticidade de todos os nossos materiais.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">O Que Garantimos</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Conteúdo alinhado com o currículo oficial do NEM</li>
                    <li>Materiais completos sem páginas faltando</li>
                    <li>Qualidade de imagem legível e profissional</li>
                    <li>Organização clara por disciplina e tópico</li>
                    <li>Suporte via WhatsApp para dúvidas sobre o material</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1.5 text-primary">Compromisso</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Estamos comprometidos em fornecer o melhor suporte possível para o sucesso 
                    dos estudantes moçambicanos. Caso encontre qualquer problema com o material, 
                    entre em contato conosco imediatamente.
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

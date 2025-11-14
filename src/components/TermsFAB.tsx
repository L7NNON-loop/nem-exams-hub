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
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
        aria-label="Termos e Condições"
      >
        <FileText className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[70vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg gradient-text">
              Termos e Condições
            </DialogTitle>
            <DialogDescription className="text-sm">
              Informações importantes sobre nosso serviço
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Termos
              </TabsTrigger>
              <TabsTrigger value="refund" className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reembolso
              </TabsTrigger>
              <TabsTrigger value="guarantee" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Garantia
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px] mt-4 pr-4">
              <TabsContent value="terms" className="space-y-3 text-sm">
                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Nosso Compromisso
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Fornecemos materiais educacionais de qualidade para ajudar estudantes 
                    moçambicanos a alcançarem o sucesso nos exames NEM.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    O Que Você Recebe
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Exames completos da classe selecionada</li>
                    <li>Material atualizado e revisado</li>
                    <li>Gabaritos e soluções detalhadas</li>
                    <li>Entrega em até 5 minutos após pagamento</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Uso do Material
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Os materiais são para uso pessoal e educacional. A redistribuição 
                    não autorizada é proibida.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="refund" className="space-y-3 text-sm">
                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Política de Reembolso
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Garantimos seu dinheiro de volta se você não receber os materiais 
                    conforme prometido.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Quando Solicitar
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Se não receber os materiais em 24 horas</li>
                    <li>Se os materiais estiverem incompletos</li>
                    <li>Se houver erro no pedido</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Prazo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Reembolsos são processados em até 72 horas após aprovação.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guarantee" className="space-y-3 text-sm">
                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Garantia de Qualidade
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Todos os materiais são verificados e atualizados regularmente.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Garantia de Entrega
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Você receberá os exames da classe selecionada no máximo 5 minutos 
                    após confirmação do pagamento.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">
                    Suporte
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Nossa equipe está disponível para ajudar com qualquer dúvida ou problema.
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

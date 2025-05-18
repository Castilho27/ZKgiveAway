"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { FileInput } from "@/components/ui/file-input";
import { toast } from "@/hooks/use-toast";
import { useWallet } from "@/lib/web3/wallet-context";

export default function RequestForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl:
      "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    amount: "0",
  });
  const [files, setFiles] = useState<File[]>([]);
  const { isConnected, createDonationOnContract } = useWallet();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      // Gera uma URL local para preview e para enviar ao contrato (se for só para exibir)
      const url = URL.createObjectURL(newFiles[0]);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleFileError = (error: string) => {
    toast({
      title: "Erro no upload",
      description: error,
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      if (!isConnected) {
        toast({
          title: "Carteira não conectada",
          description:
            "Conecte sua carteira para criar um pedido na blockchain.",
          variant: "destructive",
        });
        return;
      }
      try {
        // Cria o pedido de doação na blockchain
        await createDonationOnContract(
          formData.title ?? "",
          formData.description ?? "",
          formData.imageUrl ?? "",
          formData.amount ?? "0"
        );
        toast({
          title: "Solicitação enviada",
          description: "Sua solicitação foi enviada para a blockchain!",
        });
      } catch (err: any) {
        console.error("Erro ao criar donation:", err);
        toast({
          title: "Erro ao criar solicitação",
          description: err.message || "Erro ao interagir com o contrato.",
          variant: "destructive",
        });
        return;
      }
      setStep(1);
      setFormData({
        title: "",
        description: "",
        amount: "",
        imageUrl: "",
      });
      setFiles([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Nome ou Organização
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite seu nome ou organização"
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Breve Descrição
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva sua situação ou projeto"
              required
              className="min-h-[100px] rounded-xl"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full"
            >
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Valor Solicitado
            </label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Valor necessário"
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="files" className="block text-sm font-medium">
              Documentos Comprobatórios
            </label>
            <FileInput
              id="files"
              accept=".png,.pdf,image/png,application/pdf"
              value={files}
              onChange={handleFileChange}
              onError={handleFileError}
              maxFiles={3}
              maxSize={5}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Anexe documentos que comprovem sua necessidade ou projeto
              (opcional)
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 rounded-full"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full"
            >
              Enviar Solicitação
            </Button>
          </div>
        </>
      )}

      <div className="flex justify-center pt-2">
        <div className="flex gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              step === 1 ? "bg-[#FFCC33]" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-2 w-2 rounded-full ${
              step === 2 ? "bg-[#FFCC33]" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
    </form>
  );
}

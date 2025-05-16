"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { FileInput } from "@/components/ui/file-input"
import { toast } from "@/hooks/use-toast"

export default function RequestForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    reason: "",
  })
  const [files, setFiles] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
  }

  const handleFileError = (error: string) => {
    toast({
      title: "Erro no upload",
      description: error,
      variant: "destructive",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Submit form logic would go here
      // In a real application, you would handle file uploads here
      console.log("Form data:", formData)
      console.log("Files:", files)

      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação foi enviada com sucesso!",
      })

      setStep(1)
      setFormData({
        name: "",
        description: "",
        amount: "",
        reason: "",
      })
      setFiles([])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome ou Organização
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
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
            <Button type="submit" className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
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
            <label htmlFor="reason" className="block text-sm font-medium">
              Como isso ajudará?
            </label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explique como esta doação fará impacto"
              required
              className="min-h-[100px] rounded-xl"
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
              Anexe documentos que comprovem sua necessidade ou projeto (opcional)
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">
              Voltar
            </Button>
            <Button type="submit" className="flex-1 bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
              Enviar Solicitação
            </Button>
          </div>
        </>
      )}

      <div className="flex justify-center pt-2">
        <div className="flex gap-2">
          <div className={`h-2 w-2 rounded-full ${step === 1 ? "bg-[#FFCC33]" : "bg-gray-300"}`}></div>
          <div className={`h-2 w-2 rounded-full ${step === 2 ? "bg-[#FFCC33]" : "bg-gray-300"}`}></div>
        </div>
      </div>
    </form>
  )
}

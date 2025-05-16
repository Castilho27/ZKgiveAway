"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Shield, ArrowRight } from "lucide-react"

export default function DonationCard() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")

  const predefinedAmounts = ["10", "50", "100", "500"]

  const handleAmountSelect = (value: string) => {
    setAmount(value)
  }

  const handleContinue = () => {
    if (amount) {
      setStep(2)
    }
  }

  const handleDonate = () => {
    // Here you would integrate with a Web3 wallet or payment processor
    alert(`Obrigado pela sua doação anônima de R$${amount}!`)
    setStep(1)
    setAmount("")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl">Doação Anônima</h3>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-[#FFCC33]" />
          <span className="text-sm font-medium">Seguro</span>
        </div>
      </div>

      {step === 1 ? (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {predefinedAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={amount === value ? "default" : "outline"}
                  className={
                    amount === value
                      ? "bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full"
                      : "border-gray-300 rounded-full"
                  }
                  onClick={() => handleAmountSelect(value)}
                >
                  R${value}
                </Button>
              ))}
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder="Valor personalizado"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-6 rounded-full"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleContinue}
              disabled={!amount}
              className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full"
            >
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
            <Lock className="h-3 w-3" />
            <span>Sua doação será anônima</span>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Valor:</span>
              <span className="font-bold">R${amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxa:</span>
              <span className="font-medium">R$0,00</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-bold">R${amount}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-[#FFCC33]/10 p-3 rounded-xl">
              <Shield className="h-4 w-4 text-[#FFCC33]" />
              <span className="text-sm">Protegido por tecnologia blockchain</span>
            </div>

            <Button onClick={handleDonate} className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
              Doar Anonimamente
            </Button>

            <Button variant="outline" onClick={() => setStep(1)} className="w-full rounded-full">
              Voltar
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

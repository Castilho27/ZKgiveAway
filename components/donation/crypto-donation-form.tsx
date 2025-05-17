"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ethers } from "ethers"
import { useWallet } from "@/lib/web3/wallet-context"
import { toast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, CheckCircle2, Wallet } from "lucide-react"

export default function CryptoDonationForm() {
  const { isConnected, address, signer } = useWallet()
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("ETH")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  const handleDonate = async () => {
    if (!isConnected || !signer || !address) {
      toast({
        title: "Carteira não conectada",
        description: "Por favor, conecte sua carteira para fazer uma doação.",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor de doação válido.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // For this example, we'll send ETH to a donation address
      // In a real application, you would use a smart contract
      const donationAddress = "0x0000000000000000000000000000000000000000" // Replace with actual donation address

      // Create transaction
      const tx = await signer.sendTransaction({
        to: donationAddress,
        value: ethers.parseEther(amount),
      })

      setTxHash(tx.hash)

      toast({
        title: "Doação enviada",
        description: "Sua transação foi enviada para a blockchain.",
      })

      // Wait for transaction to be mined
      const receipt = await tx.wait()

      if (receipt && receipt.status === 1) {
        toast({
          title: "Doação bem-sucedida",
          description: "Obrigado pela sua doação!",
        })
      } else {
        toast({
          title: "Transação falhou",
          description: "Sua transação de doação falhou. Por favor, tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Erro na doação:", error)
      toast({
        title: "Doação falhou",
        description: error.message || "Houve um erro ao processar sua doação.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 text-center space-y-4 flex flex-col items-center justify-center min-h-[300px]">
        <h3 className="font-medium text-lg">Conecte a Carteira para Doar</h3>
        <p className="text-gray-600 text-sm">Conecte sua carteira de criptomoedas para fazer uma doação anônima.</p>
        <div className="flex justify-center pt-2">
          <Button className="bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
            <Wallet className="h-4 w-4 mr-2" />
            Conectar Carteira
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {txHash ? (
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="font-medium text-lg">Doação Enviada!</h3>
          <p className="text-sm text-gray-600">Sua transação foi enviada para a blockchain.</p>
          <div className="text-xs text-gray-500 break-all bg-white p-3 rounded-lg">Hash da Transação: {txHash}</div>
          <Button
            variant="outline"
            className="text-sm rounded-full"
            onClick={() => {
              setTxHash(null)
              setAmount("")
            }}
          >
            Fazer Outra Doação
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <label className="block text-sm font-medium">Selecione a Moeda</label>
            <Select defaultValue="ETH" onValueChange={setToken}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="USDT" disabled>
                  USDT (Em Breve)
                </SelectItem>
                <SelectItem value="USDC" disabled>
                  USDC (Em Breve)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">Valor</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 rounded-xl"
                step="0.01"
                min="0"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {token === "ETH" ? "Ξ" : "R$"}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Doação Anônima</p>
              <p className="text-gray-600 text-xs mt-1">
                Sua doação será processada na blockchain. Embora o endereço da sua carteira fique visível na rede,
                nenhuma informação pessoal será coletada ou armazenada.
              </p>
            </div>
          </div>

          <Button
            onClick={handleDonate}
            disabled={isSubmitting || !amount || Number.parseFloat(amount) <= 0}
            className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Doar Anonimamente"
            )}
          </Button>
        </>
      )}
    </div>
  )
}

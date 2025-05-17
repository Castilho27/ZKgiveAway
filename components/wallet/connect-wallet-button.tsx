"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, LogOut, Loader2 } from "lucide-react"
import { useWallet } from "@/lib/web3/wallet-context"
import Image from "next/image"

export default function ConnectWalletButton() {
  const { isConnected, isConnecting, address, balance, connectWallet, disconnectWallet } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = async (type: "metamask" | "walletconnect") => {
    await connectWallet(type)
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium">{formatAddress(address)}</span>
          <span className="text-xs text-gray-500">
            {balance ? `${Number.parseFloat(balance).toFixed(4)} ETH` : "Carregando..."}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="md:hidden">Desconectar</span>
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
          <Wallet className="h-4 w-4 mr-2" />
          Conectar Carteira
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Conecte sua carteira</DialogTitle>
          <DialogDescription>
            Conecte sua carteira preferida para fazer doações anônimas com criptomoedas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleConnect("metamask")}
            disabled={isConnecting}
            className="flex justify-between items-center w-full p-4 h-auto rounded-xl"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-4">
                <Image src="/placeholder.svg?height=32&width=32" alt="MetaMask" width={32} height={32} />
              </div>
              <span>MetaMask</span>
            </div>
            {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>

          <Button
            onClick={() => handleConnect("walletconnect")}
            disabled={isConnecting}
            variant="outline"
            className="flex justify-between items-center w-full p-4 h-auto rounded-xl"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-4">
                <Image src="/placeholder.svg?height=32&width=32" alt="WalletConnect" width={32} height={32} />
              </div>
              <span>WalletConnect</span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Em Breve</span>
          </Button>
        </div>
        <div className="text-xs text-gray-500 text-center">
          Ao conectar sua carteira, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </div>
      </DialogContent>
    </Dialog>
  )
}

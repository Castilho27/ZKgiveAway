"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"
import { toast } from "@/hooks/use-toast"

type WalletContextType = {
  address: string | null
  balance: string | null
  chainId: number | null
  isConnecting: boolean
  isConnected: boolean
  connectWallet: (providerType: "metamask" | "walletconnect") => Promise<void>
  disconnectWallet: () => void
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
  signer: null,
})

export const useWallet = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          // Check if we're already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            const ethersProvider = new ethers.BrowserProvider(window.ethereum)
            const ethersSigner = await ethersProvider.getSigner()
            const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
            const walletAddress = await ethersSigner.getAddress()
            const walletBalance = await ethersProvider.getBalance(walletAddress)

            setProvider(ethersProvider)
            setSigner(ethersSigner)
            setAddress(walletAddress)
            setBalance(ethers.formatEther(walletBalance))
            setChainId(Number.parseInt(chainIdHex, 16))
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Erro ao verificar conexão da carteira:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet()
        } else if (accounts[0] !== address) {
          // User switched accounts
          const ethersProvider = new ethers.BrowserProvider(window.ethereum)
          const ethersSigner = await ethersProvider.getSigner()
          const walletAddress = await ethersSigner.getAddress()
          const walletBalance = await ethersProvider.getBalance(walletAddress)

          setProvider(ethersProvider)
          setSigner(ethersSigner)
          setAddress(walletAddress)
          setBalance(ethers.formatEther(walletBalance))
          setIsConnected(true)

          toast({
            title: "Conta alterada",
            description: `Conectado a ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`,
          })
        }
      }

      const handleChainChanged = (chainIdHex: string) => {
        setChainId(Number.parseInt(chainIdHex, 16))
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [address])

  const connectWallet = async (providerType: "metamask" | "walletconnect") => {
    setIsConnecting(true)

    try {
      if (providerType === "metamask") {
        if (!window.ethereum) {
          toast({
            title: "MetaMask não detectado",
            description: "Por favor, instale a extensão MetaMask e tente novamente.",
            variant: "destructive",
          })
          setIsConnecting(false)
          return
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const ethersProvider = new ethers.BrowserProvider(window.ethereum)
        const ethersSigner = await ethersProvider.getSigner()
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
        const walletAddress = await ethersSigner.getAddress()
        const walletBalance = await ethersProvider.getBalance(walletAddress)

        setProvider(ethersProvider)
        setSigner(ethersSigner)
        setAddress(walletAddress)
        setBalance(ethers.formatEther(walletBalance))
        setChainId(Number.parseInt(chainIdHex, 16))
        setIsConnected(true)

        toast({
          title: "Carteira conectada",
          description: `Conectado a ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`,
        })
      } else if (providerType === "walletconnect") {
        // WalletConnect implementation would go here
        // For simplicity, we're focusing on MetaMask in this example
        toast({
          title: "Em breve",
          description: "Integração com WalletConnect em breve!",
        })
      }
    } catch (error: any) {
      console.error("Erro ao conectar carteira:", error)
      toast({
        title: "Falha na conexão",
        description: error.message || "Falha ao conectar carteira. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setBalance(null)
    setChainId(null)
    setProvider(null)
    setSigner(null)
    setIsConnected(false)

    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada.",
    })
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        chainId,
        isConnecting,
        isConnected,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Add TypeScript interface for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

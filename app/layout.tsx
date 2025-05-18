import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WalletProvider } from "@/lib/web3/wallet-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZKgiveAway - Doações Anônimas",
  description: "Faça doações anônimas usando tecnologia blockchain",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Padrão para maioria dos navegadores
      { url: '/Faviicon.png', type: 'image/png' }, // Para dispositivos modernos
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <WalletProvider>
            {children}
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
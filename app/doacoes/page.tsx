/* import { Button } from "@/components/ui/button"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

interface Donation {
  id: string
  amount: number
  timestamp: number
  message?: string
  projectName: string
  status: 'pending' | 'completed'
}

export default function DoacoesPage() {
  // Exemplo de dados - substituir por dados reais do blockchain
  const donations: Donation[] = [
    {
      id: "0x123...",
      amount: 0.5,
      timestamp: Date.now(),
      message: "Boa sorte com o projeto!",
      projectName: "Água Potável para Comunidades",
      status: 'completed'
    },
    // Adicionar mais doações aqui
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-32 h-10 bg-white rounded-md flex items-center justify-center">
              <Image
                src="/images/lofo-Photoroom.png"
                alt="Logo ZKgiveAway"
                width={200}
                height={100}
                className="mb--4"
                priority
              />
            </div>
          </Link>
          <Link href="/" className="flex items-center text-gray-600 hover:text-[#FFCC33]">
            <ArrowLeft className="mr-2" /> Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Histórico de Doações</h1>
          <p className="text-gray-600">Acompanhe todas as doações realizadas na plataforma</p>
        </div>

        {/* Filtros e Busca */
        /* <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar doações..."
              className="pl-10 rounded-full border-gray-200"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 rounded-full">
            <Filter className="h-4 w-4" /> Filtrar
          </Button>
        </div>

        {/* Lista de Doações */
        /*<div className="grid gap-4">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{donation.projectName}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    ID da Transação: {donation.id}
                  </p>
                  {donation.message && (
                    <p className="text-gray-600 italic">"{donation.message}"</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-[#FFCC33]">
                    {donation.amount} ETH
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(donation.timestamp).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${
                    donation.status === 'completed' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {donation.status === 'completed' ? 'Confirmada' : 'Pendente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação *//*
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">Anterior</Button>
            <Button variant="outline" className="rounded-full">1</Button>
            <Button variant="outline" className="rounded-full bg-[#FFCC33]">2</Button>
            <Button variant="outline" className="rounded-full">3</Button>
            <Button variant="outline" className="rounded-full">Próxima</Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} ZKgiveAway. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
*/
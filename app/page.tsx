import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Coins, ArrowRight, ChevronRight, Gift, Sparkles } from "lucide-react"
import RequestForm from "@/components/request-form"
import ConnectWalletButton from "@/components/wallet/connect-wallet-button"
import CryptoDonationForm from "@/components/donation/crypto-donation-form"
import { ProjectCard } from "@/components/project-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { DonateButton } from "@/components/donate-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#FFCC33] p-2 rounded-md">
              <span className="font-bold text-xl">ZK</span>
            </div>
            <span className="font-bold text-xl">ZKgiveAway</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="font-medium hover:text-[#FFCC33] transition-colors">
              Início
            </Link>
            <Link href="/about" className="font-medium hover:text-[#FFCC33] transition-colors">
              Sobre
            </Link>
            <Link href="/projects" className="font-medium hover:text-[#FFCC33] transition-colors">
              Projetos
            </Link>
            <Link href="/donate" className="font-medium hover:text-[#FFCC33] transition-colors">
              Doar
            </Link>
          </nav>
          <ConnectWalletButton />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FFCC33] to-[#FFA500] py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    Doações Anônimas, <br />
                    <span className="text-black">Impacto Real</span>
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-white/90 max-w-md">
                  ZKgiveAway permite doações seguras e anônimas usando tecnologia blockchain, facilitando a ajuda aos
                  necessitados sem comprometer sua privacidade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <DonateButton />
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/10 hover:text-white rounded-full px-8 bg-white/80"
                  >
                    Solicitar Ajuda
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                    Tecnologia Blockchain para o Bem
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
                  {/* Espaço para a foto que será inserida depois */}
                  <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Imagem será inserida aqui</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFCC33]/10 px-4 py-1 rounded-full text-sm font-medium text-[#FFCC33] mb-4">
              Processo Simplificado
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma usa provas de conhecimento zero para garantir anonimato completo enquanto mantém a
              transparência.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <div className="bg-[#FFCC33]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-[#FFCC33]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Cadastro Seguro</h3>
              <p className="text-gray-600">
                Organizações e indivíduos podem se cadastrar com informações mínimas, verificadas com segurança.
              </p>
              <Link href="/about" className="inline-flex items-center text-[#FFCC33] font-medium mt-4 hover:underline">
                Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <div className="bg-[#FFCC33]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-[#FFCC33]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Doações Anônimas</h3>
              <p className="text-gray-600">
                Doe sem revelar sua identidade, garantindo que sua contribuição chegue às mãos certas.
              </p>
              <Link href="/about" className="inline-flex items-center text-[#FFCC33] font-medium mt-4 hover:underline">
                Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <div className="bg-[#FFCC33]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-10 h-10 text-[#FFCC33]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rastreamento Transparente</h3>
              <p className="text-gray-600">Acompanhe o impacto da sua doação sem comprometer sua privacidade.</p>
              <Link href="/about" className="inline-flex items-center text-[#FFCC33] font-medium mt-4 hover:underline">
                Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-gray-50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <div className="inline-block bg-[#FFCC33]/10 px-4 py-1 rounded-full text-sm font-medium text-[#FFCC33] mb-4">
                  Projetos em Destaque
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Causas que Apoiamos</h2>
                <p className="text-gray-600 max-w-2xl">
                  Conheça alguns dos projetos que estão recebendo doações anônimas através da nossa plataforma.
                </p>
              </div>
              <Button className="mt-4 md:mt-0 bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">
                Ver Todos os Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ProjectCard
                title="Água Potável para Comunidades"
                description="Projeto que leva água potável para comunidades rurais sem acesso a saneamento básico."
                image="/placeholder.svg?height=300&width=400"
                category="Infraestrutura"
                goal={50000}
                raised={32500}
              />
              <ProjectCard
                title="Educação Digital para Todos"
                description="Fornecendo computadores e acesso à internet para escolas em áreas carentes."
                image="/placeholder.svg?height=300&width=400"
                category="Educação"
                goal={75000}
                raised={45000}
              />
              <ProjectCard
                title="Reflorestamento Amazônico"
                description="Iniciativa para reflorestar áreas desmatadas da Amazônia com espécies nativas."
                image="/placeholder.svg?height=300&width=400"
                category="Meio Ambiente"
                goal={100000}
                raised={87500}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFCC33]/10 px-4 py-1 rounded-full text-sm font-medium text-[#FFCC33] mb-4">
              Depoimentos
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">O Que Dizem Sobre Nós</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja o que doadores e beneficiários estão falando sobre a plataforma ZKgiveAway.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="A ZKgiveAway me permitiu ajudar causas importantes sem expor minha identidade. O processo é simples e seguro."
              author="Doador Anônimo"
              role="Doador"
              avatar="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Graças às doações recebidas, conseguimos expandir nosso projeto de educação para mais três comunidades."
              author="Maria Silva"
              role="Coordenadora de Projeto"
              avatar="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="A transparência da plataforma me dá confiança para doar. Posso ver exatamente como meu dinheiro está sendo usado."
              author="João Santos"
              role="Doador Recorrente"
              avatar="/placeholder.svg?height=100&width=100"
            />
          </div>
        </section>

        {/* Request and Donate Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#FFCC33]/10 px-4 py-1 rounded-full text-sm font-medium text-[#FFCC33] mb-4">
                Participe
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Faça Parte da Mudança</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Seja doando ou solicitando ajuda, você pode fazer parte desta rede de impacto positivo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#FFCC33]/10 p-3 rounded-full">
                    <Gift className="h-6 w-6 text-[#FFCC33]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Solicitar Assistência</h2>
                </div>
                <RequestForm />
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#FFCC33]/10 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-[#FFCC33]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Faça uma Doação</h2>
                </div>
                <CryptoDonationForm />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="bg-[#FFCC33] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Pronto para Fazer a Diferença?</h2>
              <p className="text-xl text-black/80 mb-8">
                Junte-se a milhares de pessoas que estão usando a tecnologia blockchain para criar um impacto positivo
                no mundo.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8">
                  Começar a Doar
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black/10 rounded-full px-8"
                >
                  Saber Mais
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#FFCC33] p-2 rounded-md">
                  <span className="font-bold text-xl text-black">ZK</span>
                </div>
                <span className="font-bold text-xl">ZKgiveAway</span>
              </div>
              <p className="text-gray-400 mb-6">
                Plataforma de doações anônimas usando tecnologia blockchain para garantir privacidade e transparência.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#FFCC33]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFCC33]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFCC33]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Projetos
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Doar
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Tutoriais
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-[#FFCC33] transition-colors">
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-400">+55 (11) 9999-9999</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-400">contato@zkgiveaway.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-400">São Paulo, SP - Brasil</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ZKgiveAway. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function DonateButton() {
  const [isLoading, setIsLoading] = useState(false)

  // Efeito para simular um estado de carregamento periódico
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Button
      size="lg"
      className={`bg-white hover:bg-gray-100 text-black rounded-full px-8 relative overflow-hidden ${isLoading ? "animate-pulse" : ""}`}
    >
      <span className="relative z-10">Doar Agora</span>
      <span
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-x-full ${isLoading ? "animate-shimmer" : ""}`}
        style={{
          animationDuration: "1.5s",
          animationIterationCount: "infinite",
        }}
      ></span>
    </Button>
  )
}

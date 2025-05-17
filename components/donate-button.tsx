"use client"

import { Button } from "@/components/ui/button"

export function DonateButton() {
  return (
    <Button
      size="lg"
      className="
        bg-white hover:bg-gray-100 text-black 
        rounded-full px-8 relative
        transition-all duration-200 ease-out
        hover:scale-[1.02] active:scale-[0.98]
        border border-gray-200 hover:border-gray-300
        shadow-sm hover:shadow-md
      "
    >
      <span className="relative z-10">Doar Agora</span>
    </Button>
  )
}
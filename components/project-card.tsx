import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  category: string
  goal: number
  raised: number
}

export function ProjectCard({ title, description, image, category, goal, raised }: ProjectCardProps) {
  const progress = Math.min(Math.round((raised / goal) * 100), 100)

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-[#FFCC33] text-black text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Arrecadado: R${raised.toLocaleString()}</span>
            <span className="text-gray-500">Meta: R${goal.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Button className="w-full bg-[#FFCC33] hover:bg-[#E6B800] text-black rounded-full">Apoiar Projeto</Button>
      </div>
    </div>
  )
}

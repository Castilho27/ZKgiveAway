import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <svg
            width="45"
            height="36"
            viewBox="0 0 45 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#FFCC33]/30"
          >
            <path
              d="M13.4 36C9.4 36 6.1 34.6333 3.5 31.9C1.16667 29.1667 0 25.8 0 21.8C0 18.0667 1.03333 14.5 3.1 11.1C5.16667 7.7 7.76667 4.76667 10.9 2.3C14.0333 -0.166666 17.3667 -0.699999 20.9 0.700001L22.5 3.9C19.5 5.03333 16.8333 6.8 14.5 9.2C12.1667 11.6 11 14.2667 11 17.2C11 18.6 11.4 19.7333 12.2 20.6C13 21.4667 14.0333 21.9 15.3 21.9C17.1 21.9 18.6 22.5667 19.8 23.9C21 25.2333 21.6 26.8667 21.6 28.8C21.6 31 20.9 32.8333 19.5 34.3C18.1 35.4333 16 36 13.4 36ZM36.4 36C32.4 36 29.1 34.6333 26.5 31.9C24.1667 29.1667 23 25.8 23 21.8C23 18.0667 24.0333 14.5 26.1 11.1C28.1667 7.7 30.7667 4.76667 33.9 2.3C37.0333 -0.166666 40.3667 -0.699999 43.9 0.700001L45.5 3.9C42.5 5.03333 39.8333 6.8 37.5 9.2C35.1667 11.6 34 14.2667 34 17.2C34 18.6 34.4 19.7333 35.2 20.6C36 21.4667 37.0333 21.9 38.3 21.9C40.1 21.9 41.6 22.5667 42.8 23.9C44 25.2333 44.6 26.8667 44.6 28.8C44.6 31 43.9 32.8333 42.5 34.3C41.1 35.4333 39 36 36.4 36Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <p className="text-gray-700 flex-grow mb-6">{quote}</p>

        <div className="flex items-center mt-auto">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image src={avatar || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-bold">{author}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

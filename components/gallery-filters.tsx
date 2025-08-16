"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const categories = ["All", "Beaches", "Mountains", "Heritage", "Culture", "Adventure", "Wildlife", "Cities"]

export function GalleryFilters() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                : "border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

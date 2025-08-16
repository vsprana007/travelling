"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"

export function PackageFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000])

  const categories = ["Beach", "Adventure", "Heritage", "Nature", "Luxury", "Honeymoon", "Family", "Corporate"]

  const durations = ["1-3 Days", "4-6 Days", "7-10 Days", "11+ Days"]

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {isOpen && <X className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`p-6 sticky top-24 ${isOpen ? "block" : "hidden lg:block"}`}>
        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search" className="text-sm font-medium mb-2 block">
              Search Packages
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="search" placeholder="Search destinations..." className="pl-10" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-4 block">Price Range</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200000}
                min={0}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Duration</Label>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox id={duration} />
                  <Label htmlFor={duration} className="text-sm font-normal cursor-pointer">
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer">
                    {rating}+ Stars
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <Button variant="outline" className="w-full bg-transparent">
            Clear All Filters
          </Button>
        </div>
      </Card>
    </>
  )
}

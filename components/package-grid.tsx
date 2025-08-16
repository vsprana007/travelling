"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Users, MapPin, Calendar } from "lucide-react"

interface Package {
  id: number
  title: string
  location: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  highlights: string[]
  groupSize: string
  validUntil?: string
}

interface PackageGridProps {
  packages: Package[]
}

export function PackageGrid({ packages }: PackageGridProps) {
  const [sortBy, setSortBy] = useState("featured")

  return (
    <div>
      {/* Sort and Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-gray-800">{packages.length} Packages Found</h2>
          <p className="text-gray-600">Choose your perfect getaway</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <img
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 left-3 bg-amber-600 text-white">{pkg.category}</Badge>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                  {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {pkg.validUntil && (
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Valid until {new Date(pkg.validUntil).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{pkg.location}</span>
              </div>

              <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2 line-clamp-2">{pkg.title}</h3>

              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{pkg.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({pkg.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {pkg.highlights.slice(0, 3).map((highlight) => (
                  <Badge key={highlight} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-cyan-600">₹{pkg.price.toLocaleString()}</span>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">per person</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                >
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
          Load More Packages
        </Button>
      </div>
    </div>
  )
}

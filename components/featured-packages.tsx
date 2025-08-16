"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface Package {
  id: number
  title: string
  description: string
  location: string
  duration: string
  price: number
  original_price?: number
  rating: number
  reviews_count: number
  image_url: string
  category: string
  highlights: string[]
  max_group_size: number
  is_featured: boolean
}

export function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setLoading(true)
        const response = await api.get("/packages?featured=true&limit=6")
        setPackages(response.data)
      } catch (err) {
        console.error("Failed to fetch packages:", err)
        setError("Failed to load packages")
        setPackages([
          {
            id: 1,
            title: "Magical Goa Beach Getaway",
            description: "Experience the beauty of Goa's pristine beaches",
            location: "Goa, India",
            duration: "4 Days / 3 Nights",
            price: 15999,
            original_price: 19999,
            rating: 4.8,
            reviews_count: 124,
            image_url: "/goa-sunset-beach.png",
            category: "Domestic",
            highlights: ["Beach Resort", "Water Sports", "Local Cuisine"],
            max_group_size: 8,
            is_featured: true,
          },
          {
            id: 2,
            title: "Himalayan Adventure Trek",
            description: "Conquer the majestic Himalayan peaks",
            location: "Himachal Pradesh, India",
            duration: "6 Days / 5 Nights",
            price: 24999,
            original_price: 29999,
            rating: 4.9,
            reviews_count: 89,
            image_url: "/himalayan-trekking.png",
            category: "Adventure",
            highlights: ["Mountain Trekking", "Camping", "Photography"],
            max_group_size: 12,
            is_featured: true,
          },
          {
            id: 3,
            title: "European Grand Tour",
            description: "Explore the cultural treasures of Europe",
            location: "Paris, Rome, London",
            duration: "12 Days / 11 Nights",
            price: 125999,
            original_price: 149999,
            rating: 4.7,
            reviews_count: 256,
            image_url: "/europe-landmarks.png",
            category: "International",
            highlights: ["Historic Sites", "Cultural Tours", "Fine Dining"],
            max_group_size: 6,
            is_featured: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPackages()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-cyan-600" />
            <p className="mt-4 text-gray-600">Loading featured packages...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Curated Travel Experiences</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From serene beaches to bustling cities, find your perfect getaway
          </p>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-amber-600 bg-amber-50 px-4 py-2 rounded-lg inline-block">
              {error} - Showing sample packages
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={pkg.image_url || "/placeholder.svg"}
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-amber-600 text-white">{pkg.category}</Badge>
                {pkg.original_price && pkg.original_price > pkg.price && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    Save ₹{(pkg.original_price - pkg.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{pkg.location}</span>
                </div>

                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{pkg.title}</h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {pkg.max_group_size} People</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{pkg.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({pkg.reviews_count} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-cyan-600">₹{pkg.price.toLocaleString()}</span>
                      {pkg.original_price && pkg.original_price > pkg.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{pkg.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">per person</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">Book Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  )
}

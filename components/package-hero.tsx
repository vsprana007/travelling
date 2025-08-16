"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Calendar, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react"
import Link from "next/link"

interface PackageData {
  id: string
  title: string
  location: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: string
  groupSize: string
  images: string[]
  validUntil?: string
}

interface PackageHeroProps {
  packageData: PackageData
}

export function PackageHero({ packageData }: PackageHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % packageData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + packageData.images.length) % packageData.images.length)
  }

  return (
    <section className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-cyan-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/domestic" className="hover:text-cyan-600">
            Packages
          </Link>
          <span>/</span>
          <span className="text-gray-800">{packageData.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <img
                src={packageData.images[currentImageIndex] || "/placeholder.svg"}
                alt={packageData.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {packageData.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {packageData.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {packageData.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-amber-600 text-white">{packageData.category}</Badge>
                {packageData.originalPrice && packageData.originalPrice > packageData.price && (
                  <Badge className="bg-red-500 text-white">
                    {Math.round(((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100)}%
                    OFF
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="ghost" size="icon" className="bg-white/90 text-gray-700 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-white/90 text-gray-700 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {packageData.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {packageData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-cyan-600" : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Package Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-2">{packageData.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{packageData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{packageData.rating}</span>
                  <span className="text-gray-600">({packageData.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span>{packageData.groupSize}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-cyan-600">₹{packageData.price.toLocaleString()}</span>
                    {packageData.originalPrice && packageData.originalPrice > packageData.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{packageData.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-600">per person</span>
                </div>
                {packageData.validUntil && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Valid until {new Date(packageData.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

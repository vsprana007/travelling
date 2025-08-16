import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface RelatedPackagesProps {
  currentPackageId: string
  category: string
}

// Mock related packages data
const mockRelatedPackages = [
  {
    id: "2",
    title: "Himalayan Adventure Trek",
    location: "Himachal Pradesh, India",
    duration: "6 Days / 5 Nights",
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 89,
    image: "/himalayan-trekking.png",
    category: "Adventure",
  },
  {
    id: "3",
    title: "Kerala Backwaters Cruise",
    location: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: 18999,
    originalPrice: 22999,
    rating: 4.7,
    reviews: 156,
    image: "/kerala-backwaters.png",
    category: "Nature",
  },
  {
    id: "4",
    title: "Rajasthan Royal Heritage",
    location: "Rajasthan, India",
    duration: "7 Days / 6 Nights",
    price: 32999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 203,
    image: "/rajasthan-palace.png",
    category: "Heritage",
  },
]

export function RelatedPackages({ currentPackageId, category }: RelatedPackagesProps) {
  const relatedPackages = mockRelatedPackages.filter((pkg) => pkg.id !== currentPackageId)

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">You Might Also Like</h2>
        <p className="text-gray-600">Discover more amazing travel experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPackages.map((pkg) => (
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
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{pkg.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({pkg.reviews} reviews)</span>
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
                <Link href={`/package/${pkg.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                  >
                    View Details
                  </Button>
                </Link>
                <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

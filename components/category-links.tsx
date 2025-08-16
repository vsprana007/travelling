import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Plane, MapPin, Building, Sparkles } from "lucide-react"

const categories = [
  {
    title: "Domestic Packages",
    description: "Explore the beauty of your homeland",
    icon: MapPin,
    href: "/domestic",
    color: "bg-emerald-500",
    image: "/mountain-lake-vista.png",
  },
  {
    title: "International Packages",
    description: "Discover amazing destinations worldwide",
    icon: Plane,
    href: "/international",
    color: "bg-blue-500",
    image: "/international-landmarks.png",
  },
  {
    title: "MICE Services",
    description: "Corporate events and business travel",
    icon: Building,
    href: "/mice",
    color: "bg-purple-500",
    image: "/modern-conference-center.png",
  },
  {
    title: "Special Offers",
    description: "Limited time deals and packages",
    icon: Sparkles,
    href: "/offers",
    color: "bg-amber-500",
    image: "/luxury-resort-discount.png",
  },
]

export function CategoryLinks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Choose Your Adventure</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From local getaways to international expeditions, we have the perfect package for every traveler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 ${category.color} p-3 rounded-full`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

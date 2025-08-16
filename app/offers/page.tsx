import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageListingHero } from "@/components/package-listing-hero"
import { PackageGrid } from "@/components/package-grid"
import { PackageFilters } from "@/components/package-filters"

const specialOffers = [
  {
    id: 1,
    title: "Early Bird Goa Special",
    location: "Goa, India",
    duration: "4 Days / 3 Nights",
    price: 11999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 124,
    image: "/goa-early-bird.png",
    category: "Early Bird",
    highlights: ["40% Off", "Beach Resort", "Free Breakfast"],
    groupSize: "2-8 People",
    validUntil: "2024-03-31",
  },
  {
    id: 2,
    title: "Last Minute Dubai Deal",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: 29999,
    originalPrice: 45999,
    rating: 4.6,
    reviews: 167,
    image: "/dubai-last-minute.png",
    category: "Last Minute",
    highlights: ["35% Off", "4-Star Hotel", "Desert Safari"],
    groupSize: "2-8 People",
    validUntil: "2024-02-15",
  },
  {
    id: 3,
    title: "Honeymoon Package Maldives",
    location: "Maldives",
    duration: "6 Days / 5 Nights",
    price: 69999,
    originalPrice: 109999,
    rating: 4.9,
    reviews: 98,
    image: "/maldives-honeymoon.png",
    category: "Honeymoon Special",
    highlights: ["36% Off", "Overwater Villa", "Romantic Dinner"],
    groupSize: "2 People",
    validUntil: "2024-06-30",
  },
  {
    id: 4,
    title: "Group Discount Kerala",
    location: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: 14999,
    originalPrice: 22999,
    rating: 4.7,
    reviews: 156,
    image: "/kerala-group.png",
    category: "Group Discount",
    highlights: ["35% Off", "Houseboat", "Group Activities"],
    groupSize: "8+ People",
    validUntil: "2024-04-30",
  },
  {
    id: 5,
    title: "Flash Sale Europe",
    location: "Paris, Rome, London",
    duration: "10 Days / 9 Nights",
    price: 99999,
    originalPrice: 149999,
    rating: 4.7,
    reviews: 256,
    image: "/europe-flash.png",
    category: "Flash Sale",
    highlights: ["33% Off", "Multi-City", "Guided Tours"],
    groupSize: "2-6 People",
    validUntil: "2024-02-29",
  },
  {
    id: 6,
    title: "Weekend Getaway Himachal",
    location: "Himachal Pradesh, India",
    duration: "3 Days / 2 Nights",
    price: 8999,
    originalPrice: 12999,
    rating: 4.5,
    reviews: 89,
    image: "/himachal-weekend.png",
    category: "Weekend Special",
    highlights: ["31% Off", "Mountain Views", "Adventure Sports"],
    groupSize: "2-6 People",
    validUntil: "2024-03-15",
  },
]

export default function OffersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PackageListingHero
        title="Limited Time Special Offers"
        subtitle="Don't miss out on these incredible deals and save big on your next adventure"
        backgroundImage="/special-offers.png"
        breadcrumb="Special Offers"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <PackageFilters />
          </aside>
          <main className="lg:w-3/4">
            <PackageGrid packages={specialOffers} />
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}

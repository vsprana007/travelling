import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageListingHero } from "@/components/package-listing-hero"
import { PackageGrid } from "@/components/package-grid"
import { PackageFilters } from "@/components/package-filters"

export const metadata: Metadata = {
  title: "Domestic Travel Packages India | TravelCo",
  description:
    "Explore incredible India with our curated domestic travel packages. From Goa beaches to Himalayan treks, Kerala backwaters to Rajasthan heritage tours. Book now!",
  keywords: [
    "domestic travel packages",
    "India tour packages",
    "Goa packages",
    "Himalayan trek",
    "Kerala backwaters",
    "Rajasthan tours",
    "Kashmir valley",
    "Golden Triangle tour",
    "India holiday packages",
    "domestic tourism India",
  ],
  openGraph: {
    title: "Domestic Travel Packages India | TravelCo",
    description:
      "Explore incredible India with our curated domestic travel packages. From beaches to mountains, heritage to adventure.",
    images: ["/india-landscape.png"],
    url: "/domestic",
  },
  twitter: {
    title: "Domestic Travel Packages India | TravelCo",
    description:
      "Explore incredible India with our curated domestic travel packages. From beaches to mountains, heritage to adventure.",
    images: ["/india-landscape.png"],
  },
  alternates: {
    canonical: "/domestic",
  },
}

const domesticPackages = [
  {
    id: 1,
    title: "Magical Goa Beach Getaway",
    location: "Goa, India",
    duration: "4 Days / 3 Nights",
    price: 15999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 124,
    image: "/goa-sunset-beach.png",
    category: "Beach",
    highlights: ["Beach Resort", "Water Sports", "Local Cuisine"],
    groupSize: "2-8 People",
  },
  {
    id: 2,
    title: "Himalayan Adventure Trek",
    location: "Himachal Pradesh, India",
    duration: "6 Days / 5 Nights",
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 89,
    image: "/himalayan-trekking.png",
    category: "Adventure",
    highlights: ["Mountain Trekking", "Camping", "Photography"],
    groupSize: "4-12 People",
  },
  {
    id: 3,
    title: "Kerala Backwaters Cruise",
    location: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: 18999,
    originalPrice: 22999,
    rating: 4.7,
    reviews: 156,
    image: "/kerala-backwaters.png",
    category: "Nature",
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Cultural Shows"],
    groupSize: "2-6 People",
  },
  {
    id: 4,
    title: "Rajasthan Royal Heritage",
    location: "Rajasthan, India",
    duration: "7 Days / 6 Nights",
    price: 32999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 203,
    image: "/rajasthan-palace.png",
    category: "Heritage",
    highlights: ["Palace Hotels", "Desert Safari", "Cultural Tours"],
    groupSize: "2-8 People",
  },
  {
    id: 5,
    title: "Kashmir Valley Paradise",
    location: "Kashmir, India",
    duration: "6 Days / 5 Nights",
    price: 28999,
    originalPrice: 34999,
    rating: 4.9,
    reviews: 98,
    image: "/kashmir-valley.png",
    category: "Nature",
    highlights: ["Dal Lake", "Shikara Rides", "Snow Activities"],
    groupSize: "2-6 People",
  },
  {
    id: 6,
    title: "Golden Triangle Tour",
    location: "Delhi, Agra, Jaipur",
    duration: "5 Days / 4 Nights",
    price: 21999,
    originalPrice: 26999,
    rating: 4.6,
    reviews: 287,
    image: "/golden-triangle.png",
    category: "Heritage",
    highlights: ["Taj Mahal", "Red Fort", "Amber Palace"],
    groupSize: "2-10 People",
  },
]

export default function DomesticPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PackageListingHero
        title="Discover India's Hidden Gems"
        subtitle="Explore the incredible diversity of our homeland with carefully curated domestic travel packages"
        backgroundImage="/india-landscape.png"
        breadcrumb="Domestic Packages"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <PackageFilters />
          </aside>
          <main className="lg:w-3/4">
            <PackageGrid packages={domesticPackages} />
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}

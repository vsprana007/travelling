import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageListingHero } from "@/components/package-listing-hero"
import { PackageGrid } from "@/components/package-grid"
import { PackageFilters } from "@/components/package-filters"

export const metadata: Metadata = {
  title: "International Travel Packages | Europe, Asia, Dubai | TravelCo",
  description:
    "Discover amazing international destinations with expertly crafted travel packages. Europe tours, Bali paradise, Dubai luxury, Thailand adventures & more. Book now!",
  keywords: [
    "international travel packages",
    "Europe tour packages",
    "Bali packages",
    "Dubai tours",
    "Thailand packages",
    "Singapore tours",
    "Maldives honeymoon",
    "international holidays",
    "overseas travel packages",
    "world tour packages",
  ],
  openGraph: {
    title: "International Travel Packages | Europe, Asia, Dubai | TravelCo",
    description:
      "Discover amazing international destinations with expertly crafted travel packages. Europe, Asia, Middle East & more.",
    images: ["/world-destinations.png"],
    url: "/international",
  },
  twitter: {
    title: "International Travel Packages | Europe, Asia, Dubai | TravelCo",
    description:
      "Discover amazing international destinations with expertly crafted travel packages. Europe, Asia, Middle East & more.",
    images: ["/world-destinations.png"],
  },
  alternates: {
    canonical: "/international",
  },
}

const internationalPackages = [
  {
    id: 1,
    title: "European Grand Tour",
    location: "Paris, Rome, London",
    duration: "12 Days / 11 Nights",
    price: 125999,
    originalPrice: 149999,
    rating: 4.7,
    reviews: 256,
    image: "/europe-landmarks.png",
    category: "Multi-City",
    highlights: ["Historic Sites", "Cultural Tours", "Fine Dining"],
    groupSize: "2-6 People",
  },
  {
    id: 2,
    title: "Bali Tropical Paradise",
    location: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviews: 189,
    image: "/bali-paradise.png",
    category: "Beach",
    highlights: ["Beach Resorts", "Temple Tours", "Spa Treatments"],
    groupSize: "2-4 People",
  },
  {
    id: 3,
    title: "Dubai Luxury Experience",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: 38999,
    originalPrice: 45999,
    rating: 4.6,
    reviews: 167,
    image: "/dubai-skyline.png",
    category: "Luxury",
    highlights: ["Burj Khalifa", "Desert Safari", "Shopping Malls"],
    groupSize: "2-8 People",
  },
  {
    id: 4,
    title: "Thailand Adventure",
    location: "Bangkok, Phuket",
    duration: "8 Days / 7 Nights",
    price: 52999,
    originalPrice: 62999,
    rating: 4.7,
    reviews: 234,
    image: "/thailand-temples.png",
    category: "Adventure",
    highlights: ["Island Hopping", "Street Food", "Cultural Sites"],
    groupSize: "2-6 People",
  },
  {
    id: 5,
    title: "Singapore City Break",
    location: "Singapore",
    duration: "4 Days / 3 Nights",
    price: 32999,
    originalPrice: 38999,
    rating: 4.5,
    reviews: 145,
    image: "/singapore-city.png",
    category: "City",
    highlights: ["Marina Bay", "Gardens by Bay", "Universal Studios"],
    groupSize: "2-6 People",
  },
  {
    id: 6,
    title: "Maldives Honeymoon",
    location: "Maldives",
    duration: "7 Days / 6 Nights",
    price: 89999,
    originalPrice: 109999,
    rating: 4.9,
    reviews: 98,
    image: "/maldives-resort.png",
    category: "Honeymoon",
    highlights: ["Overwater Villas", "Snorkeling", "Romantic Dinners"],
    groupSize: "2 People",
  },
]

export default function InternationalPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PackageListingHero
        title="Explore the World Beyond Borders"
        subtitle="Discover amazing international destinations with our expertly crafted travel packages"
        backgroundImage="/world-destinations.png"
        breadcrumb="International Packages"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <PackageFilters />
          </aside>
          <main className="lg:w-3/4">
            <PackageGrid packages={internationalPackages} />
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}

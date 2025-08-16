import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageListingHero } from "@/components/package-listing-hero"
import { PackageGrid } from "@/components/package-grid"
import { PackageFilters } from "@/components/package-filters"

const micePackages = [
  {
    id: 1,
    title: "Corporate Retreat Goa",
    location: "Goa, India",
    duration: "3 Days / 2 Nights",
    price: 12999,
    originalPrice: 15999,
    rating: 4.7,
    reviews: 89,
    image: "/corporate-retreat-goa.png",
    category: "Corporate Retreat",
    highlights: ["Team Building", "Conference Facilities", "Beach Activities"],
    groupSize: "20-100 People",
  },
  {
    id: 2,
    title: "International Conference Dubai",
    location: "Dubai, UAE",
    duration: "4 Days / 3 Nights",
    price: 45999,
    originalPrice: 52999,
    rating: 4.8,
    reviews: 156,
    image: "/dubai-conference.png",
    category: "Conference",
    highlights: ["World-class Venues", "Networking Events", "City Tours"],
    groupSize: "50-500 People",
  },
  {
    id: 3,
    title: "Incentive Trip Singapore",
    location: "Singapore",
    duration: "5 Days / 4 Nights",
    price: 38999,
    originalPrice: 44999,
    rating: 4.6,
    reviews: 67,
    image: "/singapore-incentive.png",
    category: "Incentive Travel",
    highlights: ["Luxury Hotels", "Exclusive Experiences", "Award Ceremonies"],
    groupSize: "10-50 People",
  },
  {
    id: 4,
    title: "Product Launch Mumbai",
    location: "Mumbai, India",
    duration: "2 Days / 1 Night",
    price: 8999,
    originalPrice: 11999,
    rating: 4.5,
    reviews: 134,
    image: "/mumbai-product-launch.png",
    category: "Product Launch",
    highlights: ["Premium Venues", "Media Coverage", "Networking"],
    groupSize: "100-300 People",
  },
  {
    id: 5,
    title: "Executive Meeting Bangalore",
    location: "Bangalore, India",
    duration: "2 Days / 1 Night",
    price: 9999,
    originalPrice: 12999,
    rating: 4.4,
    reviews: 78,
    image: "/bangalore-meeting.png",
    category: "Executive Meeting",
    highlights: ["Boardroom Facilities", "Tech Support", "Fine Dining"],
    groupSize: "5-25 People",
  },
  {
    id: 6,
    title: "Annual Convention Delhi",
    location: "Delhi, India",
    duration: "3 Days / 2 Nights",
    price: 15999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 203,
    image: "/delhi-convention.png",
    category: "Convention",
    highlights: ["Large Venues", "Audio Visual", "Cultural Programs"],
    groupSize: "200-1000 People",
  },
]

export default function MicePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PackageListingHero
        title="Professional MICE Services"
        subtitle="Meetings, Incentives, Conferences & Exhibitions - We handle every detail of your corporate events"
        backgroundImage="/corporate-event.png"
        breadcrumb="MICE Services"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <PackageFilters />
          </aside>
          <main className="lg:w-3/4">
            <PackageGrid packages={micePackages} />
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}

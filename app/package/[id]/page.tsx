import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageHero } from "@/components/package-hero"
import { PackageDetails } from "@/components/package-details"
import { PackageItinerary } from "@/components/package-itinerary"
import { PackageInclusions } from "@/components/package-inclusions"
import { BookingForm } from "@/components/booking-form"
import { RelatedPackages } from "@/components/related-packages"
import { PackageReviews } from "@/components/package-reviews"

// Mock data - in real app this would come from API/database
const getPackageData = (id: string) => {
  const packages = {
    "1": {
      id: "1",
      title: "Magical Goa Beach Getaway",
      location: "Goa, India",
      duration: "4 Days / 3 Nights",
      price: 15999,
      originalPrice: 19999,
      rating: 4.8,
      reviews: 124,
      category: "Beach",
      groupSize: "2-8 People",
      images: ["/goa-sunset-beach.png", "/goa-beach-resort.png", "/goa-water-sports.png", "/goa-local-cuisine.png"],
      highlights: ["Beach Resort", "Water Sports", "Local Cuisine", "Sunset Views"],
      description:
        "Experience the magic of Goa with pristine beaches, vibrant culture, and unforgettable sunsets. This carefully curated package offers the perfect blend of relaxation and adventure.",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Beach Welcome",
          activities: ["Airport pickup", "Hotel check-in", "Welcome drink", "Beach walk", "Sunset viewing"],
        },
        {
          day: 2,
          title: "Water Sports Adventure",
          activities: ["Parasailing", "Jet skiing", "Banana boat ride", "Beach lunch", "Local market visit"],
        },
        {
          day: 3,
          title: "Cultural Exploration",
          activities: ["Old Goa churches", "Spice plantation tour", "Traditional lunch", "Anjuna flea market"],
        },
        {
          day: 4,
          title: "Departure",
          activities: ["Hotel checkout", "Last-minute shopping", "Airport transfer"],
        },
      ],
      inclusions: [
        "3 nights accommodation in beach resort",
        "Daily breakfast and dinner",
        "Airport transfers",
        "Water sports activities",
        "Sightseeing tours",
        "Professional guide",
      ],
      exclusions: ["Airfare", "Personal expenses", "Lunch on day 1 & 4", "Travel insurance", "Tips and gratuities"],
      validUntil: "2024-12-31",
    },
  }

  return packages[id as keyof typeof packages] || null
}

interface PackagePageProps {
  params: { id: string }
}

export default function PackagePage({ params }: PackagePageProps) {
  const packageData = getPackageData(params.id)

  if (!packageData) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Package Not Found</h1>
          <p className="text-gray-600">The package you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <PackageHero packageData={packageData} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PackageDetails packageData={packageData} />
            <PackageItinerary itinerary={packageData.itinerary} />
            <PackageInclusions inclusions={packageData.inclusions} exclusions={packageData.exclusions} />
            <PackageReviews packageId={packageData.id} rating={packageData.rating} reviewCount={packageData.reviews} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm packageData={packageData} />
            </div>
          </div>
        </div>

        <RelatedPackages currentPackageId={packageData.id} category={packageData.category} />
      </div>

      <Footer />
    </main>
  )
}

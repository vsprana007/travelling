import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mountain-adventure.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-600/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
          Explore the World with <span className="text-amber-400">Tailored Travel Packages</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Your journey begins here. Discover unique experiences crafted just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg pulse-glow">
            Book Your Adventure Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-cyan-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent"
          >
            Explore Packages
          </Button>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm text-gray-600 block">Destination</label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full bg-transparent text-gray-800 font-medium outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm text-gray-600 block">Check-in</label>
                <input type="date" className="w-full bg-transparent text-gray-800 font-medium outline-none text-sm" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm text-gray-600 block">Travelers</label>
                <select className="w-full bg-transparent text-gray-800 font-medium outline-none text-sm">
                  <option>2 Adults</option>
                  <option>1 Adult</option>
                  <option>3 Adults</option>
                  <option>4+ Adults</option>
                </select>
              </div>
            </div>

            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white h-full min-h-[60px] sm:min-h-[auto]">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">Search</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-4 sm:left-10 hidden md:block">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-white float">
          <div className="text-xl sm:text-2xl font-bold">500+</div>
          <div className="text-xs sm:text-sm">Happy Travelers</div>
        </div>
      </div>

      <div className="absolute bottom-10 right-4 sm:right-10 hidden md:block">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-white float" style={{ animationDelay: "1s" }}>
          <div className="text-xl sm:text-2xl font-bold">50+</div>
          <div className="text-xs sm:text-sm">Destinations</div>
        </div>
      </div>
    </section>
  )
}

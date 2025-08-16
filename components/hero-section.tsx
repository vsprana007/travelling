import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          Explore the World with <span className="text-amber-400">Tailored Travel Packages</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
          Your journey begins here. Discover unique experiences crafted just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg pulse-glow">
            Book Your Adventure Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg bg-transparent"
          >
            Explore Packages
          </Button>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-cyan-600" />
              <div>
                <label className="text-sm text-gray-600">Destination</label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full bg-transparent text-gray-800 font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-cyan-600" />
              <div>
                <label className="text-sm text-gray-600">Check-in</label>
                <input type="date" className="w-full bg-transparent text-gray-800 font-medium outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-cyan-600" />
              <div>
                <label className="text-sm text-gray-600">Travelers</label>
                <select className="w-full bg-transparent text-gray-800 font-medium outline-none">
                  <option>2 Adults</option>
                  <option>1 Adult</option>
                  <option>3 Adults</option>
                  <option>4+ Adults</option>
                </select>
              </div>
            </div>

            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white h-full">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white float">
          <div className="text-2xl font-bold">500+</div>
          <div className="text-sm">Happy Travelers</div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white float" style={{ animationDelay: "1s" }}>
          <div className="text-2xl font-bold">50+</div>
          <div className="text-sm">Destinations</div>
        </div>
      </div>
    </section>
  )
}

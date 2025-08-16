import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface PackageListingHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  breadcrumb: string
}

export function PackageListingHero({ title, subtitle, backgroundImage, breadcrumb }: PackageListingHeroProps) {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-cyan-600/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-6 text-sm">
          <Link href="/" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-amber-400">{breadcrumb}</span>
        </nav>

        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">{title}</h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}

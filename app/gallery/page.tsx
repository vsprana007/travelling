import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryHero } from "@/components/gallery-hero"
import { GalleryFilters } from "@/components/gallery-filters"
import { GalleryGrid } from "@/components/gallery-grid"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GalleryHero />
      <div className="container mx-auto px-4 py-8">
        <GalleryFilters />
        <GalleryGrid />
      </div>
      <Footer />
    </main>
  )
}

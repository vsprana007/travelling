import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPackages } from "@/components/featured-packages"
import { CategoryLinks } from "@/components/category-links"
import { TestimonialsSection } from "@/components/testimonials-section"
import { InquirySection } from "@/components/inquiry-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategoryLinks />
      <FeaturedPackages />
      <TestimonialsSection />
      <InquirySection />
      <Footer />
    </main>
  )
}

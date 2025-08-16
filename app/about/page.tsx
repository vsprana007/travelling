import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutTeam } from "@/components/about-team"
import { AboutValues } from "@/components/about-values"
import { AboutStats } from "@/components/about-stats"
import { AboutTestimonials } from "@/components/about-testimonials"

export const metadata: Metadata = {
  title: "About TravelCo | Leading Travel Agency in India",
  description:
    "Learn about TravelCo's journey, our expert team, and commitment to creating unforgettable travel experiences. 15+ years of excellence in travel services.",
  keywords: [
    "about TravelCo",
    "travel agency India",
    "travel company",
    "travel experts",
    "travel services",
    "tour operators India",
    "travel team",
    "travel experience",
    "trusted travel agency",
    "professional travel services",
  ],
  openGraph: {
    title: "About TravelCo | Leading Travel Agency in India",
    description:
      "Learn about TravelCo's journey, our expert team, and commitment to creating unforgettable travel experiences.",
    images: ["/about-hero.png"],
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About TravelCo | Leading Travel Agency in India",
    description:
      "Learn about TravelCo's journey, our expert team, and commitment to creating unforgettable travel experiences.",
    images: ["/about-hero.png"],
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutStats />
      <AboutTeam />
      <AboutTestimonials />
      <Footer />
    </main>
  )
}

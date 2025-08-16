import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactMap } from "@/components/contact-map"

export const metadata: Metadata = {
  title: "Contact TravelCo | Get in Touch for Travel Inquiries",
  description:
    "Contact TravelCo for travel inquiries, bookings, and support. Call +91-9876543210 or email info@travelco.com. 24/7 customer support available.",
  keywords: [
    "contact TravelCo",
    "travel inquiries",
    "travel booking support",
    "travel agency contact",
    "travel consultation",
    "travel helpline",
    "travel customer service",
    "travel support",
    "book travel packages",
    "travel assistance",
  ],
  openGraph: {
    title: "Contact TravelCo | Get in Touch for Travel Inquiries",
    description: "Contact TravelCo for travel inquiries, bookings, and support. 24/7 customer support available.",
    images: ["/contact-hero.png"],
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact TravelCo | Get in Touch for Travel Inquiries",
    description: "Contact TravelCo for travel inquiries, bookings, and support. 24/7 customer support available.",
    images: ["/contact-hero.png"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

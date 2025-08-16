import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import { AuthProviderWrapper } from "@/components/auth-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "Webmeen Travel - Explore the World with Tailored Travel Packages",
  description:
    "Discover unique travel experiences with our domestic and international packages, MICE services, and special offers. Expert-curated tours across India and beyond with 24/7 support.",
  keywords: [
    "travel packages",
    "India tours",
    "international travel",
    "MICE services",
    "corporate travel",
    "holiday packages",
    "adventure tours",
    "cultural tours",
    "beach holidays",
    "mountain treks",
  ],
  authors: [{ name: "Webmeen Travel Team" }],
  creator: "Webmeen Travel",
  publisher: "Webmeen Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://webmeentravel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Webmeen Travel - Explore the World with Tailored Travel Packages",
    description:
      "Discover unique travel experiences with our domestic and international packages, MICE services, and special offers.",
    url: "https://webmeentravel.com",
    siteName: "Webmeen Travel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Webmeen Travel - Your Gateway to Amazing Travel Experiences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webmeen Travel - Explore the World with Tailored Travel Packages",
    description:
      "Discover unique travel experiences with our domestic and international packages, MICE services, and special offers.",
    images: ["/twitter-image.png"],
    creator: "@webmeentravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Webmeen Travel" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Webmeen Travel",
              description:
                "Expert travel agency offering domestic and international packages, MICE services, and special offers",
              url: "https://webmeentravel.com",
              logo: "https://webmeentravel.com/logo.png",
              image: "https://webmeentravel.com/og-image.png",
              telephone: "+91-9876543210",
              email: "info@webmeentravel.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Travel Street",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                postalCode: "400001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "19.0760",
                longitude: "72.8777",
              },
              openingHours: "Mo-Su 09:00-18:00",
              priceRange: "₹₹",
              sameAs: [
                "https://facebook.com/webmeentravel",
                "https://twitter.com/webmeentravel",
                "https://instagram.com/webmeentravel",
                "https://linkedin.com/company/webmeentravel",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Travel Packages",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "TouristTrip",
                      name: "Domestic Travel Packages",
                      description: "Explore incredible India with our curated domestic travel packages",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "TouristTrip",
                      name: "International Travel Packages",
                      description: "Discover the world with our international travel experiences",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  )
}

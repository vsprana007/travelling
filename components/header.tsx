"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@webmeentravel.com</span>
            </div>
          </div>
          <div className="text-cyan-600 font-medium">Book Now & Save Up to 30%!</div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-serif font-bold text-cyan-600">
            Webmeen Travel
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors">
              About Us
            </Link>
            <Link href="/domestic" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Domestic
            </Link>
            <Link href="/international" className="text-gray-700 hover:text-cyan-600 transition-colors">
              International
            </Link>
            <Link href="/mice" className="text-gray-700 hover:text-cyan-600 transition-colors">
              MICE
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
              Get Quote
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white pulse-glow">Book Now</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors">
                About Us
              </Link>
              <Link href="/domestic" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Domestic
              </Link>
              <Link href="/international" className="text-gray-700 hover:text-cyan-600 transition-colors">
                International
              </Link>
              <Link href="/mice" className="text-gray-700 hover:text-cyan-600 transition-colors">
                MICE
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Gallery
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
                  Get Quote
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">Book Now</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

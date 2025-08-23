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
        <div className="hidden lg:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>aadamholidays@gmail.com</span>
            </div>
          </div>
          <div className="text-cyan-600 font-medium">Book Now & Save Up to 30%!</div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="Webmeen Travel Logo" className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
            <span className="sr-only">Webmeen Travel</span>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              About Us
            </Link>
            <Link href="/domestic" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              Domestic
            </Link>
            <Link href="/international" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              International
            </Link>
            <Link href="/mice" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              MICE
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-cyan-600 transition-colors text-sm xl:text-base">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm px-4 py-2">
              Get Quote
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white pulse-glow text-sm px-4 py-2">Book Now</Button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t bg-white">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                About Us
              </Link>
              <Link href="/domestic" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                Domestic
              </Link>
              <Link href="/international" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                International
              </Link>
              <Link href="/mice" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                MICE
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                Gallery
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded">
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4 px-4">
                <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent w-full">
                  Get Quote
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">Book Now</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

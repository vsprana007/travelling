"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Domestic", href: "/domestic" },
  { name: "International", href: "/international" },
  { name: "MICE", href: "/mice" },
  { name: "Special Offers", href: "/offers" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-serif font-bold text-cyan-600">
              TravelCo
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t pt-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>info@travelco.com</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white">Book Now</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

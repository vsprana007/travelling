import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-cyan-400 mb-4">Webmeen Travel</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted travel partner for unforgettable journeys. We create personalized experiences that turn your
              travel dreams into reality.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/domestic" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Domestic Packages
                </Link>
              </li>
              <li>
                <Link href="/international" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  International Packages
                </Link>
              </li>
              <li>
                <Link href="/mice" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  MICE Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Holiday Packages</span>
              </li>
              <li>
                <span className="text-gray-300">Hotel Bookings</span>
              </li>
              <li>
                <span className="text-gray-300">Flight Reservations</span>
              </li>
              <li>
                <span className="text-gray-300">Car Rentals</span>
              </li>
              <li>
                <span className="text-gray-300">Travel Insurance</span>
              </li>
              <li>
                <span className="text-gray-300">Visa Assistance</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Travel Street, Tourism District, Mumbai, Maharashtra 400001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">info@webmeentravel.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Webmeen Travel. All rights reserved. | Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  )
}

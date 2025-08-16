"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, MapPin, Calendar } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "/gallery-goa-beach.png",
    title: "Sunset at Palolem Beach",
    location: "Goa, India",
    category: "Beaches",
    date: "January 2024",
  },
  {
    id: 2,
    src: "/gallery-himalaya.png",
    title: "Himalayan Peaks",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    date: "December 2023",
  },
  {
    id: 3,
    src: "/gallery-taj-mahal.png",
    title: "Taj Mahal at Dawn",
    location: "Agra, India",
    category: "Heritage",
    date: "November 2023",
  },
  {
    id: 4,
    src: "/gallery-kerala-backwaters.png",
    title: "Kerala Backwaters",
    location: "Kerala, India",
    category: "Culture",
    date: "October 2023",
  },
  {
    id: 5,
    src: "/gallery-rajasthan-palace.png",
    title: "Rajasthan Palace",
    location: "Jaipur, India",
    category: "Heritage",
    date: "September 2023",
  },
  {
    id: 6,
    src: "/gallery-adventure-trek.png",
    title: "Mountain Trekking",
    location: "Uttarakhand, India",
    category: "Adventure",
    date: "August 2023",
  },
  {
    id: 7,
    src: "/gallery-wildlife.png",
    title: "Tiger Safari",
    location: "Ranthambore, India",
    category: "Wildlife",
    date: "July 2023",
  },
  {
    id: 8,
    src: "/gallery-mumbai-city.png",
    title: "Mumbai Skyline",
    location: "Mumbai, India",
    category: "Cities",
    date: "June 2023",
  },
  {
    id: 9,
    src: "/gallery-kashmir-valley.png",
    title: "Kashmir Valley",
    location: "Kashmir, India",
    category: "Mountains",
    date: "May 2023",
  },
]

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Card
            key={image.id}
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <Badge className="absolute top-3 left-3 bg-cyan-600 text-white">{image.category}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="h-3 w-3" />
                <span>{image.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{image.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedImage.date}</span>
                </div>
                <Badge className="bg-cyan-600 text-white">{selectedImage.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

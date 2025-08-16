"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Phone, Mail, MessageSquare } from "lucide-react"

interface PackageData {
  id: string
  title: string
  price: number
}

interface BookingFormProps {
  packageData: PackageData
}

export function BookingForm({ packageData }: BookingFormProps) {
  const [travelers, setTravelers] = useState(2)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travelers: 2,
    specialRequests: "",
  })

  const totalPrice = packageData.price * travelers

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log("Booking submitted:", { ...formData, packageId: packageData.id, totalPrice })
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Book This Package</h3>
        <p className="text-gray-600 text-sm">Fill in your details to proceed with booking</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Travelers Count */}
        <div>
          <Label htmlFor="travelers" className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4" />
            Number of Travelers
          </Label>
          <Select value={travelers.toString()} onValueChange={(value) => setTravelers(Number.parseInt(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Person" : "People"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Travel Date */}
        <div>
          <Label htmlFor="travelDate" className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            Preferred Travel Date
          </Label>
          <Input
            id="travelDate"
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            required
          />
        </div>

        {/* Personal Details */}
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <Label htmlFor="specialRequests" className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Any special requirements or requests..."
            rows={3}
          />
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price per person:</span>
            <span>₹{packageData.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Number of travelers:</span>
            <span>{travelers}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount:</span>
            <span className="text-cyan-600">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="space-y-2">
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
            Book Now - Pay Later
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
          >
            Request Quote
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By booking, you agree to our terms and conditions. No payment required now.
        </p>
      </form>
    </Card>
  )
}

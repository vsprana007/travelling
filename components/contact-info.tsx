import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["123 Travel Street", "Connaught Place", "New Delhi - 110001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 11 2345 6789"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@wanderlust.com", "bookings@wanderlust.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 5:00 PM"],
  },
]

export function ContactInfo() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6">Contact Information</h3>

      <div className="space-y-6">
        {contactDetails.map((contact, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center">
              <contact.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{contact.title}</h4>
              {contact.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-gray-600 text-sm">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="h-5 w-5 text-amber-600" />
          <h4 className="font-semibold text-amber-800">24/7 Emergency Support</h4>
        </div>
        <p className="text-amber-700 text-sm">
          For urgent travel assistance while you're on your trip, call our emergency helpline:{" "}
          <strong>+91 98765 00000</strong>
        </p>
      </div>
    </Card>
  )
}

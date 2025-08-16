import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle } from "lucide-react"

export function InquirySection() {
  return (
    <section className="py-16 bg-cyan-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact Info */}
          <div className="text-white">
            <h2 className="text-4xl font-serif font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-cyan-100">
              Get in touch with our travel experts and let us create your perfect adventure
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Call Us Now</div>
                  <div className="text-cyan-100">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-cyan-100">info@travelco.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp Chat</div>
                  <div className="text-cyan-100">Quick response guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Inquiry Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Send Us Your Inquiry</h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Phone Number" type="tel" />
              </div>

              <Input placeholder="Email Address" type="email" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Destination" />
                <Input placeholder="Travel Date" type="date" />
              </div>

              <Input placeholder="Number of Travelers" type="number" />

              <Textarea
                placeholder="Tell us about your travel preferences, budget, and any special requirements..."
                rows={4}
              />

              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3">Send Inquiry</Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

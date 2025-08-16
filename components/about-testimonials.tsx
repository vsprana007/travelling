import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Arjun Mehta",
    location: "Mumbai",
    image: "/testimonial-1.png",
    rating: 5,
    text: "WanderLust made our honeymoon absolutely perfect. Every detail was taken care of, and we could just focus on enjoying our time together.",
  },
  {
    name: "Kavya Reddy",
    location: "Bangalore",
    image: "/testimonial-2.png",
    rating: 5,
    text: "The team's knowledge and passion for travel really shows. They recommended places we never would have discovered on our own.",
  },
  {
    name: "Rohit Singh",
    location: "Delhi",
    image: "/testimonial-3.png",
    rating: 5,
    text: "Professional, reliable, and genuinely caring. WanderLust has been our go-to travel partner for the past 5 years.",
  },
]

export function AboutTestimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the travelers who've experienced the WanderLust difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="h-8 w-8 text-cyan-200 absolute -top-2 -left-2" />
                <p className="text-gray-600 leading-relaxed pl-6">{testimonial.text}</p>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

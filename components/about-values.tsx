import { Card } from "@/components/ui/card"
import { Heart, Shield, Users, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description:
      "We live and breathe travel. Our passion drives us to create extraordinary experiences for every traveler.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your safety and trust are paramount. We ensure every journey is secure and worry-free.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make is centered around creating value and joy for our customers.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from planning to execution.",
  },
]

export function AboutValues() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide us in creating exceptional travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full mb-4">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

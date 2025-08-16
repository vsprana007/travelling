import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Rajesh Gupta",
    role: "Founder & CEO",
    image: "/team-ceo.png",
    bio: "With 15+ years in the travel industry, Rajesh founded WanderLust with a vision to make travel accessible to all.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    image: "/team-operations.png",
    bio: "Priya ensures every trip runs smoothly with her exceptional organizational skills and attention to detail.",
  },
  {
    name: "Amit Kumar",
    role: "Travel Consultant",
    image: "/team-consultant.png",
    bio: "Amit's extensive knowledge of destinations helps create personalized itineraries for every traveler.",
  },
  {
    name: "Sneha Patel",
    role: "Customer Relations",
    image: "/team-customer.png",
    bio: "Sneha's warm personality and problem-solving skills ensure every customer feels valued and heard.",
  },
]

export function AboutTeam() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate individuals who make your travel dreams come true
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="text-lg">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-cyan-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>

              <div className="flex justify-center gap-3">
                <button className="text-gray-400 hover:text-cyan-600 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-cyan-600 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-cyan-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

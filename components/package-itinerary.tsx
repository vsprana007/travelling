import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
}

interface PackageItineraryProps {
  itinerary: ItineraryDay[]
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Detailed Itinerary</h2>

      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={day.day} className="relative">
            {/* Timeline Line */}
            {index < itinerary.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>}

            <div className="flex gap-4">
              {/* Day Number */}
              <div className="flex-shrink-0">
                <Badge className="bg-cyan-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold">
                  {day.day}
                </Badge>
              </div>

              {/* Day Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Day {day.day}: {day.title}
                </h3>

                <div className="space-y-2">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

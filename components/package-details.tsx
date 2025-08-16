import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PackageData {
  title: string
  description: string
  highlights: string[]
}

interface PackageDetailsProps {
  packageData: PackageData
}

export function PackageDetails({ packageData }: PackageDetailsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4">About This Package</h2>

      <p className="text-gray-600 leading-relaxed mb-6">{packageData.description}</p>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {packageData.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary" className="bg-cyan-50 text-cyan-700 border-cyan-200">
              {highlight}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}

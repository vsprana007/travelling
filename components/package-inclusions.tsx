import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface PackageInclusionsProps {
  inclusions: string[]
  exclusions: string[]
}

export function PackageInclusions({ inclusions, exclusions }: PackageInclusionsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">What's Included & Excluded</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <Check className="h-5 w-5" />
            Included
          </h3>
          <ul className="space-y-2">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
            <X className="h-5 w-5" />
            Not Included
          </h3>
          <ul className="space-y-2">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

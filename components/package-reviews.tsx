"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"

interface PackageReviewsProps {
  packageId: string
  rating: number
  reviewCount: number
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/placeholder.svg",
    rating: 5,
    date: "2024-01-15",
    review:
      "Absolutely amazing experience! The beaches were pristine and the water sports were thrilling. Our guide was very knowledgeable and friendly. Highly recommend this package!",
    helpful: 12,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    avatar: "/placeholder.svg",
    rating: 4,
    date: "2024-01-10",
    review:
      "Great value for money. The accommodation was comfortable and the food was delicious. Only minor issue was the transportation could have been better.",
    helpful: 8,
  },
  {
    id: 3,
    name: "Anita Patel",
    avatar: "/placeholder.svg",
    rating: 5,
    date: "2024-01-05",
    review:
      "Perfect honeymoon destination! The sunset views were breathtaking and the resort staff was very accommodating. Will definitely book again for our anniversary.",
    helpful: 15,
  },
]

export function PackageReviews({ packageId, rating, reviewCount }: PackageReviewsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{rating}</span>
            </div>
            <span className="text-gray-600">({reviewCount} reviews)</span>
          </div>
        </div>
        <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
          Write Review
        </Button>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm w-8">{stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{stars === 5 ? 70 : stars === 4 ? 20 : 10}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-3 leading-relaxed">{review.review}</p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
          Load More Reviews
        </Button>
      </div>
    </Card>
  )
}

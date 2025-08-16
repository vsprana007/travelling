import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Destination Guide", count: 12 },
  { name: "Travel Tips", count: 8 },
  { name: "Adventure", count: 6 },
  { name: "Food & Culture", count: 5 },
  { name: "Heritage", count: 4 },
  { name: "Budget Travel", count: 3 },
]

const recentPosts = [
  {
    title: "Best Time to Visit Kashmir",
    slug: "best-time-visit-kashmir",
    date: "2024-01-18",
  },
  {
    title: "Street Food Guide to Delhi",
    slug: "delhi-street-food-guide",
    date: "2024-01-16",
  },
  {
    title: "Spiritual Journey to Varanasi",
    slug: "varanasi-spiritual-journey",
    date: "2024-01-14",
  },
]

const popularTags = [
  "Goa",
  "Himalayas",
  "Kerala",
  "Rajasthan",
  "Adventure",
  "Beaches",
  "Culture",
  "Food",
  "Heritage",
  "Budget Travel",
]

export function BlogSidebar() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Search Articles</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search blog posts..." className="pl-10" />
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <Link
                href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-600 hover:text-cyan-600 transition-colors"
              >
                {category.name}
              </Link>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Recent Posts</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-800 hover:text-cyan-600 transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs cursor-pointer hover:bg-cyan-100 hover:text-cyan-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Newsletter */}
      <Card className="p-4 bg-cyan-50 border-cyan-200">
        <h3 className="font-semibold text-gray-800 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-3">
          Get the latest travel tips and destination guides delivered to your inbox.
        </p>
        <div className="space-y-2">
          <Input placeholder="Your email address" type="email" />
          <Button size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
            Subscribe
          </Button>
        </div>
      </Card>
    </div>
  )
}

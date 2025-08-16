import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Goa Travel Guide: Beaches, Culture, and Hidden Gems",
    slug: "ultimate-goa-travel-guide",
    excerpt:
      "Discover the best of Goa with our comprehensive guide covering pristine beaches, vibrant culture, and secret spots only locals know.",
    author: "Priya Sharma",
    authorImage: "/author-priya.png",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Destination Guide",
    image: "/blog-goa-guide.png",
  },
  {
    id: 2,
    title: "10 Essential Travel Tips for First-Time Backpackers in India",
    slug: "backpacking-india-tips",
    excerpt:
      "Planning your first backpacking adventure in India? Here are the essential tips that will make your journey safe, enjoyable, and unforgettable.",
    author: "Rajesh Kumar",
    authorImage: "/author-rajesh.png",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Travel Tips",
    image: "/blog-backpacking.png",
  },
  {
    id: 3,
    title: "Himalayan Trek: A Journey to Remember",
    slug: "himalayan-trek-experience",
    excerpt:
      "Join us on an incredible journey through the Himalayas, where every step reveals breathtaking views and unforgettable experiences.",
    author: "Amit Patel",
    authorImage: "/author-amit.png",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    category: "Adventure",
    image: "/blog-himalayan-trek.png",
  },
  {
    id: 4,
    title: "Kerala's Culinary Delights: A Food Lover's Paradise",
    slug: "kerala-food-guide",
    excerpt:
      "Explore the rich flavors of Kerala cuisine, from spicy curries to sweet desserts, and discover the best places to taste authentic local food.",
    author: "Sneha Nair",
    authorImage: "/author-sneha.png",
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    category: "Food & Culture",
    image: "/blog-kerala-food.png",
  },
  {
    id: 5,
    title: "Rajasthan's Royal Heritage: Palaces and Forts",
    slug: "rajasthan-heritage-guide",
    excerpt:
      "Step into the royal history of Rajasthan as we explore magnificent palaces, imposing forts, and the stories they tell.",
    author: "Vikram Singh",
    authorImage: "/author-vikram.png",
    publishedAt: "2024-01-05",
    readTime: "9 min read",
    category: "Heritage",
    image: "/blog-rajasthan-heritage.png",
  },
  {
    id: 6,
    title: "Budget Travel: Exploring India on ₹1000 per Day",
    slug: "budget-travel-india",
    excerpt:
      "Discover how to explore incredible India on a shoestring budget without compromising on experiences and memories.",
    author: "Anita Gupta",
    authorImage: "/author-anita.png",
    publishedAt: "2024-01-03",
    readTime: "5 min read",
    category: "Budget Travel",
    image: "/blog-budget-travel.png",
  },
]

export function BlogGrid() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">Latest Articles</h2>
        <p className="text-gray-600">Stay updated with our latest travel stories and guides</p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              <div className="md:col-span-2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">{post.category}</Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{post.author}</p>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}

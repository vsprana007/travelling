import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Heart, Facebook, Twitter, Linkedin } from "lucide-react"

interface BlogPostData {
  id: string
  title: string
  content: string
  author: string
  authorImage: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

interface BlogPostProps {
  post: BlogPostData
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article>
      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
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

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 leading-tight">{post.title}</h1>

        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
              <AvatarFallback>
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800">{post.author}</p>
              <p className="text-sm text-gray-600">Travel Writer</p>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-400">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-700">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed" />
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-cyan-100 hover:text-cyan-700">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Author Bio */}
      <Card className="p-6 bg-gray-50">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
            <AvatarFallback className="text-lg">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About {post.author}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {post.author} is a passionate travel writer with over 5 years of experience exploring incredible
              destinations across India and beyond. Through detailed guides and personal stories, they help fellow
              travelers discover the magic of each destination.
            </p>
          </div>
        </div>
      </Card>
    </article>
  )
}

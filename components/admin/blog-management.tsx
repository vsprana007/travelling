"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Goa Travel Guide",
    author: "Priya Sharma",
    category: "Destination Guide",
    status: "published",
    views: 1250,
    publishedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "10 Essential Travel Tips for Backpackers",
    author: "Rajesh Kumar",
    category: "Travel Tips",
    status: "published",
    views: 890,
    publishedAt: "2024-01-12",
  },
  {
    id: 3,
    title: "Himalayan Trek: A Journey to Remember",
    author: "Amit Patel",
    category: "Adventure",
    status: "published",
    views: 2100,
    publishedAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Kerala's Culinary Delights",
    author: "Sneha Nair",
    category: "Food & Culture",
    status: "draft",
    views: 0,
    publishedAt: null,
  },
  {
    id: 5,
    title: "Budget Travel Guide to India",
    author: "Anita Gupta",
    category: "Budget Travel",
    status: "published",
    views: 1580,
    publishedAt: "2024-01-03",
  },
]

export function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200"
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Blog Management</h1>
          <p className="text-gray-600">Create and manage your travel blog content</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Blog Posts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs">
                  <p className="truncate">{post.title}</p>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{post.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                </TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

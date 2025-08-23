"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Loader2,
  Save
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogApi } from "@/lib/api"

interface BlogPost {
  id: string
  title: string
  slug?: string
  content: string
  excerpt?: string
  thumbnail?: string
  status: "Draft" | "Published" | "Scheduled"
  author_id?: string
  author?: {
    name: string
    avatar?: string
    email?: string
  }
  publish_date?: string
  created_at: string
  updated_at: string
  views?: number
  tags?: string[]
  read_time?: string
}

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Dialog state
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({})

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await blogApi.getAll()
      setPosts(response.data || [])
      setError(null)
    } catch (err) {
      console.error("Failed to fetch blog posts:", err)
      setError("Failed to load blog posts from server")
      // Set fallback data
      setPosts([
        {
          id: "1",
          title: "Ultimate Guide to Backpacking in Southeast Asia",
          content: "Discover the ultimate backpacking adventure...",
          excerpt: "Discover the ultimate backpacking adventure through Southeast Asia with our comprehensive guide covering budget tips, must-visit destinations, and safety advice.",
          status: "Published",
          author: {
            name: "Sarah Johnson",
            avatar: "/placeholder-logo.png",
            email: "sarah@webmeentravel.com"
          },
          publish_date: "2024-08-20",
          created_at: "2024-08-20T10:00:00Z",
          updated_at: "2024-08-22T10:00:00Z",
          thumbnail: "/blog-backpacking.png",
          views: 2341,
          read_time: "8 min read",
          tags: ["Backpacking", "Southeast Asia", "Budget Travel"]
        },
        {
          id: "2",
          title: "Top 10 Hidden Gems in Kerala's Backwaters",
          content: "Explore the serene and untouched beauty...",
          excerpt: "Explore the serene and untouched beauty of Kerala's backwaters beyond the popular tourist spots.",
          status: "Published",
          author: {
            name: "Raj Patel",
            avatar: "/placeholder-logo.png",
            email: "raj@webmeentravel.com"
          },
          publish_date: "2024-08-18",
          created_at: "2024-08-18T10:00:00Z",
          updated_at: "2024-08-19T10:00:00Z",
          thumbnail: "/blog-kerala-food.png",
          views: 1875,
          read_time: "6 min read",
          tags: ["Kerala", "Backwaters", "Hidden Gems"]
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const openCreateDialog = () => {
    setEditing(null)
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      thumbnail: "",
      status: "Draft",
      tags: []
    })
    setOpen(true)
  }

  const openEditDialog = (post: BlogPost) => {
    setEditing(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      thumbnail: post.thumbnail || "",
      status: post.status,
      tags: post.tags || []
    })
    setOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)
      setError(null)

      const payload = {
        title: formData.title!,
        content: formData.content!,
        excerpt: formData.excerpt || "",
        thumbnail: formData.thumbnail || "",
        status: formData.status || "Draft",
        tags: formData.tags || []
      }

      if (editing) {
        await blogApi.update(editing.id, payload)
      } else {
        await blogApi.create(payload)
      }

      setOpen(false)
      fetchPosts() // Refresh the list
    } catch (err) {
      console.error("Failed to save blog post:", err)
      setError("Failed to save blog post")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete blog post "${post.title}"? This action cannot be undone.`)) return

    try {
      setLoading(true)
      await blogApi.delete(post.id)
      fetchPosts() // Refresh the list
    } catch (err) {
      console.error("Failed to delete blog post:", err)
      setError("Failed to delete blog post")
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
  const publishedPosts = posts.filter(post => post.status === 'Published')
  const draftPosts = posts.filter(post => post.status === 'Draft')

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <span className="ml-2 text-gray-600">Loading blog posts...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Create and manage your travel blog content</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold">{publishedPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold">{draftPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
            {/* Post Thumbnail */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img 
                src={post.thumbnail || "/placeholder-logo.png"} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={
                    post.status === 'Published' ? 'default' : 
                    post.status === 'Draft' ? 'secondary' : 
                    'outline'
                  }
                >
                  {post.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="outline" className="bg-white/90 text-xs">
                  {post.read_time || "5 min read"}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(post)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(post)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              {/* Author and Date */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
                  <AvatarFallback className="text-xs">
                    {post.author?.name ? post.author.name.split(' ').map(n => n[0]).join('') : 'A'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600">{post.author?.name || "Admin"}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">
                  {post.publish_date ? new Date(post.publish_date).toLocaleDateString() : 
                   new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {/* Stats and Tags */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  {post.status === 'Published' && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{(post.views || 0).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {(post.tags || []).slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {(post.tags || []).length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{(post.tags || []).length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table View */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Blog Posts</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead>
                  <TableHead className="hidden sm:table-cell">Author</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Views</TableHead>
                  <TableHead className="hidden lg:table-cell">Published</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.thumbnail || "/placeholder-logo.png"} 
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{post.title}</p>
                          <p className="text-sm text-gray-500 truncate">{post.read_time || "5 min read"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
                          <AvatarFallback className="text-xs">
                            {post.author?.name ? post.author.name.split(' ').map(n => n[0]).join('') : 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author?.name || "Admin"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant={
                          post.status === 'Published' ? 'default' : 
                          post.status === 'Draft' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{(post.views || 0).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                      {post.publish_date ? new Date(post.publish_date).toLocaleDateString() : 'Not published'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(post)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(post)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>
              Fill in the blog post details. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter blog post title"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog post content here..."
                rows={8}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || "Draft"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as "Draft" | "Published" | "Scheduled" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={(formData.tags || []).join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                placeholder="Travel, Adventure, Tips"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editing ? "Update" : "Create"} Post
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  Image as ImageIcon, 
  Calendar,
  User,
  Bold,
  Italic,
  List,
  Link2,
  Quote,
  Plus
} from "lucide-react"
import Link from "next/link"

interface BlogForm {
  title: string
  content: string
  excerpt: string
  thumbnail: File | null
  author: string
  status: 'Published' | 'Draft' | 'Scheduled'
  publishDate: string
  tags: string[]
  slug: string
}

const availableAuthors = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@webmeentravel.com', avatar: '/placeholder-logo.png' },
  { id: '2', name: 'Raj Patel', email: 'raj@webmeentravel.com', avatar: '/placeholder-logo.png' },
  { id: '3', name: 'Mike Chen', email: 'mike@webmeentravel.com', avatar: '/placeholder-logo.png' },
  { id: '4', name: 'Priya Sharma', email: 'priya@webmeentravel.com', avatar: '/placeholder-logo.png' }
]

const suggestedTags = [
  'Travel Tips', 'Adventure', 'Budget Travel', 'Backpacking', 'Cultural Tours',
  'Beach Holidays', 'Mountain Trekking', 'Food & Culture', 'Photography',
  'Solo Travel', 'Family Travel', 'Luxury Travel', 'Wildlife', 'Heritage'
]

export default function CreateBlogPostPage() {
  const [form, setForm] = useState<BlogForm>({
    title: '',
    content: '',
    excerpt: '',
    thumbnail: null,
    author: '',
    status: 'Draft',
    publishDate: '',
    tags: [],
    slug: ''
  })

  const [newTag, setNewTag] = useState('')

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleImageUpload = (file: File) => {
    setForm(prev => ({ ...prev, thumbnail: file }))
  }

  const addTag = (tag: string) => {
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const addCustomTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim())
      setNewTag('')
    }
  }

  const handleSave = () => {
    console.log('Saving blog post:', form)
    // Implement save logic
  }

  const handlePublish = () => {
    setForm(prev => ({ ...prev, status: 'Published' }))
    handleSave()
  }

  const insertText = (before: string, after: string = '') => {
    // Simple text insertion for rich text editor simulation
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)
      const newText = before + selectedText + after
      
      setForm(prev => ({
        ...prev,
        content: prev.content.substring(0, start) + newText + prev.content.substring(end)
      }))
    }
  }

  const selectedAuthor = availableAuthors.find(author => author.id === form.author)

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-gray-600">Write and publish your travel story</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-cyan-600 hover:bg-cyan-700">
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter your blog post title..."
                    className="text-lg font-medium"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                    className="text-sm font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{form.slug}
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of your post..."
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will appear in post previews and search results
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Rich Text Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Content *</CardTitle>
                  {/* Rich Text Toolbar */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => insertText('**', '**')}
                      className="h-8 w-8"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => insertText('*', '*')}
                      className="h-8 w-8"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => insertText('\n- ')}
                      className="h-8 w-8"
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => insertText('[', '](url)')}
                      className="h-8 w-8"
                      title="Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => insertText('\n> ')}
                      className="h-8 w-8"
                      title="Quote"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="content"
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog post content here. You can use markdown formatting.

Use the toolbar above to format text:
- **Bold text**
- *Italic text*
- > Blockquotes
- [Links](url)
- Lists

You can also add images by uploading them in the sidebar and referencing them in your content."
                  rows={20}
                  className="resize-none font-mono text-sm"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Supports Markdown formatting</span>
                  <span>{form.content.length} characters</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <p className="text-sm text-gray-600">Help readers discover your content</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Tags */}
                {form.tags.length > 0 && (
                  <div>
                    <Label>Selected Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Tags */}
                <div>
                  <Label>Suggested Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedTags
                      .filter(tag => !form.tags.includes(tag))
                      .slice(0, 10)
                      .map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                          className="h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {tag}
                        </Button>
                      ))
                    }
                  </div>
                </div>

                {/* Custom Tag */}
                <div>
                  <Label>Add Custom Tag</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter custom tag..."
                      onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                    />
                    <Button onClick={addCustomTag} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(value: 'Published' | 'Draft' | 'Scheduled') => 
                    setForm(prev => ({ ...prev, status: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.status === 'Scheduled' && (
                  <div>
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={form.publishDate}
                      onChange={(e) => setForm(prev => ({ ...prev, publishDate: e.target.value }))}
                    />
                  </div>
                )}

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {form.status === 'Published' ? 'Published now' :
                       form.status === 'Scheduled' ? `Scheduled for ${form.publishDate}` :
                       'Saved as draft'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={form.author} onValueChange={(value) => 
                  setForm(prev => ({ ...prev, author: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAuthors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback className="text-xs">
                              {author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {author.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedAuthor && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedAuthor.avatar} alt={selectedAuthor.name} />
                        <AvatarFallback>
                          {selectedAuthor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{selectedAuthor.name}</p>
                        <p className="text-xs text-gray-600">{selectedAuthor.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {form.thumbnail ? form.thumbnail.name : 'Click to upload featured image'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 1200x630px
                    </p>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    {form.thumbnail ? (
                      <p className="text-sm text-gray-600">Featured: {form.thumbnail.name}</p>
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-2">{form.title || 'Blog Post Title'}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {form.excerpt || 'Blog post excerpt will appear here...'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {selectedAuthor?.name || 'Author'}
                    </span>
                    <Badge variant={form.status === 'Published' ? 'default' : 'secondary'}>
                      {form.status}
                    </Badge>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {form.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {form.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{form.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

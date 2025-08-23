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
  X,
  Package,
  Plus
} from "lucide-react"
import Link from "next/link"

interface CategoryForm {
  name: string
  type: 'Tour' | 'Hotel' | ''
  description: string
  thumbnailImage: File | null
  bannerImage: File | null
  themes: string[]
  selectedPackages: string[]
  status: 'Active' | 'Draft'
}

const availableThemes = [
  'Adventure', 'Beach', 'Culture', 'Heritage', 'History', 'Luxury', 
  'Mountains', 'Nature', 'Outdoors', 'Relaxation', 'Romantic', 
  'Sports', 'Spiritual', 'Trekking', 'Tropical', 'Wildlife'
]

const availablePackages = [
  { id: '1', name: 'Golden Triangle Tour', status: 'Published' },
  { id: '2', name: 'Goa Beach Paradise', status: 'Published' },
  { id: '3', name: 'Kerala Backwaters', status: 'Published' },
  { id: '4', name: 'Himalayan Trek', status: 'Draft' },
  { id: '5', name: 'Rajasthan Heritage', status: 'Published' },
  { id: '6', name: 'Mumbai City Tour', status: 'Published' },
]

export default function CreateCategoryPage() {
  const [form, setForm] = useState<CategoryForm>({
    name: '',
    type: '',
    description: '',
    thumbnailImage: null,
    bannerImage: null,
    themes: [],
    selectedPackages: [],
    status: 'Draft'
  })

  const [newTheme, setNewTheme] = useState('')

  const handleImageUpload = (field: 'thumbnailImage' | 'bannerImage', file: File) => {
    setForm(prev => ({ ...prev, [field]: file }))
  }

  const addTheme = (theme: string) => {
    if (theme && !form.themes.includes(theme)) {
      setForm(prev => ({
        ...prev,
        themes: [...prev.themes, theme]
      }))
    }
  }

  const removeTheme = (theme: string) => {
    setForm(prev => ({
      ...prev,
      themes: prev.themes.filter(t => t !== theme)
    }))
  }

  const addCustomTheme = () => {
    if (newTheme.trim()) {
      addTheme(newTheme.trim())
      setNewTheme('')
    }
  }

  const togglePackage = (packageId: string) => {
    setForm(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.includes(packageId)
        ? prev.selectedPackages.filter(id => id !== packageId)
        : [...prev.selectedPackages, packageId]
    }))
  }

  const handleSave = () => {
    console.log('Saving category:', form)
    // Implement save logic
  }

  const handlePublish = () => {
    setForm(prev => ({ ...prev, status: 'Active' }))
    handleSave()
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/categories">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Category</h1>
              <p className="text-gray-600">Organize your packages into collections</p>
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
                <CardTitle>Category Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter category name..."
                    className="text-lg font-medium"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={form.type} onValueChange={(value: 'Tour' | 'Hotel') => 
                    setForm(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tour">Tour</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this category..."
                    rows={6}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Thumbnail Image */}
                <div>
                  <Label>Thumbnail Image *</Label>
                  <p className="text-xs text-gray-500 mb-2">Used in category listings and cards</p>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload('thumbnailImage', e.target.files[0])}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                      <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {form.thumbnailImage ? form.thumbnailImage.name : 'Click to upload thumbnail (400x300px recommended)'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <Label>Banner Image *</Label>
                  <p className="text-xs text-gray-500 mb-2">Used as category header background</p>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload('bannerImage', e.target.files[0])}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label htmlFor="banner-upload" className="cursor-pointer">
                      <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {form.bannerImage ? form.bannerImage.name : 'Click to upload banner (1200x400px recommended)'}
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Themes */}
            <Card>
              <CardHeader>
                <CardTitle>Themes</CardTitle>
                <p className="text-sm text-gray-600">Tag this category with relevant themes</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Themes */}
                {form.themes.length > 0 && (
                  <div>
                    <Label>Selected Themes</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.themes.map((theme) => (
                        <Badge key={theme} variant="secondary" className="px-3 py-1">
                          {theme}
                          <button
                            onClick={() => removeTheme(theme)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Themes */}
                <div>
                  <Label>Available Themes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableThemes
                      .filter(theme => !form.themes.includes(theme))
                      .map((theme) => (
                        <Button
                          key={theme}
                          variant="outline"
                          size="sm"
                          onClick={() => addTheme(theme)}
                          className="h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {theme}
                        </Button>
                      ))
                    }
                  </div>
                </div>

                {/* Custom Theme */}
                <div>
                  <Label>Add Custom Theme</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newTheme}
                      onChange={(e) => setNewTheme(e.target.value)}
                      placeholder="Enter custom theme..."
                      onKeyPress={(e) => e.key === 'Enter' && addCustomTheme()}
                    />
                    <Button onClick={addCustomTheme} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Packages</CardTitle>
                <p className="text-sm text-gray-600">Select packages that belong to this category</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availablePackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`package-${pkg.id}`}
                          checked={form.selectedPackages.includes(pkg.id)}
                          onChange={() => togglePackage(pkg.id)}
                          className="rounded border-gray-300"
                        />
                        <div>
                          <Label htmlFor={`package-${pkg.id}`} className="font-medium">
                            {pkg.name}
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Package className="h-3 w-3 text-gray-400" />
                            <Badge variant={pkg.status === 'Published' ? 'default' : 'secondary'} className="text-xs">
                              {pkg.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  {form.selectedPackages.length} packages selected
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {form.status === 'Active' ? 'Active' : 'Draft'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {form.status === 'Active' 
                        ? 'This category is live and visible'
                        : 'This category is saved as draft'
                      }
                    </p>
                  </div>
                  <Switch
                    checked={form.status === 'Active'}
                    onCheckedChange={(checked) => 
                      setForm(prev => ({ ...prev, status: checked ? 'Active' : 'Draft' }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    {form.bannerImage ? (
                      <p className="text-sm text-gray-600">Banner: {form.bannerImage.name}</p>
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{form.name || 'Category Name'}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {form.description || 'Category description will appear here...'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{form.selectedPackages.length} packages</span>
                    <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
                      {form.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>Help</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p><strong>Name:</strong> Choose a clear, descriptive name</p>
                <p><strong>Type:</strong> Tour for travel packages, Hotel for accommodations</p>
                <p><strong>Themes:</strong> Help customers filter and discover content</p>
                <p><strong>Images:</strong> Use high-quality, relevant images</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

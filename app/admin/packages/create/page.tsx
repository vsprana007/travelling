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
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  GripVertical,
  Save,
  Eye,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface ItineraryDay {
  id: string
  title: string
  description: string
}

interface PackageForm {
  name: string
  description: string
  price: string
  offerPrice: string
  status: 'draft' | 'published'
  categories: string[]
  thumbnailImage: File | null
  bannerImage: File | null
  galleryImages: File[]
  itinerary: ItineraryDay[]
}

const categories = [
  { id: '1', name: 'Adventure Travel' },
  { id: '2', name: 'Beach Holidays' },
  { id: '3', name: 'Cultural Tours' },
  { id: '4', name: 'Mountain Trekking' }
]

export default function CreatePackagePage() {
  const [form, setForm] = useState<PackageForm>({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    status: 'draft',
    categories: [],
    thumbnailImage: null,
    bannerImage: null,
    galleryImages: [],
    itinerary: [{ id: '1', title: '', description: '' }]
  })

  const addItineraryDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      title: '',
      description: ''
    }
    setForm(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, newDay]
    }))
  }

  const removeItineraryDay = (id: string) => {
    setForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter(day => day.id !== id)
    }))
  }

  const updateItineraryDay = (id: string, field: 'title' | 'description', value: string) => {
    setForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.map(day =>
        day.id === id ? { ...day, [field]: value } : day
      )
    }))
  }

  const handleImageUpload = (field: 'thumbnailImage' | 'bannerImage', file: File) => {
    setForm(prev => ({ ...prev, [field]: file }))
  }

  const handleGalleryUpload = (files: FileList) => {
    const newFiles = Array.from(files)
    setForm(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newFiles]
    }))
  }

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    console.log('Saving package:', form)
    // Implement save logic
  }

  const handlePublish = () => {
    setForm(prev => ({ ...prev, status: 'published' }))
    handleSave()
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/packages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
              <p className="text-gray-600">Add a new travel package to your catalog</p>
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
                <CardTitle>Package Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Package Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter package name..."
                    className="text-lg font-medium"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your package in detail..."
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include tour details, inclusions, and exclusions
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tour Itinerary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tour Itinerary</CardTitle>
                  <Button onClick={addItineraryDay} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Day
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.itinerary.map((day, index) => (
                  <div key={day.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <h4 className="font-medium">Day {index + 1}</h4>
                      </div>
                      {form.itinerary.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItineraryDay(day.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <Label>Day Title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) => updateItineraryDay(day.id, 'title', e.target.value)}
                        placeholder="e.g., Arrival in Delhi"
                      />
                    </div>
                    <div>
                      <Label>Day Description</Label>
                      <Textarea
                        value={day.description}
                        onChange={(e) => updateItineraryDay(day.id, 'description', e.target.value)}
                        placeholder="Describe the activities for this day..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="price"
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="offerPrice">Offer Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="offerPrice"
                        type="number"
                        value={form.offerPrice}
                        onChange={(e) => setForm(prev => ({ ...prev, offerPrice: e.target.value }))}
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                  </div>
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
                        {form.thumbnailImage ? form.thumbnailImage.name : 'Click to upload thumbnail'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <Label>Banner Image *</Label>
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
                        {form.bannerImage ? form.bannerImage.name : 'Click to upload banner'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <Label>Gallery Images</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
                      className="hidden"
                      id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop images here, or click to browse
                      </p>
                    </label>
                  </div>
                  
                  {/* Gallery Preview */}
                  {form.galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {form.galleryImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                          <button
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
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
                      {form.status === 'published' ? 'Published' : 'Draft'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {form.status === 'published' 
                        ? 'This package is live and visible to customers'
                        : 'This package is saved as draft'
                      }
                    </p>
                  </div>
                  <Switch
                    checked={form.status === 'published'}
                    onCheckedChange={(checked) => 
                      setForm(prev => ({ ...prev, status: checked ? 'published' : 'draft' }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={form.categories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm(prev => ({
                              ...prev,
                              categories: [...prev.categories, category.id]
                            }))
                          } else {
                            setForm(prev => ({
                              ...prev,
                              categories: prev.categories.filter(id => id !== category.id)
                            }))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">No reviews yet</p>
                  <Button variant="outline" size="sm">
                    Add Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

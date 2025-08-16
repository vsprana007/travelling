"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CreatePackageFormProps {
  onSuccess: () => void
}

export function CreatePackageForm({ onSuccess }: CreatePackageFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration_days: "",
    max_people: "",
    category: "",
    image_url: "",
    is_featured: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    "Domestic Tours",
    "International Tours",
    "Adventure Tours",
    "Cultural Tours",
    "Beach Holidays",
    "Pilgrimage Tours",
    "MICE Tours",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      console.log("Creating package:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSuccess()
    } catch (error) {
      console.error("Failed to create package:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Package Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter package title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter package description"
          rows={4}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="25000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (Days)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration_days}
            onChange={(e) => handleChange("duration_days", e.target.value)}
            placeholder="6"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_people">Max People</Label>
          <Input
            id="max_people"
            type="number"
            value={formData.max_people}
            onChange={(e) => handleChange("max_people", e.target.value)}
            placeholder="15"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => handleChange("image_url", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) => handleChange("is_featured", checked as boolean)}
        />
        <Label htmlFor="featured">Mark as featured package</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Package"}
        </Button>
      </div>
    </form>
  )
}

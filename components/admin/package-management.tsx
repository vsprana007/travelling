"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye, Filter, Loader2, Save, X } from "lucide-react"
import { packagesApi, categoriesApi } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Package {
  id: string
  title: string
  description: string
  price: number
  duration_days: number
  max_people: number
  category_id: string
  category?: string
  image_url?: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: any
  is_featured: boolean
  is_active: boolean
  created_at: string
  bookings_count?: number
  rating?: number
}

interface Category {
  id: string
  name: string
  description?: string
  icon?: string
}

export function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Dialog state
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Package | null>(null)
  const [formData, setFormData] = useState<Partial<Package>>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [packagesRes, categoriesRes] = await Promise.all([
        packagesApi.getAll(),
        categoriesApi.getAll()
      ])
      
      // Handle the response which might have packages array or be direct array
      const packagesData = Array.isArray(packagesRes.data) ? packagesRes.data : packagesRes.data?.packages || []
      setPackages(packagesData)
      setCategories(categoriesRes.data || [])
      setError(null)
    } catch (err) {
      console.error("Failed to fetch data:", err)
      setError("Failed to load data from server")
    } finally {
      setLoading(false)
    }
  }

  const openCreateDialog = () => {
    setEditing(null)
    setFormData({
      title: "",
      description: "",
      price: 0,
      duration_days: 1,
      max_people: 1,
      category_id: "",
      image_url: "",
      highlights: [],
      inclusions: [],
      exclusions: [],
      itinerary: [],
      is_featured: false,
      is_active: true
    })
    setOpen(true)
  }

  const openEditDialog = (pkg: Package) => {
    setEditing(pkg)
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      max_people: pkg.max_people,
      category_id: pkg.category_id,
      image_url: pkg.image_url || "",
      highlights: pkg.highlights || [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      itinerary: pkg.itinerary || [],
      is_featured: pkg.is_featured,
      is_active: pkg.is_active
    })
    setOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.category_id) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)
      setError(null)

      const payload = {
        title: formData.title!,
        description: formData.description!,
        price: formData.price || 0,
        duration_days: formData.duration_days || 1,
        max_people: formData.max_people || 1,
        category_id: formData.category_id!,
        image_url: formData.image_url || null,
        highlights: formData.highlights || [],
        inclusions: formData.inclusions || [],
        exclusions: formData.exclusions || [],
        itinerary: formData.itinerary || [],
        is_featured: formData.is_featured || false
      }

      if (editing) {
        await packagesApi.update(editing.id, payload)
      } else {
        await packagesApi.create(payload)
      }

      setOpen(false)
      fetchData() // Refresh the list
    } catch (err) {
      console.error("Failed to save package:", err)
      setError("Failed to save package")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (pkg: Package) => {
    if (!confirm(`Delete package "${pkg.title}"? This action cannot be undone.`)) return

    try {
      setLoading(true)
      await packagesApi.delete(pkg.id)
      fetchData() // Refresh the list
    } catch (err) {
      console.error("Failed to delete package:", err)
      setError("Failed to delete package")
    } finally {
      setLoading(false)
    }
  }

  const updateArrayField = (field: 'highlights' | 'inclusions' | 'exclusions', value: string) => {
    const items = value.split('\n').filter(item => item.trim())
    setFormData(prev => ({ ...prev, [field]: items }))
  }

  const filteredPackages = (packages || []).filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.category || categories.find(c => c.id === pkg.category_id)?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && packages.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <span className="ml-2 text-gray-600">Loading packages...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-gray-800">Package Management</h1>
          <p className="text-sm lg:text-base text-gray-600">Manage your travel packages and offerings</p>
        </div>
        {/* <Button onClick={openCreateDialog} className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm lg:text-base">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Add New Package</span>
          <span className="sm:hidden">New Package</span>
        </Button> */}
        <Link href="/admin/packages/create">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm lg:text-base">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add New Package</span>
            <span className="sm:hidden">New Package</span>
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          <Button onClick={fetchData} variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm">
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Packages Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs lg:text-sm">Package Name</TableHead>
                <TableHead className="hidden md:table-cell text-xs lg:text-sm">Category</TableHead>
                <TableHead className="text-xs lg:text-sm">Price</TableHead>
                <TableHead className="hidden sm:table-cell text-xs lg:text-sm">Duration</TableHead>
                <TableHead className="text-xs lg:text-sm">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-xs lg:text-sm">Featured</TableHead>
                <TableHead className="text-xs lg:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="text-sm lg:text-base">{pkg.title}</p>
                      <div className="md:hidden text-xs text-gray-500 mt-1">
                        <span>{categories.find(c => c.id === pkg.category_id)?.name || "Unknown"}</span>
                        <span className="sm:hidden ml-2">{pkg.duration_days} days</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.id === pkg.category_id)?.name || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-sm lg:text-base">₹{pkg.price.toLocaleString()}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{pkg.duration_days} days</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${
                        pkg.is_active
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {pkg.is_active ? "active" : "inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {pkg.is_featured ? (
                      <Badge variant="default" className="text-xs">Featured</Badge>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8">
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8" onClick={() => openEditDialog(pkg)}>
                        <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8 text-red-600 hover:text-red-700" onClick={() => handleDelete(pkg)}>
                        <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Package" : "Create New Package"}</DialogTitle>
            <DialogDescription>
              Fill in the package details. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Package Title *</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter package title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter package description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (days) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration_days || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_days: parseInt(e.target.value) || 1 }))}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max_people">Max People *</Label>
                <Input
                  id="max_people"
                  type="number"
                  value={formData.max_people || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_people: parseInt(e.target.value) || 1 }))}
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category_id || ""}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="highlights">Highlights (one per line)</Label>
              <Textarea
                id="highlights"
                value={(formData.highlights || []).join('\n')}
                onChange={(e) => updateArrayField('highlights', e.target.value)}
                placeholder="Enter package highlights, one per line"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="inclusions">Inclusions (one per line)</Label>
              <Textarea
                id="inclusions"
                value={(formData.inclusions || []).join('\n')}
                onChange={(e) => updateArrayField('inclusions', e.target.value)}
                placeholder="Enter what's included, one per line"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="exclusions">Exclusions (one per line)</Label>
              <Textarea
                id="exclusions"
                value={(formData.exclusions || []).join('\n')}
                onChange={(e) => updateArrayField('exclusions', e.target.value)}
                placeholder="Enter what's not included, one per line"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="is_featured">Featured Package</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active !== false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active Package</Label>
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
                  {editing ? "Update" : "Create"} Package
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  FolderOpen,
  Map,
  Plane,
  Building,
  Gift,
  MoreHorizontal,
  Loader2,
  Save
} from "lucide-react"
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
import { categoriesApi } from "@/lib/api"

interface Category {
  id: string
  name: string
  description?: string
  slug?: string
  icon?: string
  color?: string
  parent_id?: string
  is_active: boolean
  package_count?: number
  created_at: string
  updated_at: string
}

const iconOptions = [
  { value: "FolderOpen", label: "Folder", icon: FolderOpen },
  { value: "Map", label: "Map", icon: Map },
  { value: "Plane", label: "Plane", icon: Plane },
  { value: "Building", label: "Building", icon: Building },
  { value: "Gift", label: "Gift", icon: Gift },
]

const colorOptions = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "cyan", label: "Cyan", color: "bg-cyan-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
]

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Dialog state
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [formData, setFormData] = useState<Partial<Category>>({})

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await categoriesApi.getAll()
      const categoriesData = Array.isArray(response.data) ? response.data : (response.data as any)?.categories || []
      setCategories(categoriesData)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      setError("Failed to load categories from server")
      // Set fallback data
      setCategories([
        {
          id: "1",
          name: "Domestic Tours",
          description: "Explore the beautiful destinations within India",
          slug: "domestic-tours",
          icon: "Map",
          color: "blue",
          is_active: true,
          package_count: 12,
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-15T10:00:00Z"
        },
        {
          id: "2",
          name: "International Tours",
          description: "Discover amazing places around the world",
          slug: "international-tours",
          icon: "Plane",
          color: "green",
          is_active: true,
          package_count: 8,
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-10T10:00:00Z"
        },
        {
          id: "3",
          name: "MICE Tours",
          description: "Meetings, Incentives, Conferences & Exhibitions",
          slug: "mice-tours",
          icon: "Building",
          color: "purple",
          is_active: true,
          package_count: 5,
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-12T10:00:00Z"
        },
        {
          id: "4",
          name: "Adventure Tours",
          description: "Thrilling adventures and outdoor activities",
          slug: "adventure-tours",
          icon: "Gift",
          color: "orange",
          is_active: true,
          package_count: 7,
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-14T10:00:00Z"
        },
        {
          id: "5",
          name: "Cultural Tours",
          description: "Immerse yourself in local culture and heritage",
          slug: "cultural-tours",
          icon: "FolderOpen",
          color: "cyan",
          is_active: false,
          package_count: 3,
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-13T10:00:00Z"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const openCreateDialog = () => {
    setEditing(null)
    setFormData({
      name: "",
      description: "",
      icon: "FolderOpen",
      color: "blue",
      is_active: true
    })
    setOpen(true)
  }

  const openEditDialog = (category: Category) => {
    setEditing(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "FolderOpen",
      color: category.color || "blue",
      is_active: category.is_active
    })
    setOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name) {
      setError("Please enter a category name")
      return
    }

    try {
      setSaving(true)
      setError(null)

      const payload = {
        name: formData.name!,
        description: formData.description || "",
        icon: formData.icon || "FolderOpen",
        color: formData.color || "blue",
        is_active: formData.is_active ?? true
      }

      if (editing) {
        await categoriesApi.update(editing.id, payload)
      } else {
        await categoriesApi.create(payload)
      }

      setOpen(false)
      fetchCategories() // Refresh the list
    } catch (err) {
      console.error("Failed to save category:", err)
      setError("Failed to save category")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (category: Category) => {
    if (!confirm(`Delete category "${category.name}"? This action cannot be undone.`)) return

    try {
      setLoading(true)
      await categoriesApi.delete(category.id)
      fetchCategories() // Refresh the list
    } catch (err) {
      console.error("Failed to delete category:", err)
      setError("Failed to delete category")
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (category: Category) => {
    try {
      await categoriesApi.update(category.id, {
        ...category,
        is_active: !category.is_active
      })
      fetchCategories() // Refresh the list
    } catch (err) {
      console.error("Failed to update category status:", err)
      setError("Failed to update category status")
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCategories = categories.filter(cat => cat.is_active)
  const totalPackages = categories.reduce((sum, cat) => sum + (cat.package_count || 0), 0)

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : FolderOpen
  }

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <span className="ml-2 text-gray-600">Loading categories...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Organize your travel packages into categories</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold">{activeCategories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Gift className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold">{totalPackages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = getIconComponent(category.icon || "FolderOpen")
          const colorClass = colorOptions.find(opt => opt.value === category.color)?.color || "bg-blue-500"
          
          return (
            <Card key={category.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClass}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(category)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(category)}>
                        {category.is_active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(category)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                    <Badge variant={category.is_active ? "default" : "secondary"}>
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                    <span>{category.package_count || 0} packages</span>
                    <span>Updated {new Date(category.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Categories</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
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
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Packages</TableHead>
                  <TableHead className="hidden lg:table-cell">Updated</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => {
                  const IconComponent = getIconComponent(category.icon || "FolderOpen")
                  const colorClass = colorOptions.find(opt => opt.value === category.color)?.color || "bg-blue-500"
                  
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900">{category.name}</p>
                            <p className="text-sm text-gray-500">{category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {category.description || "No description"}
                        </p>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={category.is_active ? "default" : "secondary"}>
                          {category.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {category.package_count || 0} packages
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                        {new Date(category.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(category)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStatus(category)}>
                              {category.is_active ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(category)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              Fill in the category details. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon || "FolderOpen"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => {
                      const IconComponent = option.icon
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select
                  value={formData.color || "blue"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active ?? true}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              />
              <Label htmlFor="is_active" className="text-sm font-normal">
                Active category (visible to users)
              </Label>
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
                  {editing ? "Update" : "Create"} Category
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

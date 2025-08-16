"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, Package } from "lucide-react"

interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  package_count: number
  is_active: boolean
  created_at: string
}

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockCategories: Category[] = [
        {
          id: "1",
          name: "Domestic Tours",
          description: "Explore the incredible diversity of India",
          icon: "map-pin",
          package_count: 12,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          name: "International Tours",
          description: "Discover amazing destinations around the world",
          icon: "globe",
          package_count: 8,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "3",
          name: "Adventure Tours",
          description: "Thrilling adventures for the bold",
          icon: "mountain",
          package_count: 5,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "4",
          name: "Cultural Tours",
          description: "Immerse in rich cultures and traditions",
          icon: "camera",
          package_count: 7,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "5",
          name: "Beach Holidays",
          description: "Relax at pristine beaches",
          icon: "sun",
          package_count: 4,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
      ]

      setCategories(mockCategories)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createCategory = async () => {
    try {
      const category: Category = {
        id: Date.now().toString(),
        ...newCategory,
        package_count: 0,
        is_active: true,
        created_at: new Date().toISOString(),
      }

      setCategories([...categories, category])
      setNewCategory({ name: "", description: "", icon: "" })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Failed to create category:", error)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      setCategories(categories.filter((cat) => cat.id !== categoryId))
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Loading categories...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
        <CardDescription>Manage travel package categories</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Actions */}
        <div className="flex items-center justify-between space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>Add a new category for travel packages</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Enter category name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Enter category description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    placeholder="Enter icon name (e.g., map-pin)"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createCategory} disabled={!newCategory.name}>
                    Create Category
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Packages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-medium">{category.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{category.description || "No description"}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.package_count} packages</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.is_active ? "default" : "destructive"}>
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{new Date(category.created_at).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCategory(category.id)}
                        disabled={category.package_count > 0}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No categories found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Tag, Package, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Adventure Travel",
    type: "Tour",
    slug: "adventure-travel",
    description: "Thrilling adventure packages for adrenaline seekers including trekking, rafting, and extreme sports.",
    packagesCount: 15,
    status: "Active",
    color: "#f59e0b",
    thumbnailImage: "/gallery-adventure-trek.png",
    bannerImage: "/mountain-adventure.png",
    themes: ["Adventure", "Outdoors", "Sports"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Beach Holidays",
    type: "Tour",
    slug: "beach-holidays",
    description: "Relaxing beach destinations and coastal getaways with crystal clear waters and pristine beaches.",
    packagesCount: 28,
    status: "Active", 
    color: "#06b6d4",
    thumbnailImage: "/goa-sunset-beach.png",
    bannerImage: "/gallery-goa-beach.png",
    themes: ["Beach", "Relaxation", "Tropical"],
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Cultural Tours",
    type: "Tour",
    slug: "cultural-tours",
    description: "Immersive cultural experiences and heritage sites showcasing local traditions and history.",
    packagesCount: 12,
    status: "Active",
    color: "#8b5cf6",
    thumbnailImage: "/gallery-taj-mahal.png",
    bannerImage: "/gallery-rajasthan-palace.png",
    themes: ["Culture", "Heritage", "History"],
    createdAt: "2024-02-05"
  },
  {
    id: 4,
    name: "Mountain Trekking",
    type: "Tour", 
    slug: "mountain-trekking",
    description: "High-altitude treks and mountain expeditions for experienced adventurers.",
    packagesCount: 8,
    status: "Draft",
    color: "#10b981",
    thumbnailImage: "/himalayan-trekking.png",
    bannerImage: "/gallery-himalaya.png",
    themes: ["Mountains", "Trekking", "Adventure"],
    createdAt: "2024-02-15"
  },
  {
    id: 5,
    name: "Luxury Hotels",
    type: "Hotel",
    slug: "luxury-hotels",
    description: "Premium accommodation experiences with world-class amenities and service.",
    packagesCount: 45,
    status: "Active",
    color: "#f59e0b",
    thumbnailImage: "/luxury-resort-discount.png",
    bannerImage: "/luxury-resort-discount.png",
    themes: ["Luxury", "Hotels", "Premium"],
    createdAt: "2024-03-01"
  }
]

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Organize your travel packages into collections</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto" asChild>
            <Link href="/admin/categories/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Category
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="h-5 w-5 text-blue-600" />
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
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Categories</p>
                  <p className="text-2xl font-bold">{categories.filter(c => c.status === 'Active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Package className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Packages</p>
                  <p className="text-2xl font-bold">{categories.reduce((sum, c) => sum + c.packagesCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Tag className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tour Categories</p>
                  <p className="text-2xl font-bold">{categories.filter(c => c.type === 'Tour').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              {/* Category Image */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img 
                  src={category.bannerImage} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={category.status === 'Active' ? 'default' : 'secondary'}>
                    {category.status}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-white/90">
                    {category.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/categories/${category.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/categories/${category.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{category.packagesCount} packages</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.createdAt}
                  </div>
                </div>
                
                {/* Themes */}
                <div className="flex flex-wrap gap-1">
                  {category.themes.slice(0, 3).map((theme) => (
                    <Badge key={theme} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                  {category.themes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.themes.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table View (Alternative - can be toggled) */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Categories</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  className="pl-10"
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
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Packages</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Created</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={category.thumbnailImage} 
                            alt={category.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{category.name}</p>
                            <p className="text-sm text-gray-500 truncate">{category.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{category.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{category.packagesCount}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={category.status === 'Active' ? 'default' : 'secondary'}>
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                        {category.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/categories/${category.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/categories/${category.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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
      </div>
    </AdminLayout>
  )
}

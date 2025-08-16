"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye, Filter, Loader2 } from "lucide-react"
import { packagesApi } from "@/lib/api"

interface Package {
  id: number
  title: string
  category: string
  price: number
  duration: string
  is_active: boolean
  bookings_count?: number
  rating?: number
}

export function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        const response = await packagesApi.getAll()
        setPackages(response.data)
      } catch (err) {
        console.error("Failed to fetch packages:", err)
        setError("Failed to load packages")
        setPackages([
          {
            id: 1,
            title: "Goa Beach Paradise",
            category: "Domestic",
            price: 25000,
            duration: "5 Days",
            is_active: true,
            bookings_count: 23,
            rating: 4.8,
          },
          {
            id: 2,
            title: "Himalayan Adventure Trek",
            category: "Adventure",
            price: 45000,
            duration: "10 Days",
            is_active: true,
            bookings_count: 15,
            rating: 4.9,
          },
          {
            id: 3,
            title: "Kerala Backwaters Cruise",
            category: "Domestic",
            price: 32000,
            duration: "7 Days",
            is_active: true,
            bookings_count: 31,
            rating: 4.7,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <span className="ml-2 text-gray-600">Loading packages...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Package Management</h1>
          <p className="text-gray-600">Manage your travel packages and offerings</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Package
        </Button>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg">
          {error} - Showing sample data
        </div>
      )}

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search packages..."
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

      {/* Packages Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{pkg.category}</Badge>
                </TableCell>
                <TableCell className="font-semibold">₹{pkg.price.toLocaleString()}</TableCell>
                <TableCell>{pkg.duration}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      pkg.is_active
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }
                  >
                    {pkg.is_active ? "active" : "inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{pkg.bookings_count || 0}</TableCell>
                <TableCell>{pkg.rating ? `${pkg.rating}/5` : "-"}</TableCell>
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

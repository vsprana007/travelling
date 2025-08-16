"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, MessageSquare } from "lucide-react"

const bookings = [
  {
    id: "BK001",
    customer: "Priya Sharma",
    email: "priya@email.com",
    package: "Goa Beach Paradise",
    travelers: 2,
    amount: "₹25,000",
    status: "confirmed",
    date: "2024-01-20",
    travelDate: "2024-02-15",
  },
  {
    id: "BK002",
    customer: "Rajesh Kumar",
    email: "rajesh@email.com",
    package: "Himalayan Adventure",
    travelers: 4,
    amount: "₹45,000",
    status: "pending",
    date: "2024-01-19",
    travelDate: "2024-03-10",
  },
  {
    id: "BK003",
    customer: "Sneha Patel",
    email: "sneha@email.com",
    package: "Kerala Backwaters",
    travelers: 3,
    amount: "₹32,000",
    status: "confirmed",
    date: "2024-01-18",
    travelDate: "2024-02-28",
  },
  {
    id: "BK004",
    customer: "Amit Singh",
    email: "amit@email.com",
    package: "Rajasthan Heritage",
    travelers: 2,
    amount: "₹38,000",
    status: "cancelled",
    date: "2024-01-17",
    travelDate: "2024-03-05",
  },
  {
    id: "BK005",
    customer: "Kavya Nair",
    email: "kavya@email.com",
    package: "Corporate Retreat",
    travelers: 15,
    amount: "₹2,25,000",
    status: "confirmed",
    date: "2024-01-16",
    travelDate: "2024-02-20",
  },
]

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Booking Management</h1>
          <p className="text-gray-600">Track and manage customer bookings</p>
        </div>
        <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
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

      {/* Bookings Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Travelers</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Travel Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-gray-500">{booking.email}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.package}</TableCell>
                <TableCell>{booking.travelers}</TableCell>
                <TableCell className="font-semibold">{booking.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </TableCell>
                <TableCell>{new Date(booking.travelDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
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

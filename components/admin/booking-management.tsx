"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, MessageSquare, Loader2 } from "lucide-react"

interface Booking {
  id: string
  customer: string
  email: string
  package: string
  travelers: number
  amount: string
  status: "confirmed" | "pending" | "cancelled"
  date: string
  travelDate: string
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      // TODO: Replace with actual API call when backend is ready
      // const response = await bookingsApi.getAll()
      // setBookings(response.data)
      
      // Mock data for now
      const mockBookings: Booking[] = [
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
      
      setBookings(mockBookings)
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: "confirmed" | "pending" | "cancelled") => {
    try {
      // TODO: Replace with actual API call
      // await bookingsApi.updateStatus(bookingId, newStatus)
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ))
    } catch (error) {
      console.error("Failed to update booking status:", error)
    }
  }

  const filteredBookings = bookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <span className="ml-2 text-gray-600">Loading bookings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-gray-800">Booking Management</h1>
          <p className="text-sm lg:text-base text-gray-600">Track and manage customer bookings</p>
        </div>
        <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm lg:text-base">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Bookings Table - Mobile Responsive */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs lg:text-sm">Booking ID</TableHead>
                <TableHead className="text-xs lg:text-sm">Customer</TableHead>
                <TableHead className="hidden md:table-cell text-xs lg:text-sm">Package</TableHead>
                <TableHead className="hidden sm:table-cell text-xs lg:text-sm">Travelers</TableHead>
                <TableHead className="text-xs lg:text-sm">Amount</TableHead>
                <TableHead className="text-xs lg:text-sm">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-xs lg:text-sm">Travel Date</TableHead>
                <TableHead className="text-xs lg:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-sm">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm lg:text-base">{booking.customer}</p>
                      <p className="text-xs text-gray-500 truncate max-w-32">{booking.email}</p>
                      <div className="md:hidden text-xs text-gray-500 mt-1">
                        <p className="truncate">{booking.package}</p>
                        <p className="sm:hidden">{booking.travelers} travelers</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm max-w-40">
                    <p className="truncate">{booking.package}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{booking.travelers}</TableCell>
                  <TableCell className="font-semibold text-sm lg:text-base">{booking.amount}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(booking.status)} text-xs`}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {new Date(booking.travelDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8">
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8">
                        <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                      {booking.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-xs h-7"
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

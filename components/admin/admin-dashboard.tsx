import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  FileText,
} from "lucide-react"

const stats = [
  {
    title: "Total Packages",
    value: "48",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Active Bookings",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Total Customers",
    value: "2,847",
    change: "+23%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹12,45,000",
    change: "-3%",
    trend: "down",
    icon: DollarSign,
    color: "text-amber-600",
  },
]

const recentBookings = [
  {
    id: "BK001",
    customer: "Priya Sharma",
    package: "Goa Beach Paradise",
    amount: "₹25,000",
    status: "confirmed",
    date: "2024-01-20",
  },
  {
    id: "BK002",
    customer: "Rajesh Kumar",
    package: "Himalayan Adventure",
    amount: "₹45,000",
    status: "pending",
    date: "2024-01-19",
  },
  {
    id: "BK003",
    customer: "Sneha Patel",
    package: "Kerala Backwaters",
    amount: "₹32,000",
    status: "confirmed",
    date: "2024-01-18",
  },
]

const recentInquiries = [
  {
    name: "Amit Singh",
    email: "amit@email.com",
    subject: "Rajasthan Tour Query",
    time: "2 hours ago",
  },
  {
    name: "Kavya Nair",
    email: "kavya@email.com",
    subject: "Group Booking Discount",
    time: "4 hours ago",
  },
  {
    name: "Vikram Gupta",
    email: "vikram@email.com",
    subject: "Custom Package Request",
    time: "6 hours ago",
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={cn("h-3 w-3", stat.trend === "up" ? "text-green-600" : "text-red-600")} />
                    <span
                      className={cn("text-xs font-medium", stat.trend === "up" ? "text-green-600" : "text-red-600")}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-lg bg-gray-50", stat.color)}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.package}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{booking.amount}</p>
                  <Badge
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Inquiries */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Inquiries</h3>
            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentInquiries.map((inquiry, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-cyan-100 rounded-full">
                  <MessageSquare className="h-4 w-4 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{inquiry.name}</p>
                  <p className="text-sm text-gray-600">{inquiry.subject}</p>
                  <p className="text-xs text-gray-500">{inquiry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Package className="h-4 w-4 mr-2" />
            Add New Package
          </Button>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Create Blog Post
          </Button>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            View Website
          </Button>
        </div>
      </Card>
    </div>
  )
}

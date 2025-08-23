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
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

          return (
            <Card key={stat.title} className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={cn("h-3 w-3", stat.trend === "up" ? "text-green-600" : "text-red-600")} />
                    <span
                      className={cn("text-xs font-medium", stat.trend === "up" ? "text-green-600" : "text-red-600")}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 hidden sm:inline">vs last month</span>
                  </div>
                </div>
                <div className={cn("p-2 lg:p-3 rounded-lg bg-gray-50 flex-shrink-0 ml-3", stat.color)}>
                  <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Bookings */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base lg:text-lg font-semibold text-gray-800">Recent Bookings</h3>
            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 text-sm">
              View All
            </Button>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-medium text-gray-800 text-sm lg:text-base truncate">{booking.customer}</p>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{booking.package}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-800 text-sm lg:text-base">{booking.amount}</p>
                  <Badge
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-200 text-xs"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200 text-xs"
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
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base lg:text-lg font-semibold text-gray-800">Recent Inquiries</h3>
            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 text-sm">
              View All
            </Button>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {recentInquiries.map((inquiry, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-cyan-100 rounded-full flex-shrink-0">
                  <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4 text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm lg:text-base truncate">{inquiry.name}</p>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{inquiry.subject}</p>
                  <p className="text-xs text-gray-500">{inquiry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm lg:text-base">
            <Package className="h-4 w-4 mr-2" />
            Add New Package
          </Button>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm lg:text-base">
            <FileText className="h-4 w-4 mr-2" />
            Create Blog Post
          </Button>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm lg:text-base">
            <Eye className="h-4 w-4 mr-2" />
            View Website
          </Button>
        </div>
      </Card>
    </div>
  )
}

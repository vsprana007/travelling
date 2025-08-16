import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { BookingManagement } from "@/components/admin/booking-management"

export default function AdminBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <BookingManagement />
        </main>
      </div>
    </div>
  )
}

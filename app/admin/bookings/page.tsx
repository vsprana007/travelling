import { AdminLayout } from "@/components/admin/admin-layout"
import { BookingManagement } from "@/components/admin/booking-management"

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <BookingManagement />
    </AdminLayout>
  )
}

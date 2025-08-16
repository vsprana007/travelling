import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PackageManagement } from "@/components/admin/package-management"

export default function AdminPackagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <PackageManagement />
        </main>
      </div>
    </div>
  )
}

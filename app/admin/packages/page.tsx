import { AdminLayout } from "@/components/admin/admin-layout"
import { PackageManagement } from "@/components/admin/package-management"

export default function AdminPackagesPage() {
  return (
    <AdminLayout>
      <PackageManagement />
    </AdminLayout>
  )
}

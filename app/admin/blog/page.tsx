import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { BlogManagement } from "@/components/admin/blog-management"

export default function AdminBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <BlogManagement />
        </main>
      </div>
    </div>
  )
}

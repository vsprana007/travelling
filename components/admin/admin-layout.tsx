"use client"

import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { AdminSidebar } from "./admin-sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <div className="flex">
        <AdminSidebar 
          mobileOpen={mobileMenuOpen} 
          onMobileClose={() => setMobileMenuOpen(false)} 
        />
        <main className="flex-1 p-4 lg:p-6 min-w-0 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

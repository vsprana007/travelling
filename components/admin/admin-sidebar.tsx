"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Calendar,
  ImageIcon,
  MessageSquare,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Packages", href: "/admin/packages" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: MessageSquare, label: "Blog", href: "/admin/blog" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: ImageIcon, label: "Categories", href: "/admin/categories" },
]

interface AdminSidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full",
          // Desktop styles - always visible on desktop
          "lg:flex lg:relative",
          collapsed ? "w-16" : "w-64",
          // Mobile styles - hidden by default, show when mobileOpen is true
          "fixed inset-y-0 left-0 z-40 lg:z-auto",
          mobileOpen ? "flex" : "hidden lg:flex"
        )}
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2" onClick={onMobileClose}>
              <div className="h-8 w-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-serif font-bold text-lg text-cyan-600">
                Travel Admin
              </span>
            </Link>
          )}
          
          {/* Mobile Close Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMobileClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Desktop Collapse Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="hidden lg:flex"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={onMobileClose}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-10 text-left transition-colors",
                        isActive 
                          ? "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 border-r-2 border-cyan-500" 
                          : "hover:bg-gray-100",
                        collapsed && "justify-center px-2",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Section - Version Info */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="text-xs text-gray-500 text-center">
              Admin Panel v1.0
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

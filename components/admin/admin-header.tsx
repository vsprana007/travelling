"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, LogOut, Menu, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname()
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu - Priority Button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="lg:hidden border-gray-300 hover:bg-gray-50" 
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-lg lg:text-xl font-serif font-bold text-cyan-600 hover:text-cyan-700 transition-colors">
              Admin Panel
            </Link>
            
            {/* Breadcrumb / Current Page */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>/</span>
              <span className="capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Back to Main Site */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex items-center gap-2 text-xs lg:text-sm border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            asChild
          >
            <Link href="/">
              <Home className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Main Site</span>
            </Link>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8 lg:h-10 lg:w-10">
            <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 lg:h-4 lg:w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10 hidden sm:flex">
            <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
              <AvatarImage src="/placeholder-logo.png" alt="Admin" />
              <AvatarFallback className="text-xs lg:text-sm bg-cyan-100 text-cyan-700">AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@webmeentravel.com</p>
            </div>
          </div>

          {/* Logout */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 lg:h-10 lg:w-10"
            title="Logout"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

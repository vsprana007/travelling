"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserCheck, UserX, Mail, Phone, Calendar } from "lucide-react"

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  is_admin: boolean
  is_active: boolean
  created_at: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      // Try to fetch from API first
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await usersApi.getAll()
        // setUsers(response.data)
        throw new Error("API not implemented yet")
      } catch (apiError) {
        console.log("Using fallback data:", apiError)
      }
      
      // Mock data for now - replace with actual API call
      const mockUsers: User[] = [
        {
          id: "1",
          email: "admin@webmeentravel.com",
          first_name: "Admin",
          last_name: "User",
          phone: "+91-9876543210",
          is_admin: true,
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          email: "john.doe@example.com",
          first_name: "John",
          last_name: "Doe",
          phone: "+91-9876543211",
          is_admin: false,
          is_active: true,
          created_at: "2024-01-10T10:30:00Z",
        },
        {
          id: "3",
          email: "jane.smith@example.com",
          first_name: "Jane",
          last_name: "Smith",
          phone: "+91-9876543212",
          is_admin: false,
          is_active: true,
          created_at: "2024-01-12T15:45:00Z",
        },
        {
          id: "4",
          email: "mike.johnson@example.com",
          first_name: "Mike",
          last_name: "Johnson",
          phone: "+91-9876543213",
          is_admin: false,
          is_active: false,
          created_at: "2024-01-08T09:20:00Z",
        },
      ]

      setUsers(mockUsers)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // Mock API call - replace with actual implementation
      setUsers(users.map((user) => (user.id === userId ? { ...user, is_active: !currentStatus } : user)))
    } catch (error) {
      console.error("Failed to update user status:", error)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-serif font-bold text-gray-800">User Management</h1>
        <p className="text-sm lg:text-base text-gray-600">Manage user accounts and permissions</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </Card>

      {/* Users Table - Mobile Responsive */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs lg:text-sm">User</TableHead>
                <TableHead className="hidden md:table-cell text-xs lg:text-sm">Contact</TableHead>
                <TableHead className="text-xs lg:text-sm">Role</TableHead>
                <TableHead className="text-xs lg:text-sm">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-xs lg:text-sm">Joined</TableHead>
                <TableHead className="text-xs lg:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm lg:text-base">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground flex items-center truncate max-w-48">
                        <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                        {user.email}
                      </p>
                      <div className="md:hidden mt-1 space-y-1">
                        {user.phone && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </p>
                        )}
                        <p className="lg:hidden text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.phone && (
                      <p className="text-sm flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.phone}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_admin ? "default" : "secondary"} className="text-xs">
                      {user.is_admin ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.is_active ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <p className="text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={user.is_active ? "destructive" : "default"}
                      onClick={() => toggleUserStatus(user.id, user.is_active)}
                      className="gap-1 text-xs lg:text-sm h-7 lg:h-8"
                    >
                      {user.is_active ? (
                        <>
                          <UserX className="h-3 w-3" />
                          <span className="hidden sm:inline">Deactivate</span>
                          <span className="sm:hidden">Off</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3" />
                          <span className="hidden sm:inline">Activate</span>
                          <span className="sm:hidden">On</span>
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm lg:text-base">No users found matching your search.</p>
          </div>
        )}
      </Card>
    </div>
  )
}

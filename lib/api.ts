const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL

    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token)
      } else {
        localStorage.removeItem("auth_token")
      }
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "An error occurred" }
      }

      return { data }
    } catch (error) {
      return { error: "Network error occurred" }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    email: string
    password: string
    first_name: string
    last_name: string
    phone?: string
  }) {
    return this.request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request<any>("/auth/me")
  }

  // Package endpoints
  async getPackages(params?: { limit?: number; offset?: number; featured?: boolean }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request<any[]>(`/packages${queryString}`)
  }

  async getFeaturedPackages() {
    return this.request<any[]>("/packages?featured=true")
  }

  async getPackageById(id: string) {
    return this.request<any>(`/packages/${id}`)
  }

  async getPackagesByCategory(categoryId: string, params?: { limit?: number; offset?: number }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request<any[]>(`/packages/category/${categoryId}${queryString}`)
  }

  // Booking endpoints
  async createBooking(bookingData: {
    package_id: string
    booking_date: string
    number_of_people: number
    special_requests?: string
  }) {
    return this.request<any>("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  }

  async getUserBookings() {
    return this.request<any[]>("/bookings")
  }

  async getBookingById(id: string) {
    return this.request<any>(`/bookings/${id}`)
  }

  async cancelBooking(id: string) {
    return this.request<any>(`/bookings/${id}/cancel`, {
      method: "PUT",
    })
  }

  // Admin endpoints
  async getAllUsers() {
    return this.request<any[]>("/admin/users")
  }

  async createPackage(packageData: any) {
    return this.request<any>("/admin/packages", {
      method: "POST",
      body: JSON.stringify(packageData),
    })
  }

  async updatePackage(id: string, packageData: any) {
    return this.request<any>(`/admin/packages/${id}`, {
      method: "PUT",
      body: JSON.stringify(packageData),
    })
  }

  async deletePackage(id: string) {
    return this.request<any>(`/admin/packages/${id}`, {
      method: "DELETE",
    })
  }

  async getCategories() {
    return this.request<any[]>("/admin/categories")
  }

  async createCategory(categoryData: {
    name: string
    description?: string
    icon?: string
  }) {
    return this.request<any>("/admin/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  }

  async getAllBookings() {
    return this.request<any[]>("/admin/bookings")
  }

  async updateBookingStatus(id: string, status: string) {
    return this.request<any>(`/admin/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export const api = apiClient
export const packagesApi = {
  getAll: () => apiClient.getPackages(),
  getFeatured: () => apiClient.getFeaturedPackages(),
  getById: (id: string) => apiClient.getPackageById(id),
  create: (data: any) => apiClient.createPackage(data),
  update: (id: string, data: any) => apiClient.updatePackage(id, data),
  delete: (id: string) => apiClient.deletePackage(id),
}

export default apiClient

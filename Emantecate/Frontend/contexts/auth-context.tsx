"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos para el usuario y contexto de autenticación
interface User {
  id: string
  email: string
  name: string
  role: "admin" | "customer"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios de ejemplo (en una aplicación real, esto vendría de una base de datos)
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@dulcepan.com",
    password: "admin123",
    name: "Administrador",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "cliente@email.com",
    password: "cliente123",
    name: "Cliente Demo",
    role: "customer" as const,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem("dulcepan_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("dulcepan_user")
      }
    }
    setIsLoading(false)
  }, [])

  /**
   * Función para iniciar sesión
   * Simula una autenticación con usuarios de ejemplo
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      setUser(userData)
      localStorage.setItem("dulcepan_user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem("dulcepan_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

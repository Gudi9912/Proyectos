"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  isAdmin: boolean
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("authToken")
    if (stored) {
      setToken(stored)
      setIsAdmin(true) // simple, ya que sólo existe un admin
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) return false

      const data = await res.json()
      setToken(data.token)
      setIsAdmin(true)
      localStorage.setItem("authToken", data.token)

      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setToken(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        isAdmin,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}

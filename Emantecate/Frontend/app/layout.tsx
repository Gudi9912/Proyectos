import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Emantecate",
  description: "Panaderia online de alta gracia",
  generator: "Gudiño Gonzalo"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

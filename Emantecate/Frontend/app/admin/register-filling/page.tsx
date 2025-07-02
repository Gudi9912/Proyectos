"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import MobileNav from "@/components/mobile-nav"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"
import { useProducts } from "@/contexts/products-context"

export default function RegisterFillingPage() {
  const { user } = useAuth()
  const { addFilling } = useProducts()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Redirigir si no es admin
  if (!user || user.role !== "admin") {
    router.push("/")
    return null
  }

  /**
   * Validar los datos del formulario
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Validar descripción
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Manejar el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Añadir el relleno
      addFilling({
        name: formData.name.trim(),
        description: formData.description.trim(),
      })

      toast({
        title: "Relleno registrado",
        description: `El relleno "${formData.name}" ha sido registrado exitosamente`,
      })

      // Limpiar formulario
      setFormData({
        name: "",
        description: "",
      })
      setErrors({})

      // Redirigir después de un momento
      setTimeout(() => {
        router.push("/admin/register-product")
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al registrar el relleno",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Manejar cambios en los inputs
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Panadería Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl hidden sm:inline-block">Dulce Pan</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <div className="hidden md:block">
              <UserMenu />
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="container py-8 px-4 md:px-6">
        {/* Botón volver */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Productos
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Registrar Nuevo Relleno</CardTitle>
              <CardDescription>
                Completa la información para registrar un nuevo relleno que podrá ser usado en los productos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre del relleno */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nombre del Relleno <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ej: Crema de vainilla"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isLoading}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descripción <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe las características del relleno, ingredientes principales, sabor, etc."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={isLoading}
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.description}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar Relleno"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" asChild disabled={isLoading}>
                    <Link href="/products">Cancelar</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

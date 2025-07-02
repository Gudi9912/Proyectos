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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import MobileNav from "@/components/mobile-nav"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"
import { useProducts } from "@/contexts/products-context"

const CATEGORIES = ["Panes", "Bollería", "Pasteles", "Galletas", "Bebidas"]

export default function RegisterProductPage() {
  const { user } = useAuth()
  const { addProduct, fillings } = useProducts()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
    featured: false,
    fillingId: "",
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

    // Validar precio
    const price = Number.parseFloat(formData.price)
    if (!formData.price.trim()) {
      newErrors.price = "El precio es obligatorio"
    } else if (isNaN(price) || price <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0"
    }

    // Validar imagen
    if (!formData.image.trim()) {
      newErrors.image = "La URL de la imagen es obligatoria"
    } else {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = "La URL de la imagen no es válida"
      }
    }

    // Validar stock
    const stock = Number.parseInt(formData.stock)
    if (!formData.stock.trim()) {
      newErrors.stock = "El stock es obligatorio"
    } else if (isNaN(stock) || stock < 0) {
      newErrors.stock = "El stock debe ser un número mayor o igual a 0"
    }

    // Validar categoría
    if (!formData.category) {
      newErrors.category = "La categoría es obligatoria"
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

      // Buscar el relleno si se seleccionó uno
      const selectedFilling = formData.fillingId
        ? fillings.find((f) => f.id === Number.parseInt(formData.fillingId))
        : undefined

      // Añadir el producto
      addProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        image: formData.image.trim(),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        featured: formData.featured,
        filling: selectedFilling,
      })

      toast({
        title: "Producto registrado",
        description: `El producto "${formData.name}" ha sido registrado exitosamente`,
      })

      // Limpiar formulario
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: "",
        featured: false,
        fillingId: "",
      })
      setErrors({})

      // Redirigir después de un momento
      setTimeout(() => {
        router.push("/products")
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al registrar el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Manejar cambios en los inputs
   */
  const handleInputChange = (field: string, value: string | boolean) => {
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
              <CardTitle className="text-2xl">Registrar Nuevo Producto</CardTitle>
              <CardDescription>
                Completa toda la información para registrar un nuevo producto en el catálogo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre del producto */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nombre del Producto <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ej: Pan de chocolate"
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
                    placeholder="Describe el producto, ingredientes, características especiales, etc."
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

                {/* Precio y Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Precio ($) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      disabled={isLoading}
                      className={errors.price ? "border-destructive" : ""}
                    />
                    {errors.price && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.price}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      Stock <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      disabled={isLoading}
                      className={errors.stock ? "border-destructive" : ""}
                    />
                    {errors.stock && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.stock}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                {/* URL de imagen */}
                <div className="space-y-2">
                  <Label htmlFor="image">
                    URL de la Imagen <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    disabled={isLoading}
                    className={errors.image ? "border-destructive" : ""}
                  />
                  {errors.image && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.image}</AlertDescription>
                    </Alert>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Puedes usar "/placeholder.svg?height=300&width=300" para una imagen de prueba
                  </p>
                </div>

                {/* Categoría */}
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoría <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.category}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Relleno (opcional) */}
                <div className="space-y-2">
                  <Label htmlFor="filling">Relleno (opcional)</Label>
                  <Select
                    value={formData.fillingId}
                    onValueChange={(value) => handleInputChange("fillingId", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un relleno (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sin relleno</SelectItem>
                      {fillings.map((filling) => (
                        <SelectItem key={filling.id} value={filling.id.toString()}>
                          {filling.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Si no encuentras el relleno que necesitas,{" "}
                    <Link href="/admin/register-filling" className="text-primary hover:underline">
                      regístralo aquí
                    </Link>
                  </p>
                </div>

                {/* Producto destacado */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="featured">Marcar como producto destacado</Label>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar Producto"}
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

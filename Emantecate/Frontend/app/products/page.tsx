"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import MobileNav from "@/components/mobile-nav"
import UserMenu from "@/components/user-menu"
import ProductAdminCard from "@/components/product-admin-card"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { ProductService } from "@/services/product.services"

type Product = {
  IDProducto: number
  Nombre: string
  Descripcion: string
  Precio: number
  Imagen: string
  Stock: number
  Activo: boolean
  Destacado: boolean
  IDRelleno: number | null
  Relleno?: {
    Nombre: string
  }
}

export default function ProductsPage() {
  const { user } = useAuth()
  const { addToCart, cartItems } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const [filters, setFilters] = useState({
    active: true,
    stockStatus: 'all',
    featured: 'all'
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Error al obtener productos",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(product => {
      if (filters.active && !product.Activo) return false
      switch (filters.stockStatus) {
        case 'inStock': if (product.Stock <= 0) return false; break
        case 'lowStock': if (product.Stock > 5 || product.Stock <= 0) return false; break
        case 'outOfStock': if (product.Stock > 0) return false; break
      }
      switch (filters.featured) {
        case 'featured': if (!product.Destacado) return false; break
        case 'notFeatured': if (product.Destacado) return false; break
      }
      return true
    })
    setFilteredProducts(filtered)
  }, [filters, products])

  const handleProductUpdate = async (id: number, updates: Partial<Product>) => {
    setUpdatingId(id)
    try {
      const updatedProduct = await ProductService.updateProduct(id, updates)
      setProducts(prev => prev.map(p => p.IDProducto === id ? { ...p, ...updatedProduct } : p))
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "No se pudo actualizar el producto", variant: "destructive" })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeactivate = async (id: number) => {
    try {
      await ProductService.toggleProductStatus(id, false)
      setProducts(prev => prev.map(p => p.IDProducto === id ? { ...p, Activo: false } : p))
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "No se pudo dar de baja el producto", variant: "destructive" })
    }
  }

  const handleActivate = async (id: number) => {
    try {
      await ProductService.toggleProductStatus(id, true)
      setProducts(prev => prev.map(p => p.IDProducto === id ? { ...p, Activo: true } : p))
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "No se pudo reactivar el producto", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl hidden sm:inline-block">Dulce Pan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>
            <div className="hidden md:block"><UserMenu /></div>
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="container py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Nuestros Productos</h1>
          {user?.role === "admin" && <Badge variant="secondary">Modo Administrador</Badge>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product =>
            user?.role === "admin" ? (
              <ProductAdminCard
                key={product.IDProducto}
                product={product}
                onUpdate={handleProductUpdate}
                onDeactivate={handleDeactivate}
                onActivate={handleActivate}
                isUpdating={updatingId === product.IDProducto}
              />
            ) : (
              <Card key={product.IDProducto}>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.Imagen || "/placeholder.svg"}
                    alt={product.Nombre}
                    fill
                    className="object-cover"
                  />
                  {product.Destacado && (
                    <Badge className="absolute top-2 left-2" variant="default">Destacado</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Link href={`/products/${product.IDProducto}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                      {product.Nombre}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{product.Descripcion}</p>
                  <p className="font-bold">${product.Precio.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    disabled={product.Stock === 0 || !product.Activo}
                    onClick={() =>
                      addToCart(
                        {
                          id: product.IDProducto,
                          name: product.Nombre,
                          price: product.Precio,
                          image: product.Imagen || "/placeholder.svg"
                        },
                        1,              // cantidad por defecto
                        product.Stock   // máximo permitido
                      )
                    }
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {product.Stock === 0 ? "Sin stock" : "Añadir al Carrito"}
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  )
}

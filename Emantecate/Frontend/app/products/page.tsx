"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Filter, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import MobileNav from "@/components/mobile-nav"
import UserMenu from "@/components/user-menu"
import ProductAdminCard from "@/components/product-admin-card"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { ProductService, Product } from "@/services/product.services"

const BASE_URL = "http://localhost:3001/uploads/"

export default function ProductsPage() {
  const router = useRouter()
  const { isAdmin, logout } = useAuth()
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
            <Image src="/logo.jfif" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl hidden sm:inline-block">Emantecate</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <UserMenu />
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout()
                    router.push("/login")
                  }}
                >
                  Cerrar sesión
                </Button>
              )}
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="container py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Nuestros Productos</h1>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <>
                  <Badge variant="secondary">Modo Administrador</Badge>
                  <div className="flex gap-2">
                    <Button asChild variant="default" size="sm">
                      <Link href="/products/create">Registrar producto</Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                      <Link href="/rellenos/create">Registrar relleno</Link>
                    </Button>
                  </div>
                </>
              )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Filtrar productos</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label>Mostrar activos</Label>
                            <Switch
                              checked={filters.active}
                              onCheckedChange={(checked) =>
                                setFilters(prev => ({ ...prev, active: checked }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Stock</Label>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="in-stock"
                                  checked={filters.stockStatus === "inStock"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, stockStatus: "inStock" }))
                                  }
                                />
                                <Label htmlFor="in-stock">En stock</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="low-stock"
                                  checked={filters.stockStatus === "lowStock"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, stockStatus: "lowStock" }))
                                  }
                                />
                                <Label htmlFor="low-stock">Poco stock</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="out-of-stock"
                                  checked={filters.stockStatus === "outOfStock"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, stockStatus: "outOfStock" }))
                                  }
                                />
                                <Label htmlFor="out-of-stock">Agotado</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="stock-all"
                                  checked={filters.stockStatus === "all"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, stockStatus: "all" }))
                                  }
                                />
                                <Label htmlFor="stock-all">Todos</Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Destacados</Label>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="featured"
                                  checked={filters.featured === "featured"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, featured: "featured" }))
                                  }
                                />
                                <Label htmlFor="featured">Solo destacados</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="not-featured"
                                  checked={filters.featured === "notFeatured"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, featured: "notFeatured" }))
                                  }
                                />
                                <Label htmlFor="not-featured">No destacados</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="all-featured"
                                  checked={filters.featured === "all"}
                                  onCheckedChange={() =>
                                    setFilters(prev => ({ ...prev, featured: "all" }))
                                  }
                                />
                                <Label htmlFor="all-featured">Todos</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
            </Sheet>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product =>
            isAdmin ? (
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
                    src={product.Imagen ? BASE_URL + product.Imagen : "/placeholder.png"} 
                    alt={product.Nombre} 
                    fill 
                    className="object-cover rounded-t-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          image: BASE_URL + product.Imagen
                        },
                        1,
                        product.Stock
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

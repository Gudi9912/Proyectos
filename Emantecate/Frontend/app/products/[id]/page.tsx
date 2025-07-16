"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProductService, Product } from "@/services/product.services"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import MobileNav from "@/components/mobile-nav"
import { useCart } from "@/contexts/cart-context"

const BASE_URL = "http://localhost:3001/uploads/"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cartItems } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(Number(id))
        setProduct(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "No se pudo cargar el producto",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleAdd = () => {
    if (product && quantity < product.Stock) {
      setQuantity(q => q + 1)
    }
  }

  const handleSubtract = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1))
  }

  const handleAddToCart = () => {
    if (!product) return
    addToCart(
      {
        id: product.IDProducto,
        name: product.Nombre,
        price: product.Precio,
        image: BASE_URL + product.Imagen || "/placeholder.svg"
      },
      quantity,
      product.Stock
    )
    toast({ title: "Añadido al carrito", description: `x${quantity} ${product.Nombre}` })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-destructive">Producto no encontrado</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Panadería Logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl hidden sm:inline-block">Emantecate</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="container py-8 px-4 md:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/products">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a Productos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src={product.Imagen ? BASE_URL + product.Imagen : "/placeholder.svg"}
              alt={product.Nombre}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold">{product.Nombre}</h1>
            <p className="text-xl font-bold mt-2">${product.Precio.toFixed(2)}</p>

            <Separator className="my-4" />

            <div className="prose prose-sm mb-4">
              <p>{product.Descripcion}</p>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Cantidad:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={handleSubtract}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={handleAdd}
                  disabled={product && quantity >= product.Stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={!product.Activo || product.Stock === 0}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {product.Stock === 0 ? "Sin stock" : `Añadir x${quantity}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

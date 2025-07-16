"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNav from "@/components/mobile-nav"
import UserMenu from "@/components/user-menu"
import { ProductService, Product } from "@/services/product.services"
import FeaturedProducts from "@/components/featured-products"
import ProductCarousel from "@/components/product-carousel"
import { toast } from "@/components/ui/use-toast"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts()
        setProducts(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "No se pudieron cargar los productos",
          variant: "destructive",
        })
      }
    }

    fetchProducts()
  }, [])

  const featured = products.filter(p => p.Destacado)
  const others = products.filter(p => !p.Destacado)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jfif" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl hidden sm:inline-block">Emantecate</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            <div className="hidden md:block"><UserMenu /></div>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative w-full aspect-[3/1] overflow-hidden">
          <Image src="/logo.jfif" alt="Productos de panadería frescos" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Emantecate</h1>
            <p className="text-lg md:text-xl text-center mb-6 max-w-md">Panes y pasteles artesanales horneados con amor cada día</p>
            <Button size="lg" asChild><Link href="/products">Ver Productos</Link></Button>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-12 px-4 md:px-6">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Nuestros Productos Destacados</h2>
          <FeaturedProducts products={featured} />
          <div className="mt-8 text-center">
            <Button variant="outline" asChild><Link href="/products">Ver Todos los Productos</Link></Button>
          </div>
        </div>
      </section>

      {/* Carrusel */}
      <section className="py-12 px-4 md:px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Todos Nuestros Productos</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Desliza para ver toda nuestra variedad de productos artesanales.
          </p>
          <ProductCarousel products={products} />
        </div>
      </section>
    </div>
  )
}

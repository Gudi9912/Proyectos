"use client"

import { Product } from "@/services/product.services"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"

interface Props {
  products: Product[]
}

const BASE_URL = "http://localhost:3001/uploads/"

export default function ProductCarousel({ products }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" })
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" })

  const handleAddToCart = (product: Product) => {
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
    toast({ title: "Producto añadido", description: `1 unidad de ${product.Nombre}` })
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <Button variant="outline" size="icon" className="rounded-full bg-background/80" onClick={scrollLeft}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <Button variant="outline" size="icon" className="rounded-full bg-background/80" onClick={scrollRight}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {products.map(product => (
          <div key={product.IDProducto} className="min-w-[250px] max-w-[250px] snap-start">
            <Card className="h-full">
              <div className="relative h-48 w-full">
                <Image 
                  src={product.Imagen ? BASE_URL + product.Imagen : "/placeholder.png"} 
                  alt={product.Nombre} 
                  fill 
                  className="object-cover rounded-t-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <Link href={`/products/${product.IDProducto}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{product.Nombre}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2">{product.Descripcion}</p>
                <p className="font-bold">${product.Precio.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  disabled={product.Stock === 0 || !product.Activo}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.Stock === 0 ? "Sin stock" : "Añadir al Carrito"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

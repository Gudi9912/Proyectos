"use client"

import { Product } from "@/services/product.services"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"

interface Props {
  products: Product[]
}

const BASE_URL = "http://localhost:3001/uploads/"

export default function FeaturedProducts({ products }: Props) {
  const [loading, setLoading] = useState<number | null>(null)
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    setLoading(product.IDProducto)
    addToCart(
      {
        id: product.IDProducto,
        name: product.Nombre,
        price: product.Precio,
        image: BASE_URL + product.Imagen || "/placeholder.svg"
      },
      1,
      product.Stock
    )
    toast({ title: "Producto añadido", description: `1 unidad de ${product.Nombre}` })
    setTimeout(() => setLoading(null), 600)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Card key={product.IDProducto} className="overflow-hidden">
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
              disabled={loading === product.IDProducto || product.Stock === 0 || !product.Activo}
            >
              {loading === product.IDProducto
                ? "Añadiendo..."
                : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.Stock === 0 ? "Sin stock" : "Añadir"}
                  </>
                )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

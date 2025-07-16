"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import MobileNav from "@/components/mobile-nav"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 5.0
  const total = subtotal + shipping

  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
  })

  const handleWhatsAppOrder = () => {
    const phoneNumber = "3547325110"

    let message = `*Nuevo Pedido de ${customerData.name}*\n\n`
    message += `*Datos del Cliente:*\n`
    message += `Nombre: ${customerData.name}\n`
    message += `Dirección: ${customerData.address}\n`
    message += `Teléfono: ${customerData.phone}\n`
    if (customerData.notes) {
      message += `Notas: ${customerData.notes}\n`
    }
    message += `\n*Productos:*\n`

    cartItems.forEach((item) => {
      message += `- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}\n`
    })

    message += `\n*Subtotal:* $${subtotal.toFixed(2)}\n`
    message += `*Envío:* $${shipping.toFixed(2)}\n`
    message += `*Total:* $${total.toFixed(2)}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (igual) */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jfif" alt="Panadería Logo" width={40} height={40} className="rounded-full" />
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Tu Carrito</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Parece que aún no has añadido productos a tu carrito.</p>
            <Button asChild>
              <Link href="/products">Explorar Productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 font-medium">Productos</div>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-20 w-20 shrink-0 rounded overflow-hidden">
                        
                        <Image src={item.image ? item.image : "/placeholder.png"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-3 w-3 mr-1" />Eliminar
                          </Button>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild className="sm:w-auto">
                  <Link href="/products">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Seguir Comprando
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 font-medium">Resumen del Pedido</div>
                <div className="p-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium">Nombre completo</label>
                      <Input id="name" placeholder="Tu nombre completo" className="mt-1" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="address" className="text-sm font-medium">Dirección de entrega</label>
                      <Input id="address" placeholder="Calle, número, piso, etc." className="mt-1" value={customerData.address} onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium">Teléfono</label>
                      <Input id="phone" placeholder="Tu número de teléfono" className="mt-1" value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="notes" className="text-sm font-medium">Notas adicionales (opcional)</label>
                      <Input id="notes" placeholder="Instrucciones especiales para la entrega" className="mt-1" value={customerData.notes} onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })} />
                    </div>
                  </div>
                  <Button className="w-full mt-6" onClick={handleWhatsAppOrder} disabled={!customerData.name || !customerData.address || !customerData.phone}>
                    Realizar Pedido por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

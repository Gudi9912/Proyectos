"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react"
import { toast } from "@/components/ui/use-toast"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock?: number 
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number, maxStock?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // LocalStorage: Cargar al montar
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  // LocalStorage: Guardar al cambiar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (
    item: Omit<CartItem, "quantity">,
    quantity: number = 1,
    maxStock?: number
  ) => {
    setCartItems(prev => {
      const found = prev.find(p => p.id === item.id)
      const currentQty = found?.quantity || 0

      if (maxStock !== undefined && currentQty + quantity > maxStock) {
        toast({
          title: "Stock insuficiente",
          description: `Solo quedan ${maxStock - currentQty} unidades disponibles`,
          variant: "destructive"
        })
        return prev
      }

      if (found) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      }

      return [...prev, { ...item, quantity, stock: maxStock }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
  if (quantity < 1) return

  setCartItems(prev =>
    prev.map(p => {
      if (p.id === id) {
        if (p.stock !== undefined && quantity > p.stock) {
          toast({
            title: "Stock insuficiente",
            description: `Solo hay ${p.stock} unidades disponibles de ${p.name}`,
            variant: "destructive"
          })
            return p
          }
          return { ...p, quantity }
        }
        return p
      })
    )
  }


  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider")
  return context
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos para productos y rellenos
export interface Filling {
  id: number
  name: string
  description: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
  featured: boolean
  filling?: Filling
}

interface ProductsContextType {
  products: Product[]
  fillings: Filling[]
  addProduct: (product: Omit<Product, "id">) => void
  addFilling: (filling: Omit<Filling, "id">) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  getFillingById: (id: number) => Filling | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

// Rellenos iniciales
const initialFillings: Filling[] = [
  { id: 1, name: "Crema Pastelera", description: "Crema suave y dulce hecha con huevos y leche" },
  { id: 2, name: "Dulce de Leche", description: "Dulce de leche artesanal cremoso" },
  { id: 3, name: "Chocolate", description: "Ganache de chocolate belga" },
  { id: 4, name: "Mermelada de Fresa", description: "Mermelada casera de fresas frescas" },
]

// Productos iniciales con rellenos
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Pan Artesanal",
    price: 3.5,
    image: "/placeholder.svg?height=300&width=300",
    description: "Pan rústico con masa madre",
    category: "Panes",
    stock: 15,
    featured: true,
  },
  {
    id: 2,
    name: "Croissant",
    price: 2.25,
    image: "/placeholder.svg?height=300&width=300",
    description: "Croissant de mantequilla",
    category: "Bollería",
    stock: 8,
    featured: true,
  },
  {
    id: 3,
    name: "Pastel de Chocolate",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Pastel de chocolate con ganache",
    category: "Pasteles",
    stock: 3,
    featured: true,
    filling: initialFillings[2], // Chocolate
  },
  {
    id: 4,
    name: "Baguette",
    price: 2.75,
    image: "/placeholder.svg?height=300&width=300",
    description: "Baguette tradicional francesa",
    category: "Panes",
    stock: 12,
    featured: true,
  },
  {
    id: 5,
    name: "Donut Glaseado",
    price: 1.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Donut con glaseado de azúcar",
    category: "Bollería",
    stock: 0,
    featured: false,
    filling: initialFillings[3], // Mermelada de Fresa
  },
  {
    id: 6,
    name: "Pan de Centeno",
    price: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    description: "Pan de centeno integral",
    category: "Panes",
    stock: 6,
    featured: false,
  },
  {
    id: 7,
    name: "Tarta de Fresas",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Tarta con fresas frescas y crema",
    category: "Pasteles",
    stock: 2,
    featured: false,
    filling: initialFillings[0], // Crema Pastelera
  },
  {
    id: 8,
    name: "Galletas de Chocolate",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Galletas con trozos de chocolate",
    category: "Galletas",
    stock: 20,
    featured: false,
  },
]

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [fillings, setFillings] = useState<Filling[]>(initialFillings)

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedProducts = localStorage.getItem("dulcepan_products")
    const savedFillings = localStorage.getItem("dulcepan_fillings")

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        console.error("Error loading products from localStorage:", error)
      }
    }

    if (savedFillings) {
      try {
        setFillings(JSON.parse(savedFillings))
      } catch (error) {
        console.error("Error loading fillings from localStorage:", error)
      }
    }
  }, [])

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("dulcepan_products", JSON.stringify(products))
  }, [products])

  // Guardar rellenos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("dulcepan_fillings", JSON.stringify(fillings))
  }, [fillings])

  /**
   * Añadir un nuevo producto
   */
  const addProduct = (productData: Omit<Product, "id">) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1
    const newProduct: Product = {
      ...productData,
      id: newId,
    }
    setProducts((prev) => [...prev, newProduct])
  }

  /**
   * Añadir un nuevo relleno
   */
  const addFilling = (fillingData: Omit<Filling, "id">) => {
    const newId = Math.max(...fillings.map((f) => f.id), 0) + 1
    const newFilling: Filling = {
      ...fillingData,
      id: newId,
    }
    setFillings((prev) => [...prev, newFilling])
  }

  /**
   * Actualizar un producto existente
   */
  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...updates } : product)))
  }

  /**
   * Obtener un relleno por ID
   */
  const getFillingById = (id: number): Filling | undefined => {
    return fillings.find((filling) => filling.id === id)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        fillings,
        addProduct,
        addFilling,
        updateProduct,
        getFillingById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// Hook personalizado para usar el contexto de productos
export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Edit, Save, X, ShoppingCart, Trash2, CheckCircle, Power, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductService, Product } from "../services/product.services"
import { RellenoService } from "../services/relleno.services"

interface Relleno {
  IDRelleno: number
  Nombre: string
  Activo: boolean
}

interface ProductAdminCardProps {
  product: Product
  onUpdateSuccess: () => void
}

export default function ProductAdminCard({ 
  product, 
  onUpdateSuccess
}: ProductAdminCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    Nombre: product.Nombre,
    Descripcion: product.Descripcion,
    Precio: product.Precio.toString(),
    Stock: product.Stock.toString(),
    Destacado: product.Destacado,
    IDRelleno: product.IDRelleno?.toString() || '0'
  })
  const [rellenos, setRellenos] = useState<Relleno[]>([])
  const [loadingRellenos, setLoadingRellenos] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Obtener rellenos activos
  useEffect(() => {
    const fetchRellenos = async () => {
      try {
        setLoadingRellenos(true)
        const data = await RellenoService.getActiveRellenos()
        setRellenos(data)
      } catch (error) {
      } finally {
        setLoadingRellenos(false)
      }
    }

    fetchRellenos()
  }, [])

  const handleSave = async () => {
    try {
      setIsUpdating(true)
      
      const updates: Partial<Product> = {
        Nombre: formData.Nombre,
        Descripcion: formData.Descripcion,
        Precio: Number.parseFloat(formData.Precio),
        Stock: Number.parseInt(formData.Stock),
        Destacado: formData.Destacado,
        IDRelleno: formData.IDRelleno === "0" ? null : Number(formData.IDRelleno)
      }

      // Validaciones
      if (isNaN(updates.Precio!) || updates.Precio! < 0) {
      throw new Error("El precio debe ser un número válido ≥ 0")
      }

      if (isNaN(updates.Stock!) || updates.Stock! < 0) {
        throw new Error("El stock debe ser un número entero ≥ 0")
      }

      await ProductService.updateProduct(product.IDProducto, updates)
      onUpdateSuccess()
      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      console.log("Actualización finalizada")
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      Nombre: product.Nombre,
      Descripcion: product.Descripcion,
      Precio: product.Precio.toString(),
      Stock: product.Stock.toString(),
      Destacado: product.Destacado,
      IDRelleno: product.IDRelleno?.toString() || '0'
    })
    setIsEditing(false)
  }

  const handleToggleStatus = async () => {
    try {
      setIsUpdating(true)
      await ProductService.toggleProductStatus(
        product.IDProducto, 
        !product.Activo
      )
      onUpdateSuccess()
    } catch (error) {
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className="overflow-hidden relative">
      {!product.Activo && (
        <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center z-10 pointer-events-none">
          <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-bold text-lg rotate-[-15deg]">
            INACTIVO
          </span>
        </div>
      )}

      <div className="relative h-48 w-full">
        <Image 
          src={product.Imagen || "/placeholder.svg"} 
          alt={product.Nombre} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant={
            product.Stock === 0 ? "destructive" : 
            product.Stock <= 5 ? "secondary" : "default"
          }
        >
          {product.Stock === 0 ? "Sin stock" : 
           product.Stock <= 5 ? "Stock bajo" : "En stock"}
        </Badge>
      </div>

      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor={`nombre-${product.IDProducto}`}>Nombre</Label>
              <Input
                id={`nombre-${product.IDProducto}`}
                value={formData.Nombre}
                onChange={(e) => setFormData({...formData, Nombre: e.target.value})}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor={`descripcion-${product.IDProducto}`}>Descripción</Label>
              <Input
                id={`descripcion-${product.IDProducto}`}
                value={formData.Descripcion}
                onChange={(e) => setFormData({...formData, Descripcion: e.target.value})}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor={`precio-${product.IDProducto}`}>Precio</Label>
              <Input
                id={`precio-${product.IDProducto}`}
                value={formData.Precio}
                onChange={(e) => setFormData({...formData, Precio: e.target.value})}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor={`stock-${product.IDProducto}`}>Stock</Label>
              <Input
                id={`stock-${product.IDProducto}`}
                type="number"
                min="0"
                value={formData.Stock}
                onChange={(e) => setFormData({...formData, Stock: e.target.value})}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor={`relleno-${product.IDProducto}`}>Relleno</Label>
              {loadingRellenos ? (
                <div className="h-8 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <Select
                  value={formData.IDRelleno}
                  onValueChange={(value) => setFormData({...formData, IDRelleno: value})}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Selecciona un relleno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sin relleno</SelectItem>
                    {rellenos.map((relleno) => (
                      <SelectItem 
                        key={relleno.IDRelleno} 
                        value={relleno.IDRelleno.toString()}
                      >
                        {relleno.Nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id={`destacado-${product.IDProducto}`}
                checked={formData.Destacado}
                onCheckedChange={(checked) => setFormData({...formData, Destacado: checked})}
              />
              <Label htmlFor={`destacado-${product.IDProducto}`}>Destacado</Label>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{product.Nombre}</h3>
            <p className="text-sm text-muted-foreground">{product.Descripcion}</p>
            {product.Relleno && (
              <p className="text-xs text-muted-foreground">
                Relleno: {product.Relleno.Nombre}
              </p>
            )}
            <div className="flex justify-between items-center">
              <p className="font-bold">${product.Precio.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Stock: {product.Stock}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={product.Destacado ? "default" : "secondary"}>
                {product.Destacado ? "Destacado" : "Normal"}
              </Badge>
              <Badge variant={product.Activo ? "default" : "destructive"}>
                {product.Activo ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {isEditing ? (
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleSave} 
              size="sm" 
              className="flex-1" 
              disabled={isUpdating}
            >
              <Save className="h-4 w-4 mr-1" />
              {isUpdating ? "Guardando..." : "Guardar"}
            </Button>
            <Button 
              onClick={handleCancel} 
              variant="outline" 
              size="sm" 
              disabled={isUpdating}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button 
                onClick={handleToggleStatus}
                variant={product.Activo ? "destructive" : "default"} 
                size="sm"
                disabled={isUpdating}
              >
                {product.Activo ? (
                  <>
                    <Power className="h-4 w-4 mr-1" />
                    {isUpdating ? "Desactivando..." : "Desactivar"}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {isUpdating ? "Activando..." : "Activar"}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
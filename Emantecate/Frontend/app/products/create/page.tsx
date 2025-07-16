"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { RellenoService } from "@/services/relleno.services"

interface Relleno {
  IDRelleno: number
  Nombre: string
  Activo: boolean
}

export default function ProductCreatePage() {
  const { token, isAdmin } = useAuth()
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [activo, setActivo] = useState(true)
  const [destacado, setDestacado] = useState(false)
  const [imagenFile, setImagenFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [rellenoId, setRellenoId] = useState("0")

  const [rellenos, setRellenos] = useState<Relleno[]>([])
  const [loadingRellenos, setLoadingRellenos] = useState(false)

  // Errores
  const [nombreError, setNombreError] = useState("")
  const [precioError, setPrecioError] = useState("")
  const [stockError, setStockError] = useState("")

  useEffect(() => {
    if (!isAdmin) {
      router.push("/")
    }
  }, [isAdmin, router])

  useEffect(() => {
    const fetchRellenos = async () => {
      try {
        setLoadingRellenos(true)
        const data = await RellenoService.getActiveRellenos()
        setRellenos(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar rellenos",
          variant: "destructive",
        })
      } finally {
        setLoadingRellenos(false)
      }
    }

    fetchRellenos()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagenFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setNombreError("")
    setPrecioError("")
    setStockError("")

    if (!nombre.trim()) {
      setNombreError("El nombre no puede estar vacío")
      return
    }

    if (parseFloat(precio) <= 0) {
      setPrecioError("El precio debe ser mayor a 0")
      return
    }

    if (parseInt(stock) < 0) {
      setStockError("El stock no puede ser menor a 0")
      return
    }

    if (!imagenFile) {
      toast({
        title: "Error",
        description: "Debes subir una imagen",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append("Nombre", nombre)
    formData.append("Descripcion", descripcion)
    formData.append("Precio", precio)
    formData.append("Stock", stock)
    formData.append("Activo", String(activo))
    formData.append("Destacado", String(destacado))
    formData.append("Imagen", imagenFile)
    if (rellenoId !== "0") {
      formData.append("IDRelleno", rellenoId)
    }

    try {
      const res = await fetch("http://localhost:3001/api/Emantecate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al crear producto")
      }

      toast({
        title: "Producto creado",
        description: "Se registró exitosamente",
      })

      router.push("/products")
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Error desconocido",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={nombreError ? "border-red-500" : ""}
                required
              />
              {nombreError && (
                <p className="text-sm text-red-500 mt-1">{nombreError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className={precioError ? "border-red-500" : ""}
                  required
                />
                {precioError && (
                  <p className="text-sm text-red-500 mt-1">{precioError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={stockError ? "border-red-500" : ""}
                  required
                />
                {stockError && (
                  <p className="text-sm text-red-500 mt-1">{stockError}</p>
                )}
              </div>
            </div>
            <div>
              <Label>Relleno</Label>
              {loadingRellenos ? (
                <div className="h-10 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <Select value={rellenoId} onValueChange={setRellenoId}>
                  <SelectTrigger className="h-10">
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
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
                Activo
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={destacado}
                  onChange={(e) => setDestacado(e.target.checked)}
                />
                Destacado
              </label>
            </div>
            <div>
              <Label>Imagen</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="mt-2 max-h-48 object-cover border rounded"
                />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Crear producto
            </Button>
            <Button variant="outline" type="button" onClick={() => router.push("/products")} className="w-full mt-2">
            Volver al panel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

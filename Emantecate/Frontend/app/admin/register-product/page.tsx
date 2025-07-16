"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function ProductCreatePage() {
  const { token } = useAuth()
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [rellenoId, setRellenoId] = useState("")
  const [destacado, setDestacado] = useState(false)
  const [activo, setActivo] = useState(true)
  const [imagenFile, setImagenFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagenFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imagenFile) {
      toast({ title: "Error", description: "Debes subir una imagen", variant: "destructive" })
      return
    }

    const formData = new FormData()
    formData.append("Nombre", nombre)
    formData.append("Descripcion", descripcion)
    formData.append("Precio", precio)
    formData.append("Stock", stock)
    formData.append("IDRelleno", rellenoId)
    formData.append("Activo", String(activo))
    formData.append("Destacado", String(destacado))
    formData.append("Imagen", imagenFile)

    try {
      const res = await fetch("http://localhost:3001/api/Emantecate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (res.ok) {
        toast({ title: "Éxito", description: "Producto creado correctamente" })
        router.push("/products")
      } else {
        const data = await res.json()
        throw new Error(data.error || "Error al crear producto")
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Error desconocido", variant: "destructive" })
    }
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input id="precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label htmlFor="relleno">ID Relleno (opcional)</Label>
              <Input id="relleno" value={rellenoId} onChange={(e) => setRellenoId(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
                Activo
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} />
                Destacado
              </label>
            </div>
            <div>
              <Label>Imagen</Label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
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
            <Button type="submit" className="w-full">Crear producto</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

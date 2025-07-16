"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function CreateRellenoPage() {
  const { token, isAdmin } = useAuth()
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [activo, setActivo] = useState(true)

  const [nombreError, setNombreError] = useState("")
  const [descripcionError, setDescripcionError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      router.push("/")
    }
  }, [isAdmin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setNombreError("")
    setDescripcionError("")

    if (!nombre.trim()) {
      setNombreError("El nombre no puede estar vacío")
      return
    }

    if (!descripcion.trim()) {
      setDescripcionError("La descripción no puede estar vacía")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("http://localhost:3001/api/Emantecate/rellenos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          Nombre: nombre,
          Descripcion: descripcion,
          Activo: activo
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al crear relleno")
      }

      toast({
        title: "Relleno creado",
        description: `Se registró correctamente`
      })

      router.push("/products")
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Error desconocido",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-xl">
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
                rows={3}
                className={descripcionError ? "border-red-500" : ""}
                required
              />
              {descripcionError && (
                <p className="text-sm text-red-500 mt-1">{descripcionError}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
                id="activo"
              />
              <Label htmlFor="activo">Activo</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Registrando..." : "Registrar Relleno"}
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

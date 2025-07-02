"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Package, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Emantecate</SheetTitle>
        </SheetHeader>

        {/* User section */}
        <div className="mt-6">
          <UserMenu />
        </div>

        <Separator className="my-6" />

        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
          >
            Contacto
          </Link>
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
          >
            Carrito
          </Link>

           {/*{user?.role === "admin" && (
            <>
              <Separator className="my-2" />
              <div className="text-sm font-medium text-muted-foreground mb-2">Administración</div>
              <Link
                href="/admin/register-product"
                onClick={() => setOpen(false)}
                className="text-lg font-medium py-2 hover:text-primary transition-colors flex items-center"
              >
                <Package className="h-4 w-4 mr-2" />
                Registrar Producto
              </Link>
              <Link
                href="/admin/register-filling"
                onClick={() => setOpen(false)}
                className="text-lg font-medium py-2 hover:text-primary transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Registrar Relleno
              </Link>
            </>
          )} */}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

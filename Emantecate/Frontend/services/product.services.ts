import { toast } from "@/components/ui/use-toast";

export interface Product {
  IDProducto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Imagen: string;
  Stock: number;
  Activo: boolean;
  Destacado: boolean;
  IDRelleno: number | null;
  Relleno?: {
    Nombre: string;
  };
}

export const ProductService = {
  // Obtener todos los productos
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch('http://localhost:3001/api/Emantecate');
      
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? "No se encontraron productos" 
          : "Error al obtener productos");
      }
      
      return await response.json();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar productos",
        variant: "destructive"
      });
      throw error;
    }
  },

  // Obtener un producto por ID
  async getProductById(id: number): Promise<Product> {
  const response = await fetch(`http://localhost:3001/api/Emantecate/${id}`)
  if (!response.ok) throw new Error("Producto no encontrado")
  return await response.json()
  },
  
  // Actualizar un producto
  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(`http://localhost:3001/api/Emantecate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }

      toast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
      });

      return await response.json();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
      throw error;
    }
  },

  // Cambiar estado activo/inactivo
  async toggleProductStatus(id: number, activate: boolean): Promise<void> {
    try {
      const endpoint = activate ? 'activar' : 'baja';
      const response = await fetch(
        `http://localhost:3001/api/Emantecate/${id}/${endpoint}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al cambiar estado del producto');
      }

      toast({
        title: "Éxito",
        description: `Producto ${activate ? "activado" : "desactivado"} correctamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido al cambiar estado",
        variant: "destructive",
      });
      throw error;
    }
  }
};
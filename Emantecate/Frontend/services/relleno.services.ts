// src/services/relleno.service.ts
import { toast } from "@/components/ui/use-toast";

export interface Relleno {
  IDRelleno: number;
  Nombre: string;
  Activo: boolean;
}

export const RellenoService = {
  async getActiveRellenos(): Promise<Relleno[]> {
    try {
      const response = await fetch(
        "http://localhost:3001/api/Emantecate/rellenos/activos"
      );

      if (!response.ok) {
        throw new Error('Error al obtener rellenos');
      }

      return await response.json();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los rellenos",
        variant: "destructive",
      });
      throw error;
    }
  },
};
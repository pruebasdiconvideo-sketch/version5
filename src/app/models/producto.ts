export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
  descuento?: number;
}

export function precioFinal(p: Producto): number {
  return p.descuento ? +(p.precio * (1 - p.descuento / 100)).toFixed(2) : p.precio;
}

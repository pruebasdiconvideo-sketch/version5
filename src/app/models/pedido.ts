export type EstadoPedido = 'pendiente' | 'preparando' | 'entregado' | 'cancelado';

export const ESTADOS: EstadoPedido[] = ['pendiente', 'preparando', 'entregado', 'cancelado'];

export const ETIQUETA_ESTADO: Record<EstadoPedido, string> = {
  pendiente: 'Pendiente',
  preparando: 'En preparación',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

export const CLASE_ESTADO: Record<EstadoPedido, string> = {
  pendiente: 'bg-warning text-dark',
  preparando: 'bg-info text-dark',
  entregado: 'bg-success',
  cancelado: 'bg-secondary',
};

export interface ItemPedido {
  productoId: number;
  nombre: string;
  imagen: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  clienteNombre: string;
  clienteEmail: string;
  fecha: string;
  items: ItemPedido[];
  subtotal: number;
  igv: number;
  total: number;
  estado: EstadoPedido;
}

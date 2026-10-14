import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CLASE_ESTADO, ESTADOS, ETIQUETA_ESTADO, EstadoPedido, Pedido } from '../models/pedido';
import { PedidoDetalle } from '../pedido-detalle/pedido-detalle';

export interface CambioEstado {
  pedido: Pedido;
  estado: EstadoPedido;
}

@Component({
  selector: 'app-admin-pedidos',
  imports: [CurrencyPipe, DatePipe, FormsModule, NgClass, NgFor, NgIf, PedidoDetalle],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css',
})
export class AdminPedidos {
  @Input() pedidos: Pedido[] = [];
  @Output() cambiar = new EventEmitter<CambioEstado>();

  filtroEstado: EstadoPedido | '' = '';
  busqueda = '';
  abiertos = new Set<number>();

  readonly estados = ESTADOS;
  readonly etiqueta = ETIQUETA_ESTADO;
  readonly clase = CLASE_ESTADO;

  get visibles(): Pedido[] {
    const texto = this.busqueda.trim().toLowerCase();
    return this.pedidos.filter(
      (p) =>
        (!this.filtroEstado || p.estado === this.filtroEstado) &&
        (!texto ||
          p.clienteNombre.toLowerCase().includes(texto) ||
          p.clienteEmail.toLowerCase().includes(texto) ||
          String(p.id) === texto.replace('#', '')),
    );
  }

  contar(estado: EstadoPedido): number {
    return this.pedidos.filter((p) => p.estado === estado).length;
  }

  alternar(id: number): void {
    if (!this.abiertos.delete(id)) this.abiertos.add(id);
  }

  cambiarEstado(pedido: Pedido, estado: EstadoPedido): void {
    if (estado !== pedido.estado) this.cambiar.emit({ pedido, estado });
  }
}

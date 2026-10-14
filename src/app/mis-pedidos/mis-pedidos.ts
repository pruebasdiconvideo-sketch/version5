import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CLASE_ESTADO, ESTADOS, ETIQUETA_ESTADO, EstadoPedido, Pedido } from '../models/pedido';
import { AuthService } from '../services/auth.service';
import { PedidoService } from '../services/pedido.service';
import { PedidoDetalle } from '../pedido-detalle/pedido-detalle';

@Component({
  selector: 'app-mis-pedidos',
  imports: [CurrencyPipe, DatePipe, FormsModule, NgClass, NgFor, NgIf, RouterLink, PedidoDetalle],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css',
})
export class MisPedidos implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly servicio = inject(PedidoService);

  pedidos: Pedido[] = [];
  filtro: EstadoPedido | '' = '';
  abiertos = new Set<number>();
  cargando = true;

  readonly estados = ESTADOS;
  readonly etiqueta = ETIQUETA_ESTADO;
  readonly clase = CLASE_ESTADO;

  get visibles(): Pedido[] {
    return this.filtro ? this.pedidos.filter((p) => p.estado === this.filtro) : this.pedidos;
  }

  get totalGastado(): number {
    return this.pedidos.filter((p) => p.estado !== 'cancelado').reduce((acc, p) => acc + p.total, 0);
  }

  get enCurso(): number {
    return this.pedidos.filter((p) => p.estado === 'pendiente' || p.estado === 'preparando').length;
  }

  ngOnInit(): void {
    const sesion = this.auth.sesion();
    if (!sesion) return;
    this.servicio.listarDe(sesion.id).subscribe((lista) => {
      this.pedidos = lista;
      this.cargando = false;
    });
  }

  alternar(id: number): void {
    if (!this.abiertos.delete(id)) this.abiertos.add(id);
  }
}

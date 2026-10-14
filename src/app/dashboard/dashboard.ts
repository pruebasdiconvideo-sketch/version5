import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, LowerCasePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CLASE_ESTADO, ETIQUETA_ESTADO, Pedido } from '../models/pedido';
import { Producto } from '../models/producto';
import { UsuarioPublico } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { AdminPedidos, CambioEstado } from '../admin-pedidos/admin-pedidos';

type Vista = 'pedidos' | 'inventario' | 'clientes';

interface Kpi {
  titulo: string;
  valor: string;
  icono: string;
}

const STOCK_BAJO = 5;

@Component({
  selector: 'app-dashboard',
  imports: [AdminPedidos, CurrencyPipe, DatePipe, FormsModule, LowerCasePipe, NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  readonly auth = inject(AuthService);
  private readonly productosSrv = inject(ProductoService);
  private readonly pedidosSrv = inject(PedidoService);

  vista: Vista = 'pedidos';
  cargando = true;
  kpis: Kpi[] = [];

  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  clientes: UsuarioPublico[] = [];
  guardadoId: number | null = null;

  readonly etiqueta = ETIQUETA_ESTADO;
  readonly clase = CLASE_ESTADO;
  readonly stockBajo = STOCK_BAJO;

  ngOnInit(): void {
    this.cargar();
  }

  get recientes(): Pedido[] {
    return this.pedidos.slice(0, 3);
  }

  get bajoStock(): Producto[] {
    return this.productos.filter((p) => p.stock < STOCK_BAJO);
  }

  cambiarEstado(cambio: CambioEstado): void {
    this.pedidosSrv.cambiarEstado(cambio.pedido, cambio.estado).subscribe(() => this.cargar());
  }

  guardarProducto(p: Producto): void {
    const cambios = { stock: Math.max(0, Number(p.stock) || 0), descuento: Math.min(90, Math.max(0, Number(p.descuento) || 0)) };
    this.productosSrv.actualizar(p.id, cambios).subscribe(() => {
      this.guardadoId = p.id;
      this.calcularKpis();
    });
  }

  pedidosDe(cliente: UsuarioPublico): Pedido[] {
    return this.pedidos.filter((p) => p.usuarioId === cliente.id);
  }

  totalDe(cliente: UsuarioPublico): number {
    return this.pedidosDe(cliente)
      .filter((p) => p.estado !== 'cancelado')
      .reduce((acc, p) => acc + p.total, 0);
  }

  private cargar(): void {
    const sesion = this.auth.sesion();
    if (!sesion) return;

    if (this.auth.esAdmin()) {
      forkJoin({
        pedidos: this.pedidosSrv.listarTodos(),
        productos: this.productosSrv.obtenerTodos(),
        clientes: this.auth.listarClientes(),
      }).subscribe((datos) => {
        Object.assign(this, datos);
        this.finalizarCarga();
      });
    } else {
      this.pedidosSrv.listarDe(sesion.id).subscribe((pedidos) => {
        this.pedidos = pedidos;
        this.finalizarCarga();
      });
    }
  }

  private finalizarCarga(): void {
    this.cargando = false;
    this.calcularKpis();
  }

  private calcularKpis(): void {
    const vendidos = this.pedidos.filter((p) => p.estado !== 'cancelado');
    const ventas = vendidos.reduce((acc, p) => acc + p.total, 0);
    const enCurso = this.pedidos.filter((p) => p.estado === 'pendiente' || p.estado === 'preparando').length;
    const soles = (n: number): string => 'S/ ' + n.toFixed(2);

    this.kpis = this.auth.esAdmin()
      ? [
          { titulo: 'Ventas totales', valor: soles(ventas), icono: 'bi-cash-coin' },
          { titulo: 'Pedidos recibidos', valor: String(this.pedidos.length), icono: 'bi-receipt' },
          { titulo: 'Pedidos por atender', valor: String(enCurso), icono: 'bi-hourglass-split' },
          { titulo: 'Clientes registrados', valor: String(this.clientes.length), icono: 'bi-people' },
          { titulo: 'Productos con stock bajo', valor: String(this.bajoStock.length), icono: 'bi-exclamation-triangle' },
        ]
      : [
          { titulo: 'Mis pedidos', valor: String(this.pedidos.length), icono: 'bi-receipt' },
          { titulo: 'Pedidos en curso', valor: String(enCurso), icono: 'bi-hourglass-split' },
          { titulo: 'Total comprado', valor: soles(ventas), icono: 'bi-cash-coin' },
        ];
  }
}

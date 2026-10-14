import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Pedido } from '../models/pedido';
import { Producto, precioFinal } from '../models/producto';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/carrito.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  selector: 'app-tienda',
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink, ProductoCard],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda implements OnInit {
  private readonly servicio = inject(ProductoService);
  private readonly pedidos = inject(PedidoService);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly carrito = inject(CarritoService);

  @ViewChild('panelPedido') panelPedido?: ElementRef<HTMLElement>;

  productos: Producto[] = [];
  pedidoCreado: Pedido | null = null;
  procesando = false;
  error = '';

  readonly precio = precioFinal;

  ngOnInit(): void {
    this.cargarProductos();
  }

  irAlPedido(): void {
    this.panelPedido?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  confirmar(): void {
    const sesion = this.auth.sesion();
    if (!sesion) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/tienda' } });
      return;
    }
    if (this.auth.esAdmin()) return;

    this.procesando = true;
    this.error = '';
    this.pedidos.crear(sesion, this.carrito.items()).subscribe({
      next: (pedido) => {
        this.pedidoCreado = pedido;
        this.carrito.vaciar();
        this.procesando = false;
        this.cargarProductos();
      },
      error: (e: Error) => {
        this.error = e.message || 'No se pudo registrar el pedido.';
        this.procesando = false;
      },
    });
  }

  private cargarProductos(): void {
    this.servicio.obtenerTodos().subscribe((lista) => (this.productos = lista));
  }
}

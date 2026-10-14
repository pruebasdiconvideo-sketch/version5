import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap, throwError } from 'rxjs';
import { EstadoPedido, ItemPedido, Pedido } from '../models/pedido';
import { precioFinal } from '../models/producto';
import { Sesion } from '../models/usuario';
import { ApiService } from './api.service';
import { IGV, ItemCarrito } from './carrito.service';
import { ProductoService } from './producto.service';

const redondear = (n: number): number => +n.toFixed(2);
const masRecientePrimero = (a: Pedido, b: Pedido): number => b.fecha.localeCompare(a.fecha);

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly api = inject(ApiService);
  private readonly productos = inject(ProductoService);

  listarTodos(): Observable<Pedido[]> {
    return this.api.listar<Pedido>('pedidos').pipe(map((lista) => [...lista].sort(masRecientePrimero)));
  }

  listarDe(usuarioId: number): Observable<Pedido[]> {
    return this.listarTodos().pipe(map((lista) => lista.filter((p) => p.usuarioId === usuarioId)));
  }

  crear(cliente: Sesion, carrito: ItemCarrito[]): Observable<Pedido> {
    return this.productos.obtenerTodos().pipe(
      switchMap((actuales) => {
        const sinStock = carrito.find(
          (i) => (actuales.find((p) => p.id === i.producto.id)?.stock ?? 0) < i.cantidad,
        );
        if (sinStock) {
          return throwError(() => new Error(`Stock insuficiente de "${sinStock.producto.nombre}".`));
        }

        const items: ItemPedido[] = carrito.map((i) => ({
          productoId: i.producto.id,
          nombre: i.producto.nombre,
          imagen: i.producto.imagen,
          precioUnitario: precioFinal(i.producto),
          cantidad: i.cantidad,
          subtotal: redondear(precioFinal(i.producto) * i.cantidad),
        }));
        const subtotal = redondear(items.reduce((acc, i) => acc + i.subtotal, 0));
        const igv = redondear(subtotal * IGV);

        const nuevo: Omit<Pedido, 'id'> = {
          usuarioId: cliente.id,
          clienteNombre: cliente.nombre,
          clienteEmail: cliente.email,
          fecha: new Date().toISOString(),
          items,
          subtotal,
          igv,
          total: redondear(subtotal + igv),
          estado: 'pendiente',
        };

        return this.api.crear<Pedido>('pedidos', nuevo).pipe(
          switchMap((creado) =>
            forkJoin(
              carrito.map((i) => {
                const stock = actuales.find((p) => p.id === i.producto.id)?.stock ?? 0;
                return this.productos.actualizar(i.producto.id, { stock: stock - i.cantidad });
              }),
            ).pipe(map(() => creado)),
          ),
        );
      }),
    );
  }

  cambiarEstado(pedido: Pedido, estado: EstadoPedido): Observable<Pedido> {
    const actualizar$ = this.api.actualizar<Pedido>('pedidos', pedido.id, { estado });
    if (estado !== 'cancelado' || pedido.estado === 'cancelado') return actualizar$;

    return this.productos.obtenerTodos().pipe(
      switchMap((actuales) =>
        forkJoin(
          pedido.items.map((i) => {
            const stock = actuales.find((p) => p.id === i.productoId)?.stock ?? 0;
            return this.productos.actualizar(i.productoId, { stock: stock + i.cantidad });
          }),
        ),
      ),
      switchMap(() => actualizar$),
    );
  }
}

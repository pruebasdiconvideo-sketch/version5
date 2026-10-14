import { Injectable, computed, inject, signal } from '@angular/core';
import { Producto, precioFinal } from '../models/producto';
import { StorageService } from './storage.service';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

const CLAVE_CARRITO = 'cafe_andino_carrito';
export const IGV = 0.18;

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly storage = inject(StorageService);
  private readonly _items = signal<ItemCarrito[]>(this.storage.leer<ItemCarrito[]>(CLAVE_CARRITO, []));

  readonly items = this._items.asReadonly();
  readonly cantidad = computed(() => this._items().reduce((acc, i) => acc + i.cantidad, 0));
  readonly subtotal = computed(() =>
    this._items().reduce((acc, i) => acc + precioFinal(i.producto) * i.cantidad, 0),
  );
  readonly igv = computed(() => this.subtotal() * IGV);
  readonly total = computed(() => this.subtotal() + this.igv());

  agregar(producto: Producto): void {
    this.actualizar((items) => {
      const existente = items.find((i) => i.producto.id === producto.id);
      if (!existente) return [...items, { producto, cantidad: 1 }];
      return items.map((i) =>
        i === existente ? { ...i, cantidad: Math.min(i.cantidad + 1, producto.stock) } : i,
      );
    });
  }

  cambiarCantidad(id: number, delta: number): void {
    this.actualizar((items) =>
      items
        .map((i) =>
          i.producto.id === id ? { ...i, cantidad: Math.min(i.cantidad + delta, i.producto.stock) } : i,
        )
        .filter((i) => i.cantidad > 0),
    );
  }

  quitar(id: number): void {
    this.actualizar((items) => items.filter((i) => i.producto.id !== id));
  }

  vaciar(): void {
    this.actualizar(() => []);
  }

  private actualizar(fn: (items: ItemCarrito[]) => ItemCarrito[]): void {
    const nuevos = fn(this._items());
    this._items.set(nuevos);
    this.storage.guardar(CLAVE_CARRITO, nuevos);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Producto, precioFinal } from '../models/producto';

const STOCK_REFERENCIA = 30;
const IMAGEN_RESPALDO = 'images/placeholder.jpg';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe, NgClass, NgIf, NgStyle, UpperCasePipe],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {
  @Input({ required: true }) producto!: Producto;
  @Input() mostrarBoton = false;
  @Output() agregar = new EventEmitter<Producto>();

  agregado = false;

  get precio(): number {
    return precioFinal(this.producto);
  }

  get porcentajeStock(): number {
    return Math.min(100, (this.producto.stock / STOCK_REFERENCIA) * 100);
  }

  get claseStock(): string {
    if (this.producto.stock === 0) return 'bg-secondary';
    return this.producto.stock < 5 ? 'bg-danger' : this.producto.stock < 15 ? 'bg-warning' : 'bg-success';
  }

  alAgregar(): void {
    this.agregar.emit(this.producto);
    this.agregado = true;
    setTimeout(() => (this.agregado = false), 1200);
  }

  imagenRota(evento: Event): void {
    const img = evento.target as HTMLImageElement;
    if (!img.src.endsWith(IMAGEN_RESPALDO)) img.src = IMAGEN_RESPALDO;
  }
}

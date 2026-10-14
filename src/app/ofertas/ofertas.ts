import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Producto } from '../models/producto';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  selector: 'app-ofertas',
  imports: [NgFor, NgIf, ProductoCard],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas implements OnInit {
  private readonly servicio = inject(ProductoService);
  readonly carrito = inject(CarritoService);

  ofertas: Producto[] = [];

  ngOnInit(): void {
    this.servicio.obtenerTodos().subscribe((lista) => (this.ofertas = lista.filter((p) => !!p.descuento)));
  }
}

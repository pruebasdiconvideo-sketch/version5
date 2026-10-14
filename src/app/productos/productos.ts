import { Component, OnInit, inject } from '@angular/core';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto, precioFinal } from '../models/producto';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service';
import { ProductoCard } from '../producto-card/producto-card';

type Orden = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';

@Component({
  selector: 'app-productos',
  imports: [NgClass, NgFor, NgIf, FormsModule, TitleCasePipe, ProductoCard],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  private readonly servicio = inject(ProductoService);
  private readonly route = inject(ActivatedRoute);
  readonly carrito = inject(CarritoService);

  productos: Producto[] = [];
  busqueda = '';
  categoria = '';
  orden: Orden = 'relevancia';
  cargando = true;
  error = '';

  get categorias(): string[] {
    return [...new Set(this.productos.map((p) => p.categoria))];
  }

  get filtrados(): Producto[] {
    const texto = this.busqueda.trim().toLowerCase();
    const lista = this.productos.filter(
      (p) => (!this.categoria || p.categoria === this.categoria) && p.nombre.toLowerCase().includes(texto),
    );
    switch (this.orden) {
      case 'precio-asc': return [...lista].sort((a, b) => precioFinal(a) - precioFinal(b));
      case 'precio-desc': return [...lista].sort((a, b) => precioFinal(b) - precioFinal(a));
      case 'nombre': return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
      default: return lista;
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((q) => (this.categoria = q.get('categoria') ?? ''));
    this.servicio.obtenerTodos().subscribe({
      next: (lista) => {
        this.productos = lista;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el catálogo. ¿Está corriendo JSON Server (npm run api)?';
        this.cargando = false;
      },
    });
  }
}

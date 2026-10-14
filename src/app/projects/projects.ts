import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductoCard } from '../producto-card/producto-card';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-projects',
  imports: [NgFor, RouterLink, ProductoCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly servicio = inject(ProductoService);
  destacados: Producto[] = [];

  ngOnInit(): void {
    this.servicio.obtenerTodos().subscribe((lista) => (this.destacados = lista.slice(0, 4)));
  }
}
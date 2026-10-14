import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [NgFor, RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {
  readonly categorias = [
    { id: 'cafe', titulo: 'Café', texto: 'Espresso, filtrados y cold brew', imagen: 'images/product-espresso.jpg' },
    { id: 'tisanas', titulo: 'Tisanas', texto: 'Muña, coca y hierba luisa', imagen: 'images/product-tisana-muna.jpg' },
    { id: 'postres', titulo: 'Postres', texto: 'Lúcuma, aguaymanto y alfajores', imagen: 'images/product-tarta-lucuma.jpg' },
    { id: 'salados', titulo: 'Salados', texto: 'Empanadas y sándwiches', imagen: 'images/product-empanada.jpg' },
  ];
}

import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgFor],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly valores = [
    { icono: 'bi-geo-alt', titulo: 'Trazabilidad total', texto: 'Compramos directo a familias productoras con comercio justo.' },
    { icono: 'bi-fire', titulo: 'Tostado fresco', texto: 'Tostamos en batches pequeños dentro del local.' },
    { icono: 'bi-heart', titulo: 'Sabores peruanos', texto: 'Lúcuma, aguaymanto, muña y manjar blanco en cada carta.' },
  ];
}
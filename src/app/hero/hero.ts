import { Component } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [NgFor, NgStyle, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly fondo = {
    'background-image': "linear-gradient(115deg, rgba(42, 26, 15, 0.94) 35%, rgba(42, 26, 15, 0.72)), url('images/hero.jpg')",
  };

  readonly cifras = [
    { valor: '2018', texto: 'Desde' },
    { valor: '1,800 m', texto: 'De altura' },
    { valor: '100%', texto: 'Orgánico' },
  ];
}

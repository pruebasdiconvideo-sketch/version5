import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-testimonios',
  imports: [NgClass, NgFor],
  templateUrl: './testimonios.html',
  styleUrl: './testimonios.css',
})
export class Testimonios {
  readonly estrellas = [1, 2, 3, 4, 5];
  readonly opiniones = [
    { nombre: 'María P.', origen: 'Turista · Lima', puntaje: 5, texto: 'El mejor cappuccino del Cusco. El local es acogedor y la atención, excelente.' },
    { nombre: 'Daniel R.', origen: 'Nómada digital · Chile', puntaje: 5, texto: 'Buen WiFi, café de calidad y un ambiente ideal para trabajar toda la mañana.' },
    { nombre: 'Familia Quispe', origen: 'Vecinos · Cusco', puntaje: 4, texto: 'Pedimos la tarta de lúcuma y los alfajores para el cumpleaños. ¡Un éxito!' },
  ];
}

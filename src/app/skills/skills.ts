import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly especialidades = [
    { icono: 'bi-geo-alt', titulo: 'Café de origen', texto: 'Selección directa de productores de La Convención y Quillabamba.' },
    { icono: 'bi-fire', titulo: 'Tostado fresco', texto: 'Lotes pequeños para cuidar el aroma y el carácter de cada grano.' },
    { icono: 'bi-cup-hot', titulo: 'Sabores andinos', texto: 'Bebidas y preparaciones inspiradas en ingredientes peruanos.' },
  ];
}
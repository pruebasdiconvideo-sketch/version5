import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido-detalle',
  imports: [CurrencyPipe, NgFor, NgIf],
  templateUrl: './pedido-detalle.html',
  styleUrl: './pedido-detalle.css',
})
export class PedidoDetalle {
  @Input({ required: true }) pedido!: Pedido;
  @Input() mostrarCliente = false;
}

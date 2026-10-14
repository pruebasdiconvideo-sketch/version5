import { TestBed } from '@angular/core/testing';
import { Producto } from '../models/producto';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  const cafe: Producto = { id: 1, nombre: 'Cappuccino', imagen: '', categoria: 'cafe', precio: 10, stock: 3 };
  let servicio: CarritoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(CarritoService);
    servicio.vaciar();
  });

  it('calcula subtotal, IGV (18%) y total', () => {
    servicio.agregar(cafe);
    servicio.agregar(cafe);
    expect(servicio.subtotal()).toBe(20);
    expect(servicio.igv()).toBeCloseTo(3.6);
    expect(servicio.total()).toBeCloseTo(23.6);
  });

  it('no supera el stock disponible', () => {
    for (let i = 0; i < 6; i++) servicio.agregar(cafe);
    expect(servicio.cantidad()).toBe(3);
  });
});

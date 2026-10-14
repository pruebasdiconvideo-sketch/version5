import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { PedidoDetalle } from './pedido-detalle';

describe('PedidoDetalle', () => {
  let component: PedidoDetalle;
  let fixture: ComponentFixture<PedidoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDetalle],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoDetalle);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pedido', {
      id: 1, usuarioId: 2, clienteNombre: 'Lucía', clienteEmail: 'l@x.pe', fecha: '2026-10-01T10:00:00.000Z',
      items: [{ productoId: 1, nombre: 'Cappuccino', imagen: '', precioUnitario: 12, cantidad: 2, subtotal: 24 }],
      subtotal: 24, igv: 4.32, total: 28.32, estado: 'pendiente',
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

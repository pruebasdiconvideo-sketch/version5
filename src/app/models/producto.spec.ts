import { Producto, precioFinal } from './producto';

describe('precioFinal', () => {
  const base: Producto = { id: 1, nombre: 'Tarta', imagen: '', categoria: 'postres', precio: 10, stock: 5 };

  it('devuelve el precio original sin descuento', () => {
    expect(precioFinal(base)).toBe(10);
  });

  it('aplica el porcentaje de descuento', () => {
    expect(precioFinal({ ...base, descuento: 20 })).toBe(8);
  });
});

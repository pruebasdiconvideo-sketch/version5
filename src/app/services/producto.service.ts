import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly api = inject(ApiService);

  obtenerTodos(): Observable<Producto[]> {
    return this.api.listar<Producto>('productos');
  }

  actualizar(id: number, cambios: Partial<Producto>): Observable<Producto> {
    return this.api.actualizar<Producto>('productos', id, cambios);
  }
}

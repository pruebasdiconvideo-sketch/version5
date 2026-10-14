import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Entidad } from '../models/entidad';
import { StorageService } from './storage.service';

const PREFIJO_DB = 'cafe_andino_db_v1_';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  listar<T extends Entidad>(coleccion: string): Observable<T[]> {
    if (!this.esNavegador) return of([]);
    return environment.usarDbEstatica
      ? this.coleccionLocal<T>(coleccion)
      : this.http.get<T[]>(`${environment.apiUrl}/${coleccion}`);
  }

  crear<T extends Entidad>(coleccion: string, cuerpo: Omit<T, 'id'>): Observable<T> {
    if (!environment.usarDbEstatica) {
      return this.http.post<T>(`${environment.apiUrl}/${coleccion}`, cuerpo);
    }
    return this.coleccionLocal<T>(coleccion).pipe(
      map((lista) => {
        const nuevo = { ...cuerpo, id: this.siguienteId(lista) } as T;
        this.guardarLocal(coleccion, [...lista, nuevo]);
        return nuevo;
      }),
    );
  }

  actualizar<T extends Entidad>(coleccion: string, id: number, cambios: Partial<T>): Observable<T> {
    if (!environment.usarDbEstatica) {
      return this.http.patch<T>(`${environment.apiUrl}/${coleccion}/${id}`, cambios);
    }
    return this.coleccionLocal<T>(coleccion).pipe(
      map((lista) => {
        let actualizado!: T;
        const nueva = lista.map((e) => (e.id === id ? (actualizado = { ...e, ...cambios }) : e));
        this.guardarLocal(coleccion, nueva);
        return actualizado;
      }),
    );
  }

  private coleccionLocal<T extends Entidad>(coleccion: string): Observable<T[]> {
    const guardada = this.storage.leer<T[] | null>(PREFIJO_DB + coleccion, null);
    if (guardada) return of(guardada);
    return this.http.get<Record<string, T[]>>('db.json').pipe(
      map((db) => db[coleccion] ?? []),
      tap((lista) => this.guardarLocal(coleccion, lista)),
    );
  }

  private guardarLocal<T>(coleccion: string, lista: T[]): void {
    this.storage.guardar(PREFIJO_DB + coleccion, lista);
  }

  private siguienteId(lista: Entidad[]): number {
    return lista.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  }
}

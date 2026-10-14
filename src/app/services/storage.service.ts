import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  leer<T>(clave: string, porDefecto: T): T {
    if (!this.esNavegador) return porDefecto;
    try {
      const valor = localStorage.getItem(clave);
      return valor ? (JSON.parse(valor) as T) : porDefecto;
    } catch {
      return porDefecto;
    }
  }

  guardar(clave: string, valor: unknown): void {
    if (this.esNavegador) localStorage.setItem(clave, JSON.stringify(valor));
  }

  eliminar(clave: string): void {
    if (this.esNavegador) localStorage.removeItem(clave);
  }
}

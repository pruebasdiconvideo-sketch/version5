import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { DatosRegistro, Sesion, Usuario, UsuarioPublico } from '../models/usuario';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

const CLAVE_SESION = 'cafe_andino_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly storage = inject(StorageService);
  private readonly _sesion = signal<Sesion | null>(this.storage.leer<Sesion | null>(CLAVE_SESION, null));

  readonly sesion = this._sesion.asReadonly();
  readonly autenticado = computed(() => this._sesion() !== null);
  readonly esAdmin = computed(() => this._sesion()?.rol === 'administrador');
  readonly esCliente = computed(() => this._sesion()?.rol === 'cliente');

  login(email: string, password: string): Observable<boolean> {
    const correo = email.trim().toLowerCase();
    return this.api.listar<Usuario>('usuarios').pipe(
      map((usuarios) => usuarios.find((u) => u.email.toLowerCase() === correo && u.password === password) ?? null),
      tap((usuario) => usuario && this.guardarSesion(usuario)),
      map((usuario) => usuario !== null),
    );
  }

  registrar(datos: DatosRegistro): Observable<Sesion> {
    const email = datos.email.trim().toLowerCase();
    return this.api.listar<Usuario>('usuarios').pipe(
      switchMap((usuarios) => {
        if (usuarios.some((u) => u.email.toLowerCase() === email)) {
          return throwError(() => new Error('Ya existe una cuenta con ese correo.'));
        }
        return this.api.crear<Usuario>('usuarios', {
          nombre: datos.nombre.trim(),
          email,
          telefono: datos.telefono.trim(),
          password: datos.password,
          rol: 'cliente',
          fechaRegistro: new Date().toISOString(),
        });
      }),
      tap((usuario) => this.guardarSesion(usuario)),
      map(() => this._sesion() as Sesion),
    );
  }

  listarClientes(): Observable<UsuarioPublico[]> {
    return this.api.listar<Usuario>('usuarios').pipe(
      map((usuarios) =>
        usuarios.filter((u) => u.rol === 'cliente').map(({ password: _omitida, ...publico }) => publico),
      ),
    );
  }

  actualizarNombre(nombre: string): Observable<void> {
    const actual = this._sesion();
    if (!actual) return of(undefined);
    return this.api.actualizar<Usuario>('usuarios', actual.id, { nombre }).pipe(
      tap(() => this.persistir({ ...actual, nombre })),
      map(() => undefined),
    );
  }

  logout(): void {
    this.storage.eliminar(CLAVE_SESION);
    this._sesion.set(null);
  }

  private guardarSesion(u: Usuario): void {
    this.persistir({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      telefono: u.telefono,
      rol: u.rol,
      fechaIngreso: new Date().toISOString(),
    });
  }

  private persistir(sesion: Sesion): void {
    this.storage.guardar(CLAVE_SESION, sesion);
    this._sesion.set(sesion);
  }
}

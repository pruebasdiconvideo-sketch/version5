export type Rol = 'administrador' | 'cliente';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  password: string;
  rol: Rol;
  fechaRegistro: string;
}

export type UsuarioPublico = Omit<Usuario, 'password'>;

export interface Sesion {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: Rol;
  fechaIngreso: string;
}

export interface DatosRegistro {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}

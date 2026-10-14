import { Routes } from '@angular/router';
import { authGuard, rolGuard } from './guards/auth.guard';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', title: 'Café Andino', loadComponent: () => import('./home/home').then((m) => m.Home) },
  { path: 'productos', title: 'Productos', loadComponent: () => import('./productos/productos').then((m) => m.Productos) },
  { path: 'ofertas', title: 'Ofertas', loadComponent: () => import('./ofertas/ofertas').then((m) => m.Ofertas) },
  { path: 'tienda', title: 'Tienda', loadComponent: () => import('./tienda/tienda').then((m) => m.Tienda) },
  { path: 'categorias', title: 'Categorías', loadComponent: () => import('./categorias/categorias').then((m) => m.Categorias) },
  { path: 'about', title: 'Nuestra historia', component: About },
  { path: 'nosotros', title: 'Nuestra historia', component: About },
  { path: 'testimonios', title: 'Opiniones', loadComponent: () => import('./testimonios/testimonios').then((m) => m.Testimonios) },
  { path: 'contact', title: 'Contacto', component: Contact },
  { path: 'contacto', title: 'Contacto', component: Contact },
  { path: 'mi-cuenta', title: 'Mi Cuenta', loadComponent: () => import('./mi-cuenta/mi-cuenta').then((m) => m.MiCuenta) },
  { path: 'login', title: 'Iniciar sesión', loadComponent: () => import('./login/login').then((m) => m.Login) },
  { path: 'registro', title: 'Crear cuenta', loadComponent: () => import('./registro/registro').then((m) => m.Registro) },
  {
    path: 'mis-pedidos',
    title: 'Mis pedidos',
    canActivate: [rolGuard('cliente')],
    loadComponent: () => import('./mis-pedidos/mis-pedidos').then((m) => m.MisPedidos),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
  { path: '**', title: 'Página no encontrada', loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound) },
];

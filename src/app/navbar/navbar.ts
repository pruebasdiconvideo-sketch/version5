import { Component, computed, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly auth = inject(AuthService);
  readonly carrito = inject(CarritoService);
  private readonly router = inject(Router);

  menuAbierto = false;

  readonly enlaces = computed(() => {
    const base = [
      { texto: 'Home', ruta: '/' },
      { texto: 'Productos', ruta: '/productos' },
      { texto: 'Ofertas', ruta: '/ofertas' },
      { texto: 'Tienda', ruta: '/tienda' },
      { texto: 'Nosotros', ruta: '/about' },
      { texto: 'Contacto', ruta: '/contact' },
    ];
    return this.auth.esCliente() ? [...base, { texto: 'Mis pedidos', ruta: '/mis-pedidos' }] : base;
  });

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.cerrarMenu();
    this.router.navigate(['/']);
  }
}

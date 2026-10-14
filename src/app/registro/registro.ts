import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  datos = { nombre: '', email: '', telefono: '', password: '', confirmar: '' };
  error = '';
  cargando = false;

  get clavesDistintas(): boolean {
    return this.datos.confirmar !== '' && this.datos.password !== this.datos.confirmar;
  }

  registrar(form: NgForm): void {
    if (form.invalid || this.clavesDistintas) return;
    this.cargando = true;
    this.error = '';

    this.auth.registrar(this.datos).subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirect') ?? '/dashboard'),
      error: (e: Error) => {
        this.cargando = false;
        this.error = e.message || 'No se pudo crear la cuenta.';
      },
    });
  }
}

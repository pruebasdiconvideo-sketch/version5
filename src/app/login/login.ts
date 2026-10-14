import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  email = '';
  password = '';
  error = '';
  cargando = false;

  ingresar(form: NgForm): void {
    if (form.invalid) return;
    this.cargando = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (ok) => {
        this.cargando = false;
        if (ok) this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirect') ?? '/dashboard');
        else this.error = 'Correo o contraseña incorrectos.';
      },
      error: () => {
        this.cargando = false;
        this.error = 'No se pudo conectar con el servidor. ¿Está corriendo la API (npm run api)?';
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { DatePipe, LowerCasePipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  imports: [DatePipe, FormsModule, LowerCasePipe, NgClass, NgIf, RouterLink, TitleCasePipe],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta {
  readonly auth = inject(AuthService);
  nombre = '';
  guardado = false;

  guardar(): void {
    this.auth.actualizarNombre(this.nombre.trim()).subscribe(() => {
      this.nombre = '';
      this.guardado = true;
    });
  }
}

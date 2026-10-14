import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from '../models/usuario';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.autenticado() ? true : router.createUrlTree(['/']);
};

export const rolGuard =
  (rol: Rol): CanActivateFn =>
    () => {
      const auth = inject(AuthService);
      const router = inject(Router);
      if (!auth.autenticado()) return router.createUrlTree(['/']);
      return auth.sesion()?.rol === rol ? true : router.createUrlTree(['/dashboard']);
    };

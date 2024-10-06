import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if(!req.url.includes('authenticate') && !req.url.includes('register')) {
    if (authService.isLoggedIn()) {
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });
      return next(authRequest);
    }
  }
  return next(req);
}

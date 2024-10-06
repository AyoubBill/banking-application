import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router,CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const tokenGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const jwtHelper = new JwtHelperService();
  
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if(jwtHelper.isTokenExpired(authService.getToken()!)) { 
    authService.removeToken();
    router.navigate(['/login']);
    return false;
  }
  return true;
};


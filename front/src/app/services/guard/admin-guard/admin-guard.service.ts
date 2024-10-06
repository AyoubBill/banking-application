import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../../services/auth.service";

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(authService.getToken()!);
    if(decodedToken.authorities[0].authority != 'ROLE_ADMIN') {
      router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
  return false;
};

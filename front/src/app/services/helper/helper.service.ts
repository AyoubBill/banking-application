import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  
  addedToken: any;

  constructor(
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) { 
    const token = this.authService.getToken();
    if (token) {
      this.addedToken = this.jwtHelperService.decodeToken(token as string);
    } else {
      this.addedToken = null;
    }
  }

  get userId(): number | null {
    return this.addedToken ? this.addedToken.userId : null;
  }

  get userFullName(): string | null {
    return this.addedToken ? this.addedToken.fullName : null;
  }
}

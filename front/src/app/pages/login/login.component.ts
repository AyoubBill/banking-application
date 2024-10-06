import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authenticationRequest: AuthenticationRequest = {};
  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authService: AuthService
  ) { }

  onLogin() {
    this.errorMessages = [];
    this.authenticationService.authenticate({ body: this.authenticationRequest }).subscribe({
      next: (data) => {
        this.authService.setToken(data.token as string);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.token as string);
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.router.navigate(['user/dashboard']);
        }
        console.log(decodedToken);
      },
      error: (error) => {
        this.errorMessages.push(error.error.errorMessage);
      }
    });
  }

}

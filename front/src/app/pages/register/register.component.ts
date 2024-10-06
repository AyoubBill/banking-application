import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserDto } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    RouterLink, 
    FormsModule,
    // NgIf,
    // NgFor
  ]
})
export class RegisterComponent {

  errorMessages: string[] = [];
  userDto: UserDto = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onRegister() {  
    this.errorMessages = [];
    this.authenticationService.register({ body: this.userDto }).subscribe({
      next: () => {
        this.router.navigate(['/confirm-register']);
      },
      error: (error) => this.errorMessages = error.error.validationError
    });
  }

}

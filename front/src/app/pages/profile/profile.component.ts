import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services';
import { UserDto } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true, 
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  errorMessages: string[] = [];
  userDto: UserDto = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    city: '',
    street: '',
    zipCode: 0
  };

  constructor(
    private userService: UserService,
    private route: Router,
    private helperService: HelperService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const userId = this.helperService.userId;
    if(userId !== null) {
      this.userService.findById({ 'user-id': userId }).subscribe({
        next: (user) => this.userDto = user,
        error: (error) => console.error(error)
      });
    }
  }

  onSave(): void {
    console.log('User to save:', this.userDto);
    this.userService.save({ body: this.userDto }).subscribe({
      next: () => {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.authService.getToken() as string);
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          this.route.navigate(['admin/dashboard']);
        } else {
          this.route.navigate(['user/dashboard']);
        }
      },
      error: (error) => console.error(error)
    });
  }

  onCancel(): void {
    this.route.navigate(['/user/dashboard']);
  }

}

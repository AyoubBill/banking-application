import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/services/auth.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class MenuComponent {

  @Input() isAdmin: boolean = false;
  fullName: string | null = this.helperService.userFullName;

  constructor(
    private router: Router,
    private authService: AuthService,
    private helperService: HelperService
  ) { }

  Logout(): void {
    this.router.navigate(['/login']);
    this.authService.removeToken();
  }

}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MyContactListComponent } from './pages/my-contact-list/my-contact-list.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    UserDashboardComponent,
    MyTransactionsComponent,
    MyContactListComponent,
    NewTransactionComponent,
    NewContactComponent,
    ProfileComponent,
    ManageUsersComponent, 
    RouterModule,
    MainMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent { }

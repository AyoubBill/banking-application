import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { MyContactListComponent } from './pages/my-contact-list/my-contact-list.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { tokenGuard } from './services/guard/token-guard/token-guard.service';
import { AdminGuard } from './services/guard/admin-guard/admin-guard.service';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirm-register', component: ConfirmRegisterComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: 'user', component: MainMenuComponent,
        children: [
            {path: 'dashboard', component: UserDashboardComponent},
            {path: 'my-transactions', component: MyTransactionsComponent},
            {path: 'my-contact-list', component: MyContactListComponent},
            {path: 'new-transaction', component: NewTransactionComponent},
            {path: 'new-contact', component: NewContactComponent},
            {path: 'new-contact/:id', component: NewContactComponent},
            {path: 'profile', component: ProfileComponent},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    {path: 'admin', component: MainAdminPageComponent,
    canActivate: [tokenGuard, AdminGuard],
        children: [
            {path: 'dashboard', component: AdminDashboardComponent},
            {path: 'customer', component: ManageUsersComponent},
            {path: 'profile', component: ProfileComponent},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../services/models';
import { UserService } from '../../services/services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {

  customers: UserDto[] = [];
  displayInactiveUsers: boolean = false;
  updateState: boolean | undefined = false;
  userIdToUpdate: number = -1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.findAllCustomers();
  }

  findAllCustomers() {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filterCustomer() {
    if (this.displayInactiveUsers) {
      this.customers = this.customers.filter(customer => !customer.active);
    } else {
      this.findAllCustomers();
    }
  }

  // onCheckUser(active: boolean | undefined, userId: number | undefined) {
  //   if (active) {
  //     this.userService.validateAccount({ 'user-id': userId as number }).subscribe({
  //       next: (data) => console.log(data),
  //       error: (error) => console.error(error)
  //     });
  //   } else {
  //     this.userService.inValidateAccount({ 'user-id': userId as number }).subscribe({
  //       next: (data) => console.log(data),
  //       error: (error) => console.error(error)
  //     });
  //   }
  // }

  changeUserState(active: boolean | undefined, id: number | undefined) {
    this.userIdToUpdate = id as number;
    this.updateState = active;
  }

  updateUserState() {
    if (this.updateState) {
      this.userService.validateAccount({
        'user-id': this.userIdToUpdate as number
      }).subscribe({
        next: () => {
          this.findAllCustomers();
        }
      });
    } else {
      this.userService.inValidateAccount({
        'user-id': this.userIdToUpdate as number
      }).subscribe();
    }
  }

  cancelUpdate() {
    const user = this.customers.find((c) => c.id === this.userIdToUpdate);
    if (user) {
      user.active = !user.active;
    }
    this.userIdToUpdate = -1;
    this.updateState = undefined;
  }

}

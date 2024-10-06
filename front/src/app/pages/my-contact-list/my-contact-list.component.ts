import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContactService } from '../../services/services';
import { HelperService } from '../../services/helper/helper.service';
import { ContactDto } from '../../services/models';

@Component({
  selector: 'app-my-contact-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-contact-list.component.html',
  styleUrl: './my-contact-list.component.scss'
})
export class MyContactListComponent implements OnInit {

  contacts: ContactDto[] = [];
  contactIdToDelete: number | undefined = -1;

  constructor(
    private contactService: ContactService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findContacts();
  }

  findContacts(): void {
    const userId = this.helperService.userId;
    if(userId !== null) {
      this.contactService.findAllByUserId1({ 'user-id': userId }).subscribe({
        next: (contact) => {
          this.contacts = contact;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onEdit(contactId: number | undefined): void {
    this.router.navigate(['/user/new-contact', contactId]);
  }

  onDelete(): void {
    if(this.contactIdToDelete) {
      this.contactService.delete2({ 'contact-id': this.contactIdToDelete }).subscribe({
        next: () => {
          this.findContacts();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}

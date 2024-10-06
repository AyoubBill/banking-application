import { Component, OnInit } from '@angular/core';
import { ContactDto } from '../../services/models';
import { ContactService } from '../../services/services';
import { HelperService } from '../../services/helper/helper.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss'
})
export class NewContactComponent implements OnInit {

  errorMessages: string[] = [];
  contactDto: ContactDto = {};

  constructor(
    private contactService: ContactService,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.params['id'];
    if(contactId) {
      this.contactService.findById2({ 'contact-id': contactId }).subscribe({
        next: (contact) => {
          this.contactDto = contact;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onSave(): void {
    this.errorMessages = [];
    const userId = this.helperService.userId;
    if(userId !== null) {
      this.contactDto.userId = userId;
    }
    
    this.contactService.save2({ body: this.contactDto }).subscribe({
      next: (id) => {
        console.log('Contact saved with id:', id);
        this.router.navigate(['/user/my-contact-list']);
      },
      error: (error) => console.log(error)
    });
  }

}

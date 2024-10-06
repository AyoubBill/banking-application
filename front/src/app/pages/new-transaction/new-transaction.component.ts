import { Component, OnInit } from '@angular/core';
import { ContactDto, TransactionDto } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { ContactService, StatisticService, TransactionService } from '../../services/services';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {

  transactionDto: TransactionDto = {};
  contacts: ContactDto[] = [];
  accountBalance: number = 0;
  errorMessages: string[] = [];

  constructor(
    private contactService: ContactService,
    private helperService: HelperService,
    private statisticService: StatisticService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.helperService.userId;
    this.findContacts();
    if(userId !== null) {
      this.statisticService.getAccountBalance({ 'user-id': userId }).subscribe({
        next: (accountBalance) => {
          this.accountBalance = accountBalance;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
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

  onCancel(): void {
    this.router.navigate(['/user/my-transactions']);
  }

  onSave(): void {
    const userId = this.helperService.userId;
    this.errorMessages = [];
    
    if(userId !== null) {
      this.transactionDto.userId = userId;
    }
    this.transactionService.save1({ body: this.transactionDto }).subscribe({
      next: () => {
        this.router.navigate(['/user/my-transactions']);
      },
      error: (error) => {
        this.errorMessages = error.error.validationError
      }
    });
  }

}

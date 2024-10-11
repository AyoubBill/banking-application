import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/services';
import { TransactionDto } from '../../services/models';
import { HelperService } from '../../services/helper/helper.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-transactions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {

  transactions: TransactionDto[] = [];

  constructor(
    private transactionService: TransactionService,
    private helperService: HelperService
  ) { }
  
  ngOnInit(): void {
    const userId = this.helperService.userId;
    if(userId !== null) {
      this.transactionService.findAllByUserId({ 'user-id': userId }).subscribe({
        next: (transactions) => {
          this.transactions = transactions;
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

}

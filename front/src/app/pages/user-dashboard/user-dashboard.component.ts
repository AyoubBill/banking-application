import { ChangeDetectionStrategy, ChangeDetectorRef, Component, LOCALE_ID, OnInit } from '@angular/core';
import { LightInfo, LightInfoComponent } from '../../components/light-info/light-info.component';
import { StatisticService } from '../../services/services';
import { HelperService } from '../../services/helper/helper.service';
import { lastValueFrom } from 'rxjs';
import { Chart } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    LightInfoComponent,
    FormsModule,
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [
    provideNativeDateAdapter(),
    DatePipe,
    // { provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent implements OnInit {

  accountInfoList: LightInfo[] = [];
  accountBalance: number = 0;
  highestDeposit: number = 0;
  highestTransfert: number = 0;
  chart: Chart | undefined;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(
    private statisticService: StatisticService,
    private helperService: HelperService,
    private datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void { 
    if (this.isBrowser()) { 
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: []
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } 
  }

  async ngOnInit(): Promise<void> {
    await this.initAccountInfoList();
    this.changeDetectorRef.detectChanges();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' 
      && typeof document !== 'undefined';
  }

  private async initAccountInfoList(): Promise<void> {
    const userId = this.helperService.userId;
    if (userId !== null) {
      const [accountBalance, highestDeposit, highestTransfert] = await Promise.all([
        lastValueFrom(this.statisticService.getAccountBalance({ 'user-id': userId })),
        lastValueFrom(this.statisticService.highestDeposit({ 'user-id': userId })),
        lastValueFrom(this.statisticService.highestTransfert({ 'user-id': userId }))
      ]);

      this.accountBalance = accountBalance;
      this.highestDeposit = highestDeposit;
      this.highestTransfert = highestTransfert;
    }

    this.accountInfoList = [
      {
        title: 'Account Balance',
        amount: this.accountBalance? this.accountBalance : 0,
        infoStyle: 'bg-success'
      },
      {
        title: 'Highest Deposit',
        amount: this.highestDeposit? this.highestDeposit : 0,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest Transfert',
        amount: this.highestTransfert? this.highestTransfert : 0,
        infoStyle: 'bg-danger'
      }
    ];
  }

  getChartData() {
    const userId = this.helperService.userId;
    const startedDateFormatted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDateFormatted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (startedDateFormatted && endDateFormatted && userId !== null) {
      this.statisticService.findSumTransactionsByDate(
        {
          'user-id': userId,
          'start-date': startedDateFormatted,
          'end-date': endDateFormatted
        }).subscribe({
          next: (values) => {
            if (this.chart) {
              const labelsTable: string[] = [];
              const datasetsTable: number[] = [];

              this.chart.data.labels = [];
              this.chart.data.datasets = [];
              for (let value of values) {
                labelsTable.push(value.transactionDate as string);
                datasetsTable.push(value.amount as number);
              }
              this.chart.data.labels = labelsTable;
              this.chart.data.datasets.push({
                label: 'Transaction by date',
                data: datasetsTable
              });
              this.chart.update();
            }
          }
        });
    }
  }

}

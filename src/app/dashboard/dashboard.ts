import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransactionService, Transaction } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnChanges {
  @Input() accountId: number | undefined;
  transactions: Transaction[] = [];
  isLoading = false;
  errorMessage = '';

  chartLabels: string[] = [];
  chartData: number[] = [];

chartType: ChartType = 'line';  chartDataSet: any;
  chartOptions: any;

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountId'] && this.accountId) {
      this.fetchTransactions();
    }
  }

  fetchTransactions(): void {
    this.isLoading = true;
    this.transactionService.getTransactions(this.accountId!).subscribe({
      next: (data) => {
        this.transactions = data;
        this.prepareChartData(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transactions.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  prepareChartData(data: Transaction[]): void {
    const sorted = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    let balance = 0;
    this.chartLabels = [];
    this.chartData = [];

    for (const tx of sorted) {
      const timeLabel = new Date(tx.timestamp).toLocaleTimeString();
      const amount = tx.type === 'DEPOSIT' ? tx.amount : -tx.amount;
      balance += amount;

      this.chartLabels.push(timeLabel);
      this.chartData.push(balance);
    }

    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          label: 'Account Balance Over Time',
          borderColor: '#1E88E5',
          backgroundColor: 'rgba(66,165,245,0.2)',
          pointBackgroundColor: '#1E88E5',
          pointBorderColor: '#1E88E5',
          fill: false,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Balance' } }
      }
    };
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-recent-transactions-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './recent-transactions-chart.html',
})
export class RecentTransactionsChartComponent {
  @Input() transactions: { date: string; amount: number }[] = [];

  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [{ data: [], label: 'Amount (₹)' }];
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Recent Transactions Timeline' }
    }
  };
  barChartType: ChartType = 'bar';

  ngOnInit() {
    this.barChartLabels = this.transactions.map(tx => tx.date);
    this.barChartData[0].data = this.transactions.map(tx => tx.amount);
  }
}

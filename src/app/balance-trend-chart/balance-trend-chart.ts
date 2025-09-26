import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-balance-trend-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './balance-trend-chart.html',
})
export class BalanceTrendChartComponent {
  @Input() balanceHistory: { date: string; balance: number }[] = [];

  lineChartLabels: string[] = [];
  lineChartData: ChartDataset[] = [{ data: [], label: 'Balance (₹)' }];
  lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Account Balance Trend' }
    }
  };
  lineChartType: ChartType = 'line';

  ngOnInit() {
    this.lineChartLabels = this.balanceHistory.map(entry => entry.date);
    this.lineChartData[0].data = this.balanceHistory.map(entry => entry.balance);
  }
}

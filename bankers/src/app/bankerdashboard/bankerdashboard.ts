import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts'; // ✅ correct path for v4+
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-bankerdashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './bankerdashboard.html',
  styleUrls: ['./bankerdashboard.css']
})
export class Bankerdashboard implements OnInit {
  @Input() bankerData: any;
  accounts: any[] = [];

  pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: ['SAVINGS', 'CURRENT', 'CREDIT'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107']
    }
  ]
};

pieChartType: 'pie' = 'pie';

  pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.bankerData) {
      const token = localStorage.getItem('accessToken');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const branchId = this.bankerData.branches.branchId;

      this.http.get<any[]>(`http://localhost:8080/api/banker/getAccountsByBranches/${branchId}`, { headers })
        .subscribe(response => {
          this.accounts = response;
          this.updateChartData();
        }, error => {
          console.error(error);
        });
    }
  }

  updateChartData(): void {
    const typeCounts: Record<'SAVINGS' | 'CURRENT' | 'CREDIT', number> = {
      SAVINGS: 0,
      CURRENT: 0,
      CREDIT: 0
    };

    this.accounts.forEach(account => {
      const type = account.accountType.toUpperCase();
      if (typeCounts[type as keyof typeof typeCounts] !== undefined) {
        typeCounts[type as keyof typeof typeCounts]++;
      }
    });

    this.pieChartData.datasets[0].data = [
      typeCounts['SAVINGS'],
      typeCounts['CURRENT'],
      typeCounts['CREDIT']
    ];
  }
}

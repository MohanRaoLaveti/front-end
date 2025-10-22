import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './withdraw.html',
  styleUrls: ['./withdraw.scss']
})
export class WithdrawComponent implements OnInit {
  @Input() accountId: number = 0;
  token: string = '';
  amount: number = 0;
  statusMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = localStorage.getItem('token')||'';
      console.log('🔐 Token received:', this.token);
    });
  }

  withdrawFunds() {
    if (this.amount <= 0 || !this.accountId || !this.token) {
      this.statusMessage = '⚠️ Enter a valid amount and ensure account ID and token are set.';
      return;
    }

    const url = `https://smartbanking-production.up.railway.app/api/transactions/withdraw/${this.accountId}?amount=${this.amount}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post(url, null, { headers }).subscribe({
      next: (res: any) => {
        this.statusMessage = `✅ ₹${res.amount} withdrawn successfully from account ${res.account.accountNumber}.`;
      },
      error: (err) => {
        console.error('❌ Withdraw failed:', err);
        this.statusMessage = `❌ Withdraw failed: ${err.status} ${err.statusText}`;
      }
    });
  }
}

import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {
  @Input() fromAccountId: number = 0;
  @Input() token: string = localStorage.getItem('token') || '';

  toAccountId: number = 0;
  amount: number = 0;
  statusMessage: string = '';

  constructor(private http: HttpClient) {}

  transff() {
    if (this.amount <= 0 || !this.fromAccountId || !this.toAccountId || !this.token) {
      this.statusMessage = '⚠️ Please enter valid account IDs and amount.';
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `http://localhost:8080/api/transactions/transfer?fromAccountId=${this.fromAccountId}&toAccountId=${this.toAccountId}&amount=${this.amount}`;

    this.http.post(url, null, { headers }).subscribe({
      next: (res: any) => {
        this.statusMessage = `✅ ₹${res[0].amount} transferred successfully from account ${res[0].account.accountNumber} to ${res[1].account.accountNumber}.`;
        alert("Amount transferred successfully");
      },
      error: (err) => {
        console.error('❌ Transfer failed:', err);
        this.statusMessage = `❌ Transfer failed: ${err.status} ${err.statusText}`;
      }
    });
  }
}

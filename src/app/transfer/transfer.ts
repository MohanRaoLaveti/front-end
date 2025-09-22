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
  @Input() fromAccountId: number = 0; // ✅ received from parent
  toAccountId: number = 0;            // entered by user
  amount: number = 0;                 // entered by user

  constructor(private http: HttpClient) {}

@Input() token: string  = localStorage.getItem('token')||'' ;

transff() {
  // alert(this.token)
 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` // ✅ include token
  });

   const url = `http://localhost:8080/api/transactions/transfer?fromAccountId=${this.fromAccountId}&toAccountId=${this.toAccountId}&amount=${this.amount}`;

console.log(typeof(this.fromAccountId))
  this.http.post(url,null,{ headers }).subscribe({
    next: (res) => console.log('✅ Transfer successful:', res),
    error: (err) => console.error('❌ Transfer failed:', err)
  });
}
}
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-totalcustomers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totalcustomers.html',
  styleUrl: './totalcustomers.css'
})
export class Totalcustomers implements OnInit {
  token = localStorage.getItem('admintoken');
  customers: any[] = [];
  accountdata: any = null;
  selectedId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `http://localhost:8080/api/admin/profiles`;

    this.http.get(url, { headers }).subscribe({
      next: (res: any) => {
        this.customers = res;
      },
      error: (err) => {
        console.log("customers not fetched", err);
      }
    });
  }

  fun(id: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `http://localhost:8080/api/admin/${id}`;
    this.http.get(url, { headers }).subscribe({
      next: (res: any) => {
        this.accountdata = res;
        this.selectedId = id;
        console.log(res);
      },
      error: (err) => {
        console.log("Account details fetch failed", err);
      }
    });
  }
}

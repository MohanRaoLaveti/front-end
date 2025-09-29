import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-totalbankers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './totalbankers.html',
  styleUrls: ['./totalbankers.css']
})
export class Totalbankers implements OnInit {
  token = localStorage.getItem('admintoken');
  customers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });


    const url = `http://localhost:8080/api/admin/users`;

    this.http.get(url, { headers}).subscribe({
      next: (res: any) => {
        console.log(res);
        this.customers = res;
      },
      error: (err) => {
        console.log("customers not fetched", err);
      }
    });
  }
}

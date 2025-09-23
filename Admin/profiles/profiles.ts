import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profiles.html',
  styleUrls: ['./profiles.scss']
})
export class AdminDashboardComponent implements OnInit {
  profiles: any[] = [];
  token: string = localStorage.getItem('token') || '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  this.http.get<any[]>('http://localhost:8080/api/admin/profiles', { headers }).subscribe({
    next: (res) => {
      this.profiles = res.reverse();
      console.log('Fetched profiles:', this.profiles); 
    },
    error: (err) => {
      console.error('❌ Failed to fetch profiles:', err);
      this.errorMessage = 'Unable to load customer profiles.';
    }
  });
}

}

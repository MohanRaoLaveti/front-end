import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-kyc',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pending-kyc.html',
  styleUrls: ['./pending-kyc.scss']
})
export class PendingKycComponent implements OnInit {
  pendingProfiles: any[] = [];
  token: string = localStorage.getItem('token') || '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>('http://localhost:8080/api/admin/profiles', { headers }).subscribe({
      next: (res) => {
        this.pendingProfiles = res.filter(p => p.kycStatus === 'PENDING');
        console.log('🕒 Pending KYC profiles:', this.pendingProfiles);
      },
      error: (err) => {
        console.error('❌ Failed to fetch profiles:', err);
        this.errorMessage = 'Unable to load pending KYC profiles.';
      }
    });
  }
}

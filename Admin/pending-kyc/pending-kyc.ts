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
  statusMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>('http://localhost:8080/api/admin/profiles', { headers }).subscribe({
      next: (res) => {
        this.pendingProfiles = res.reverse().filter(profile => profile.kycStatus === 'PENDING');
        console.log('🕒 Pending KYC profiles:', this.pendingProfiles);
      },
      error: (err) => {
        console.error('❌ Failed to fetch profiles:', err);
        this.errorMessage = 'Unable to load pending KYC profiles.';
      }
    });
  }

  approveKyc(id: number): void {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  const url = `http://localhost:8080/api/admin/profiles/${id}/kyc?status=VERIFIED`;

  this.http.put(url, null, { headers }).subscribe({
    next: (res: any) => {
      console.log('✅ KYC updated response:', res);
      this.statusMessage = res?.fullName
        ? `✅ KYC approved for ${res.fullName}.`
        : `✅ KYC approved for profile ID ${id}.`;
      this.pendingProfiles = this.pendingProfiles.filter(p => p.id !== id);
    },
    error: (err) => {
      console.error('❌ Approval failed:', err);
      this.statusMessage = `❌ Failed to approve KYC: ${err.statusText}`;
      
    }
  });
}


  
}

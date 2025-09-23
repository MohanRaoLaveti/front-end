import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.scss']
})
export class CreateAccountComponent implements OnInit {
  userId: number = 0;
  token: string = '';
  accountType: string = '';
  profile: any = null;
  statusMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const profileUrl = `http://localhost:8080/api/customer/profile/${this.userId}`;

    this.http.get(profileUrl, { headers }).subscribe({
      next: (res: any) => {
        this.profile = res;
        if (res.kycStatus !== 'VERIFIED') {
          this.statusMessage = '🕒 KYC not approved yet. Account creation is disabled.';
        }
      },
      error: () => {
        this.statusMessage = '❌ Failed to fetch profile.';
      }
    });
  }

  createAccount() {
    if (!this.profile || this.profile.kycStatus !== 'VERIFIED') {
      alert('KYC not approved. Cannot create account.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const url = `http://localhost:8080/api/accounts/open/${this.userId}?accountType=${this.accountType}`;

    this.http.post(url, null, { headers }).subscribe({
      next: (res: any) => {
        alert('✅ Account created! Account Number: ' + res.accountNumber);
        this.statusMessage = '✅ Account created successfully.';
      },
      error: () => {
        this.statusMessage = '❌ Account creation failed.';
      }
    });
  }
}

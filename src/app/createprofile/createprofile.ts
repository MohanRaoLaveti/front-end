import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createprofile.html',
  styleUrls: ['./createprofile.scss']
})
export class Createprofile implements OnInit {
  profile = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    dateOfBirth: '',
    kycStatus: 'PENDING',
    user: {
      id: 0
    }
  };

  token: string = '';
  accountType = '';
  submissionMessage: string = '';
  pollingActive: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const tokenParam = this.route.snapshot.queryParamMap.get('token');

    this.profile.user.id = userId;
    this.token = tokenParam ?? '';
  }

  onSubmit() {
    const profileUrl = `http://localhost:8080/api/customer/profile/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post(profileUrl, this.profile, { headers }).subscribe({
      next: () => {
        this.submissionMessage = '✅ Your details are submitted. KYC in progress.';
        this.startKycPolling(headers);
      },
      error: (err) => {
        console.error('❌ Profile creation failed:', err);
        alert('Failed to create profile.');
      }
    });
  }

  private startKycPolling(headers: HttpHeaders) {
    if (this.pollingActive) return;
    this.pollingActive = true;

    const url = `http://localhost:8080/api/customer/profile/${this.profile.user.id}`;
    const intervalId = setInterval(() => {
      this.http.get(url, { headers }).subscribe({
        next: (res1: any) => {
          console.log("✅ Fetched customer details:", res1);

          if (res1.kycStatus === "APPROVED") {
            alert("🎉 KYC Approved!");
            clearInterval(intervalId);
            this.pollingActive = false;

            const openAccountUrl = `http://localhost:8080/api/accounts/open/${this.profile.user.id}/COIM05678901?accountType=${this.accountType}`;
            this.http.post(openAccountUrl, null, { headers }).subscribe({
              next: (ress: any) => {
                console.log("✅ Account opened:", ress);
                this.router.navigate(['/app-userprofile', this.profile.user.id]);
              },
              error: (e) => {
                console.error("❌ Error opening account:", e);
              }
            });
          }
        },
        error: (err) => {
          console.error("❌ Error fetching profile:", err);
        }
      });
    }, 30000);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const tokenParam = this.route.snapshot.queryParamMap.get('token');

    this.profile.user.id = userId;
    this.token = tokenParam ?? '';

    console.log('🆔 User ID:', this.profile.user.id);
    console.log('🔐 Token:', this.token);
  }
meythod(){}
  onSubmit() {
    const profileUrl = 'http://localhost:8080/api/customer/profile/create';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    console.log('📦 Creating profile:', this.profile);

    this.http.post(profileUrl, this.profile, { headers }).subscribe({
      next: () => {
        const openAccountUrl = `http://localhost:8080/api/accounts/open/${this.profile.user.id}?accountType=${this.accountType}`;
this.meythod();
        this.http.post(openAccountUrl, null, { headers }).subscribe({
          next: (accountResponse: any) => {
            console.log('🏦 Account opened:', accountResponse);
            alert('Account opened successfully! Account Number: ' + accountResponse.accountNumber);

            this.router.navigate(['/app-userprofile', this.profile.user.id], {
              queryParams: { accountType: this.accountType ,token:this.token}
            });
          },
          error: (error) => {
            console.error('❌ Account opening failed:', error);
            alert('Failed to open account.');
          }
        });
      },
      error: (error) => {
        console.error('❌ Profile creation failed:', error);
        alert('Failed to create profile.');
      }
    });
  }
}

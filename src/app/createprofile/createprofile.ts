import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const tokenParam = this.route.snapshot.queryParamMap.get('token');

    this.profile.user.id = userId;
    this.token = tokenParam ?? '';

    console.log('🆔 User ID:', this.profile.user.id);
    console.log('🔐 Token:', this.token);
  }

  onSubmit() {
    const url = 'http://localhost:8080/api/customer/profile/create';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    console.log('📦 Payload:', this.profile);

    this.http.post(url, this.profile, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Profile created:', response);
        alert('Profile created successfully!');
      },
      error: (error) => {
        console.error('❌ Profile creation failed:', error);
        alert('Failed to create profile.');
      }
    });
  }
}

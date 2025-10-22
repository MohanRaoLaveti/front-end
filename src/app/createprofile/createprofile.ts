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
    const profileUrl = `https://smartbanking-production.up.railway.app/api/customer/profile/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

  this.http.post(profileUrl, this.profile, { headers }).subscribe({
    next: (res) => {
console.log("created profile");
localStorage.setItem("actype",this.accountType);
this.router.navigate(['/kyc']);
      
    },
    error: (er) => {
      console.error('❌ Profile creation failed:', er);
      alert('Failed to create profile.');
    }
  });
}
}
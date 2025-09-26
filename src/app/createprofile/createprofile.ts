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
    console.log(this.profile);
  }
 onSubmit() {
  const profileUrl = `http://localhost:8080/api/customer/profile/create`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  this.http.post(profileUrl, this.profile, { headers }).subscribe({
    next: (res) => {
      const url = `http://localhost:8080/api/customer/profile/${this.profile.user.id}`;
      
      const intervalId = setInterval(() => {
        this.http.get(url, { headers }).subscribe({
          next: (res1: any) => {
            console.log("✅ Fetched customer details:", res1);

            if (res1.kycStatus === "APPROVED") {
              alert("🎉 KYC Approved!");
    const openAccountUrl = `http://localhost:8080/api/accounts/open/${this.profile.user.id}/COIM05678901?accountType=${this.accountType}`;
    this.http.post(openAccountUrl,null,{headers}).subscribe({
      next:(ress:any)=>{console.log(ress);
        this.router.navigate(['/app-userprofile',this.profile.user.id])
      },error:(e)=>{console.log(e);}
    })

              clearInterval(intervalId);
              

            }
          },
          error: (err) => {
            console.error("❌ Error fetching profile:", err);
            alert("Error fetching profile.");
          }
        });
      }, 15000);
    },
    error: (er) => {
      console.error('❌ Profile creation failed:', er);
      alert('Failed to create profile.');
    }
  });
}
}
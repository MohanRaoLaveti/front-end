 
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-viewprofile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './viewprofile.html',
  styleUrls: ['./viewprofile.scss']
})
export class Viewprofile implements OnInit {
  userId: number = 0;
  accountType: string = '';
  token: string = '';
  profile: any = null;
 
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}
 pro() {
  return this.profile ? [this.profile] : [];
}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
 
    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
      this.token = params['token'] || '';
 
      if (!this.userId || !this.token) {
        alert(this.userId);
        alert('Invalid user ID or token');
        return;
      }
 
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
 
      const url = `http://localhost:8080/api/customer/profile/${this.userId}`;
 
      this.http.get(url, { headers }).subscribe({
        next: (response: any) => {
          console.log(response)
          this.profile = response;
        },
        error: (error) => {
          console.error('❌ Failed to fetch profile:', error);
          alert('Failed to load profile.');
          console.log(this.userId);
        }
      });
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './userprofile.html',
  styleUrls: ['./userprofile.scss'] // ✅ corrected from styleUrl to styleUrls
})
export class Userprofile implements OnInit {
  userId: number = 0;
  accountType: string = '';
  accountdata: any;
  token: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
      this.token = params['token'] || '';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const url = `http://localhost:8080/api/accounts/${this.userId}`;

      this.http.get(url, { headers }).subscribe({
        next: (res) => {
          this.accountdata = res;
          console.log('📥 Account Data:', res);
        },
        error: (err) => {
          console.error('❌ Failed to fetch account data:', err);}
      });

      console.log('🧾 User ID:', this.userId);
      console.log('🏦 Account Type:', this.accountType);
    });
  }
}

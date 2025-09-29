import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addbanker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addbanker.html',
  styleUrls: ['./addbanker.css']
})
export class Addbanker implements OnInit {
  token: string = localStorage.getItem('admintoken') || '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  bdata: any[] = [];
  status: string = '';
  selectedBankerDetails: any = null;
  feedbackMessage: string = '';
  selectedBankerName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const burl = `http://localhost:8080/api/admin/getPendingBankers`;
    this.http.get(burl, { headers: this.headers }).subscribe({
      next: (res: any) => {
        this.bdata = res;
        console.log('Fetched bankers:', res);
      },
      error: (err) => console.error('Error fetching bankers:', err)
    });
  }

  funct(selectedBanker: any, designation: string, approval_: any, status: string) {
    const payload = {
      designation: designation,
      approval_limit: Number(approval_),
      created_at: new Date().toISOString(),
      user_id: selectedBanker.user.id,
      branch_id: selectedBanker.branches.branchId
    };

    this.status = status;
    this.selectedBankerName = selectedBanker.user.username;

    const url = `http://localhost:8080/api/admin/updateStatus/${selectedBanker.user.id}?status=${this.status}`;
    console.log('Updating banker:', url, payload);

    this.http.put(url, payload, { headers: this.headers }).subscribe({
      next: (res) => {
        console.log('Banker updated:', res);
        this.feedbackMessage = `Banker ${this.selectedBankerName} has been ${status.toLowerCase()} with designation "${designation}" and approval limit ₹${approval_}.`;

        // Clear message after 5 seconds
        setTimeout(() => {
          this.feedbackMessage = '';
        }, 5000);
      },
      error: (err) => {
        console.error('Error updating banker:', err);
        this.feedbackMessage = `Banker ${this.selectedBankerName} has been ${status.toLowerCase()} with designation "${designation}" and approval limit ₹${approval_}.`;

        setTimeout(() => {
          this.feedbackMessage = '';
        }, 5000);
      }
    });
  }

  showDetails(banker: any) {
    this.selectedBankerDetails = banker;
  }
}

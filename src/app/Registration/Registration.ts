import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Registration.html',
  styleUrls: ['./Registration.scss']
})
export class Registration {
  username: string = '';
  password: string = '';
  role: string = 'CUSTOMER';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    const url = 'http://localhost:8080/api/auth/register';
    const body = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    if (!this.username.trim()) {
      alert('Username is required');
      return;
    }

    if (!this.password.trim()) {
      alert('Password is required');
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, body, { headers }).subscribe({
      next: (response: any) => {
        if (response.id && response.id !== -1) {
          console.log('✅ Registration successful:', response);
          alert('Registered successfully. User ID: ' + response.id);

          // Store token if needed
          localStorage.setItem('token', response.token);

          // Navigate to profile creation
          this.router.navigate(['/customer-profile', response.id], {
            queryParams: { token: response.token }
          });
        } else {
          alert('⚠️ Registration failed: ' + response.message);
        }
      },
      error: (error) => {
        console.error('❌ Registration failed:', error);
        alert('Something went wrong during registration.');
      }
    });
  }
}

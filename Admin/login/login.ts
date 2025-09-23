import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  statusMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin() {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/auth/login', payload).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.statusMessage = '✅ Login successful. Redirecting...';
        setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        this.statusMessage = '❌ Invalid credentials or unauthorized access.';
      }
    });
  }
}

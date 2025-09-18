import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],imports:[CommonModule,FormsModule],
  standalone:true
})
export class LoginComponent {
  username = '';
  password = '';
  statusMessage = '';

  constructor(private http: HttpClient) {}
saveDataAndLogin() {
  const userData = { username: this.username, password: this.password };

  this.http.post('http://localhost:8080/api/auth/login', userData).subscribe({
    next: (res: any) => {
      // ✅ Check if login response contains a valid token or success flag
      if (res && res.token ) {
        this.statusMessage = '✅ You are logged in!';
        localStorage.setItem('authToken', res.token);
        alert(res);


        // 👉 Proceed to next step (e.g., navigate to dashboard)
        // this.router.navigate(['/dashboard']); // Uncomment if using Angular Router
      } else {
        this.statusMessage = '⚠️ Login response invalid. Please check credentials.';
        alert("sorry you are not authorzed");
      }
    },
    error: (err) => {
      if (err.status === 401) {
        this.statusMessage = '❌ Invalid username or password.';
                alert("sorry you are not authorzed");

      } else {
        this.statusMessage = '❌ Login failed due to server error.';
                alert("sorry you are not authorzed");

      }
    }
  });
}

  }
import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Adminpro } from '../adminpro/adminpro';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterOutlet], // ✅ Corrected
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  statusMessage = '';

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {}
saveDataAndLogin() {
  const userData = { username: this.username, password: this.password };

  this.http.post('http://localhost:8080/api/auth/login', userData).subscribe({
    next: (res: any) => {
      console.log(res);
      console.log(res.token);
      localStorage.setItem('admintoken',res.token);
     this.router.navigate([`/adminpro`])
  
}});}
}
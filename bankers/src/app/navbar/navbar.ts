import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {


constructor(private router: Router){}
  loginOut(){
    localStorage.removeItem('accessToken');
this.router.navigate(['/login'])
  }
}

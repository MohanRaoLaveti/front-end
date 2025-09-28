import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
    return false;
  }
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
   if ( role !== 'BANKER') {
      this.router.navigate(['/login']);
      alert("No banker is found")
      return false;
    }
    else if(!token){
      this.router.navigate(['/login']);
      alert("Not valid Token")
    }


    return true;
  }
}

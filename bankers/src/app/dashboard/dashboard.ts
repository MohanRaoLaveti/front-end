import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatAll } from 'rxjs';
import { KycUpdates } from "../kyc-updates/kyc-updates";
import { CommonModule } from '@angular/common';
import { SearchAccount } from "../search-account/search-account";
@Component({
  selector: 'app-dashboard',
  imports: [KycUpdates, CommonModule, SearchAccount],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  loginData: any;
  userToken: string | null = null;
  id!:number
  display=""
  constructor(private router: Router) {
    // Access the state immediately in the constructor or use in ngOnInit
    // history.state is a standard browser API object
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.loginData = history.state.loginResponse;
    }
  }

    ngOnInit(): void {
    if (this.loginData) {
      console.log('Data received from login:', this.loginData);
      this.userToken = this.loginData.token;
      this.id=this.loginData.id;
      // You can now use the data to initialize the dashboard
    } else {
      console.warn('No login state data found. User may have navigated directly.');
    }
  }

  displayFunction(key:string){
      this.display=key;
      console.log(this.display)
  }

  logOut(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login'])
  }
}

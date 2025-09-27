import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KycUpdates } from "../kyc-updates/kyc-updates";
import { CommonModule } from '@angular/common';
import { SearchAccount } from "../search-account/search-account";
import { Bankerdashboard } from "../bankerdashboard/bankerdashboard";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  imports: [KycUpdates, CommonModule, SearchAccount, Bankerdashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  loginData: any;
  userToken: string | null = null;
  id!:number
  display=""
  banker:any;
  constructor(private router: Router,private http:HttpClient) {
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
      //BANKERDATA
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`
    });
      this.http.get(`http://localhost:8080/api/banker/bankerData/${this.id}`, {headers})
      .subscribe({
        next: (response: any) => {
          
            this.banker=response;
            console.log(this.banker);
            },
        error: (error: any) => {
          console.error("Login failed:", error); 
        }
      });
      
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

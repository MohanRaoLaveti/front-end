import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Viewprofile } from '../viewprofile/viewprofile';
import { Transfer } from '../transfer/transfer';
import { DepositComponent } from '../deposit/deposit';
import { Transactions } from '../transactions/transactions';
import { WithdrawComponent } from "../withdraw/withdraw";

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Viewprofile, Transfer, DepositComponent, Transactions, WithdrawComponent],
  templateUrl: './userprofile.html',
  styleUrls: ['./userprofile.scss']
})
export class Userprofile implements OnInit {

  userId: number = 0;
  accountType: string = '';
  accountdata: any;
  token: string = '';
  viewdetails: any[] = [];
  showProfile = false;
 showTransfer=false;
 showDeposit=false;
 showTransactions=false;
  showWithdraw = false;
  display=false;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
      this.token = localStorage.getItem('token')||'';
localStorage.setItem('token', this.token);
console.log(localStorage.getItem('token'));

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const url = `http://localhost:8080/api/accounts/${this.userId}`;

      this.http.get(url, {headers}).subscribe({
        next: (res:any) => {
          this.accountdata = res;

          console.log("hello fetched with response");
        },
        error: (err) => {
          
          alert("err")
          console.error('❌ KYC PENDING', err);
        }
      });
    });
  }

  loadProfile() {
    this.showProfile = true;
               this.showTransfer=false;
               this.showDeposit=false;
    this.showTransactions=false;
     this.showWithdraw = false;

  }
  loadTransactions(){
this.showTransactions=true;
     this.showTransfer=false;
        this.showProfile=false;
        this.showDeposit=false;
         this.showWithdraw = false;
  }
  deposit(){
this.showTransfer=false;
        this.showProfile=false;
        this.showDeposit=true;
        this.showTransactions=false;
                 this.showWithdraw = false;

  }
  Transfer(){
        this.showTransfer=true;
        this.showProfile=false;
        this.showDeposit=false;
        this.showTransactions=false;
                 this.showWithdraw = false;

  }
  withdraw() {
    this.showProfile = false;
    this.showTransfer = false;
    this.showDeposit = false;
    this.showWithdraw = true;
    this.showTransactions = false;
  }

  vie(view: Viewprofile) {
    const profile = view.pro();
    if (profile) {
      this.viewdetails = [profile];
    } else {
      alert('Profile not loaded yet. Please wait a moment.');
    }
  }
}

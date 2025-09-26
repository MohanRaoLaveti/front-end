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
import { TransactionChartComponent } from "../transaction-chart/transaction-chart";
import { RecentTransactionsChartComponent } from '../recent-transactions-chart/recent-transactions-chart';
import { BalanceTrendChartComponent } from '../balance-trend-chart/balance-trend-chart';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TransactionChartComponent,
    RecentTransactionsChartComponent,
    BalanceTrendChartComponent
  ],
  templateUrl: './userprofile.html',
  styleUrls: ['./userprofile.scss']
})
export class Userprofile implements OnInit {
  recentTransactions = [
    { date: 'Sep 20', amount: 5000 },
    { date: 'Sep 21', amount: -1200 },
    { date: 'Sep 22', amount: 3000 },
    { date: 'Sep 23', amount: -800 },
    { date: 'Sep 24', amount: 1500 }
  ];

  balanceHistory = [
    { date: 'Sep 20', balance: 10000 },
    { date: 'Sep 21', balance: 8800 },
    { date: 'Sep 22', balance: 11800 },
    { date: 'Sep 23', balance: 11000 },
    { date: 'Sep 24', balance: 12500 }
  ];

  policies: string[] = [
    "✅ All transactions above ₹50,000 require OTP verification.",
    "🔒 User data is encrypted using AES-256 standards.",
    "📅 Accounts inactive for 12 months may be flagged for review.",
    "💳 Debit card PIN must be updated every 6 months.",
    "📞 24/7 fraud reporting hotline is available for all users.",
    "🛡️ SmartBanking complies with RBI digital banking guidelines.",
    "📄 Loan approvals require verified income documentation.",
    "🔐 Passwords must be at least 8 characters with a special symbol.",
    "📍 Branch visits are optional for most account services.",
    "📧 Email alerts are sent for every transaction above ₹10,000."
  ];

  userId: number = 0;
  accountType: string = '';
  accountdata: any;
  token: string = '';
  viewdetails: any[] = [];

  showProfile = false;
  showTransfer = false;
  showDeposit = false;
  showTransactions = false;
  showWithdraw = false;
  showPolicies = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
localStorage.setItem('userid',this.userId.toString());
    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
      this.token = localStorage.getItem('token')||'';
localStorage.setItem('token', this.token);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const url = `http://localhost:8080/api/accounts/${this.userId}`;

      this.http.get(url, { headers }).subscribe({
        next: (res: any) => {
          this.accountdata = res;
        
        },
        error: (err) => {
          alert("Error fetching account data");
          console.error('❌ KYC PENDING', err);
        }
      });
    });
  }

  resetViews() {
    this.showProfile = false;
    this.showTransfer = false;
    this.showDeposit = false;
    this.showTransactions = false;
    this.showWithdraw = false;
    this.showPolicies = false;
  }

  loadProfile() {
    this.resetViews();
    this.showProfile = true;
  }

  loadTransactions() {
    this.resetViews();
    this.showTransactions = true;
  }

  deposit() {
    this.resetViews();
    this.showDeposit = true;
  }

  Transfer() {
    this.resetViews();
    this.showTransfer = true;
  }

  withdraw() {
    this.resetViews();
    this.showWithdraw = true;
  }

  loadPolicies() {
    this.resetViews();
    this.showPolicies = true;
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

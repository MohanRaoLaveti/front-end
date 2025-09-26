import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-account',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-account.html',
  styleUrl: './search-account.css'
})
export class SearchAccount {

  accountNumber:string=''
  display=false;
  account:any;

  constructor(private http:HttpClient){}

  searchAccount(){
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });
    this.http.get<any[]>(`http://localhost:8080/api/banker/account/${this.accountNumber}`,{headers}).subscribe({
      next: data => {
        this.account=data;

        this.display=true;
      },
      error: err => console.error('Failed to load KYC pendings', err)
    });
  }
}

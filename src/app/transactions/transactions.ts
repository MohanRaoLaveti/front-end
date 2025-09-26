import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {
@Input() accountId=0;
tdata:any[]=[];
token=localStorage.getItem('token');

constructor(private http:HttpClient){}
ngOnInit(){
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` // ✅ include token
  });
 const url=`http://localhost:8080/api/transactions/${this.accountId}`;
this.http.get(url,{headers}).subscribe({
  next:(res:any)=>{
    this.tdata=res;
    console.log(this.tdata);
  },error:(err)=>{
    console.log(err);
  }
})
}
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';

@Component({
  selector: 'app-pending',
  imports: [CommonModule],
  templateUrl: './pending.html',
  styleUrl: './pending.css'
})
export class Pending implements OnInit {
 @Input() token:string=localStorage.getItem('admintoken')||'';
  pdata:any[]=[];
constructor(private http:HttpClient){}
ngOnInit(){
 const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  const url="http://localhost:8080/api/admin/profiles";
  console.log(this.token);
  this.http.get(url,{headers}).subscribe({next:(res:any)=>{console.log(res);
    this.pdata=res;
    this.pdata.map((i)=>{if(i.kycStatus==="PENDING"){
      const urll=`http://localhost:8080/api/admin/profiles/${i.id}/kyc?status=APPROVED`;
      this.http.put(urll,{headers}).subscribe({next:(re)=>{console.log(re)}});
    }})
  }});

}
}

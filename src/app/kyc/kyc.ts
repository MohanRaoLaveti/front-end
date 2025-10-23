import { HttpClient, HttpHeaders } from '@angular/common/http';
import { booleanAttribute, Component } from '@angular/core';
import { RoundedRect } from 'chart.js/types/geometric';
import {  Router, RouterOutlet } from '@angular/router';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-kyc',
  imports: [RouterOutlet],
  templateUrl: './kyc.html',
  styleUrl: './kyc.scss'
})
export class Kyc {
  token:string=localStorage.getItem('token')||'';
  acctype:String=localStorage.getItem("actype")||'';
  approved:Boolean=false;
  username:String=localStorage.getItem("username")||'';
  constructor(private http:HttpClient,private router:Router){}
ngOnInit(){
   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

  
          const url = `https://smartbanking-production.up.railway.app/api/customer/profile/user/${this.username}`;

        this.http.get(url, { headers }).subscribe({
          next: (res1: any) => {
            console.log("✅ Fetched customer details:", res1);
            if(this.approved!=true){
            if (res1.kycStatus === "APPROVED") {
              this.http.get(`https://smartbanking-production.up.railway.app/api/accounts/${res1.user.id}`,{headers}).subscribe({
                next:(ree:any)=>{
                    if(ree.accountNumber!==""){
        this.router.navigate(['/app-userprofile',res1.user.id]);

                    }

                }
              });



    const openAccountUrl = `https://smartbanking-production.up.railway.app/api/accounts/open/${res1.user.id}/COIM05678901?accountType=${this.acctype}`;
    this.http.post(openAccountUrl,null,{headers}).subscribe({
      next:(ress:any)=>{console.log(ress);
        this.router.navigate(['/app-userprofile',res1.user.id]);
      },error:(e)=>{console.log(e);}
    })

              
              

            }
          }},
          error: (err) => {
            console.error("❌ Error fetching profile:", err);
            alert("Error fetching profile.");
          }
        });
      }
}


import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Addbanker } from '../addbanker/addbanker';
import { Totalbankers } from '../totalbankers/totalbankers';
import { Totalcustomers } from '../totalcustomers/totalcustomers';


@Component({
  selector: 'app-adminpro',
  standalone:true,
  imports: [RouterOutlet,CommonModule,Addbanker,Totalbankers,Totalcustomers],
  templateUrl: './adminpro.html',
  styleUrl: './adminpro.css'
})
export class Adminpro {
pending:boolean=false;
totalcustomers=false;
totalbankers=false;
constructor(private http:HttpClient){};

fun(){
  this.pending=true;
  this.totalcustomers=false;
   this.totalbankers=false;
}
fun1(){
this.pending=false;
  this.totalcustomers=true;
   this.totalbankers=false;}
 fun2(){
this.pending=false;
  this.totalcustomers=false;
   this.totalbankers=true;}
} 


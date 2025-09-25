import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Pending } from '../pending/pending';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminpro',
  standalone:true,
  imports: [RouterOutlet,Pending,CommonModule],
  templateUrl: './adminpro.html',
  styleUrl: './adminpro.css'
})
export class Adminpro {
pending:boolean=false;

constructor(){}
fun(){
  this.pending=true;
}
}

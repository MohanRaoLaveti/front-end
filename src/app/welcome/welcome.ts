import { Component } from '@angular/core';
import { LoginComponent } from '../login/login';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone:true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

}

// app.routes.ts
import { Routes } from '@angular/router';

import { Registration } from './Registration/Registration';
import { Welcome } from './welcome/welcome';
import { LoginComponent } from './login/login';
import { Createprofile } from './createprofile/createprofile';
import { Userprofile } from './userprofile/userprofile';

export const routes: Routes = [
  { path: 'Registration', component: Registration },
  { path: '', component: Welcome },
  { path: 'login', component: LoginComponent },
  { path: 'customer-profile/:id', component: Createprofile },
  { path: 'app-userprofile/:id', component: Userprofile } ,
  { path: 'profile', component: Userprofile } ,
  // ✅ updated
];

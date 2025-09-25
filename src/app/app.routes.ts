import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Welcome } from './welcome/welcome';
import { Adminpro } from './adminpro/adminpro';
import { Pending } from './pending/pending';

export const routes: Routes = [{
        path:'login',component:LoginComponent
    },{
        path:'',component:Welcome
    },
    {path:'adminpro',component:Adminpro},
    {path:'pending',component:Pending}
];

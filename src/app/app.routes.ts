import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Adminpro } from './adminpro/adminpro';
import { Pending } from './pending/pending';

export const routes: Routes = [{
        path:'login',component:LoginComponent
    },{
        path:'',component:LoginComponent
    },
    {path:'adminpro',component:Adminpro},
    {path:'pending',component:Pending},
];

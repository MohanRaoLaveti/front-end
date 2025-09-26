import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { AuthGuard } from '../AuthGuard';
import { Register } from './register/register';

export const routes: Routes = [
    { 
    path: '', 
    component: Login 
    },

    {
        path:'dashboard',
        component:Dashboard,
        canActivate:[AuthGuard]
    }
    ,{
        path:'login',
        component:Login
    },
    {
        path:'register',
        component:Register
    }

];

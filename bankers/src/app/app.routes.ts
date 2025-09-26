import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { AuthGuard } from '../AuthGuard';

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
    }

];

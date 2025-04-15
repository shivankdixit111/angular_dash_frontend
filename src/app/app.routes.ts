import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [ 
    {
        path: '', component: HomeComponent
    },
    {
        path: 'user/signup', component: SignupComponent
    },
    {
        path: 'user/login', component: LoginComponent
    },
    {
        path: 'user/getProfile', component: ProfileComponent, canActivate:[authGuard]
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [authGuard]
    }, 
    {
        path: 'admin/updateUser/:id', component: EditAdminComponent, canActivate: [authGuard]
    },  
    {
        path: '**', component: ErrorComponent
    },  
];

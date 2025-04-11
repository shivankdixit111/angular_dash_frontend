import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { HomeComponent } from './components/home/home.component';

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
        path: 'user/getProfile', component: ProfileComponent
    },
    {
        path: 'admin', component: AdminComponent
    }, 
    {
        path: 'admin/updateUser/:id', component: EditAdminComponent
    },  
];

import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageBlogsComponent } from './pages/manage-blogs/manage-blogs.component';
import { authGuard } from './services/AuthGuard';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'manage-blogs', component: ManageBlogsComponent, canActivate: [authGuard] },
];

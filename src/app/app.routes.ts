import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageBlogsComponent } from './pages/manage-blogs/manage-blogs.component';
import { authGuard } from './services/AuthGuard';
import { BlogViewComponent } from './pages/blog-view/blog-view.component';
import { DisconnectComponent } from './pages/disconnect/disconnect.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'disconnect', component: DisconnectComponent },
    { path: 'blog/:slug', component: BlogViewComponent },
    { path: 'manage-blogs', component: ManageBlogsComponent, canActivate: [authGuard] },
];

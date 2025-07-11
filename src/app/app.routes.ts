import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageBlogsComponent } from './pages/manage-blogs/manage-blogs.component';
import { authGuard } from './services/AuthGuard';
import { BlogViewComponent } from './pages/blog-view/blog-view.component';
import { DisconnectComponent } from './pages/disconnect/disconnect.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'disconnect', component: DisconnectComponent },
    { path: 'blog/:slug', component: BlogViewComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'manage-blogs',
        canActivate: [authGuard],
        children: [
            { path: '', component: ManageBlogsComponent },
            { path: 'new', component: CreateBlogComponent },
            { path: 'edit/:id', component: EditBlogComponent }
        ]
    },
];

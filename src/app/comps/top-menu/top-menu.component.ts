import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export class MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

  title = 'Triedge';

  items: MenuItem[] = [
    { title: 'Home', link: '/' },
    { title: 'Blog', link: '/blog' },
    { title: 'Login', link: '/login' },
  ];
}

import { Component } from '@angular/core';

export class MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

  title = 'Triedge';

  items: MenuItem[] = [
    { title: 'Home', link: '/' },
    { title: 'Blog', link: '/blog' },
  ];
}

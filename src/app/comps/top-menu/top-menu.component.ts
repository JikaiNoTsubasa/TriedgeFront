import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/UserService';

export class MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

  userService = inject(UserService);

  title = 'Triedge';

}

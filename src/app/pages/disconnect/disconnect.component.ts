import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-disconnect',
  imports: [],
  templateUrl: './disconnect.component.html',
  styleUrl: './disconnect.component.scss'
})
export class DisconnectComponent {

  authService = inject(AuthService);

  ngOnInit(){
    this.authService.logout();
  }
}

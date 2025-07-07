import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TriService } from '../../services/TriService';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  triService = inject(TriService);

  error: string | null = null;
  message: string | null = null;

  password: string | null = null;

  onUpdatePassword(){
    if (this.password != null){
      this.triService.updateMyPassword(this.password).subscribe({
        next: () => {
          this.showMessageTimed('Password updated');
        },
        error: (e) => {
          this.error = e.error.message;
        }
      });
    }
  }

  showMessageTimed(mess: string){
    this.message = mess;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}

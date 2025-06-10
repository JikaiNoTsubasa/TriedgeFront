import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TriService } from '../../services/TriService';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  triService = inject(TriService);
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UserService);

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLoginInProgress: boolean = false;
  error: string = '';

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoginInProgress = true;
    try{
      let result : boolean = await this.authService.login(this.loginForm.value.login ?? '', this.loginForm.value.password ?? '');
      let payload = this.authService.getUserFromToken();
      if (payload) this.userService.setUser(await firstValueFrom(this.triService.getUser(payload.userid)));
      this.isLoginInProgress = false;
      if (result) this.router.navigate(['manage-blogs']);

    }catch(e){
      this.isLoginInProgress = false;
      this.error = (e as Error).message;
    }
    }
  }
}

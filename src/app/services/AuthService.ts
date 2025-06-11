import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { TriService } from "./TriService";
import { JwtPayload } from "../models/DTO/JwtPayload";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    triService = inject(TriService);
    router = inject(Router);


    async login(login: string, password: string) {
        let res = await firstValueFrom(this.triService.login(login, password));
        localStorage.setItem('tri-token', res.token);
        return true;
    }

    async getLoggedUser(id: number) {
        return await firstValueFrom(this.triService.getUser(id));
    }
    
    logout() {
        localStorage.removeItem('tri-token');
        this.router.navigate(['']);
    }

    getUserFromToken() {
        const token = localStorage.getItem('tri-token');
        if (!token) return null;
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded;
          } catch (e) {
            console.error('Token decoding failed', e);
            return null;
          }
    }

    isLoggedIn(): boolean {
        const payload = this.getUserFromToken();
        return payload != null && Date.now() < payload.exp * 1000;
    }
}
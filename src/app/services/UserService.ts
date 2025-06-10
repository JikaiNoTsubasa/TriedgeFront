import { Injectable } from "@angular/core";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() { }

    private user: User | null;

    setUser(user: User) {
        this.user = user;
    }

    getUser(): User | null {
        return this.user;
    }

    clear() {
        this.user = null;
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Blog } from "../models/Blog";
import { ResponseLogin } from "../models/DTO/ResponseLogin";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class TriService {
    constructor(private http: HttpClient) { }

    getEnvUrl(): string{
        return sessionStorage.getItem('url') ?? environment.apiUrl;
    }

    login(login: string, password: string): Observable<ResponseLogin> {
        let data = new FormData();
        data.append('login', login);
        data.append('password', password);
        return this.http.post<ResponseLogin>(`${this.getEnvUrl()}/api/auth/login`, data);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.getEnvUrl()}/api/user/${id}`);
    }

    fetchBlogs():Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.getEnvUrl()}/api/public/blogs`);
    }
}
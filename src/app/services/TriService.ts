import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TriService {
    constructor(private http: HttpClient) { }

    url: string = 'https://blog.triedge.fr';

    getEnvUrl(): string{
        return sessionStorage.getItem('url') ?? environment.apiUrl;
    }

    fetchBlogs() {
        return this.http.get(`${this.url}/api/public/blogs`);
    }
}
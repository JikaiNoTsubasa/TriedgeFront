import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Blog } from "../models/Blog";

@Injectable({
    providedIn: 'root'
})
export class TriService {
    constructor(private http: HttpClient) { }

    getEnvUrl(): string{
        return sessionStorage.getItem('url') ?? environment.apiUrl;
    }

    fetchBlogs():Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.getEnvUrl()}/api/public/blogs`);
    }
}
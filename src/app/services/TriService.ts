import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Blog } from "../models/Blog";
import { ResponseLogin } from "../models/DTO/ResponseLogin";
import { User } from "../models/User";
import { Category } from "../models/Category";

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

    fetchBlogBySlug(slug: string):Observable<Blog> {
        return this.http.get<Blog>(`${this.getEnvUrl()}/api/blog/${slug}`);
    }

    fetchMyBlogs():Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.getEnvUrl()}/api/myblogs`);
    }

    fetchMyBlogById(id: number):Observable<Blog> {
        return this.http.get<Blog>(`${this.getEnvUrl()}/api/myblog/${id}`);
    }

    createBlog(title: string, content: string, image?: string, categories?: number[]): Observable<Blog> {
        let data: any = {};
        data.title = title;
        data.content = content;
        if (image){
            data.image = image;
        }
        if (categories){
            data.categoryIds = categories; //.join(',');
        }
        return this.http.post<Blog>(`${this.getEnvUrl()}/api/blog`, data);
    }

    updateMyBlog(id: number, title: string, content: string, image?: string, categories?: number[]): Observable<Blog> {
        let data: any = {};
        data.title = title;
        data.content = content;
        if (image){
            data.image = image;
        }
        if (categories){
            data.categoryIds = categories;
        }
        return this.http.put<Blog>(`${this.getEnvUrl()}/api/myblog/${id}`, data);
    }

    fetchAllCategories():Observable<Category[]> {
        return this.http.get<Category[]>(`${this.getEnvUrl()}/api/categories`);
    }

    createCategory(name: string): Observable<Category> {
        let data: any = {};
        data.name = name;
        return this.http.post<Category>(`${this.getEnvUrl()}/api/category`, data);
    }
}
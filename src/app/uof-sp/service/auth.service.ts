import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseApiUrl: string = "http://127.0.0.1:8394";
    // baseApiUrl: string = "http://10.0.99.68:8000";

    constructor(private http: HttpClient) { }

    uofLogin(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${this.baseApiUrl}/api/UofAuth/login`, data, { headers });
    }
}

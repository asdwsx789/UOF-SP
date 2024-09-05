import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo, UserJobList } from '@uofmodule/user-job.module';

@Injectable({
    providedIn: 'root'
})
export class UserJobManageService {

    baseApiUrl: string = "http://127.0.0.1:8394";
    // baseApiUrl: string = "http://10.0.99.68:8000";

    constructor(private http: HttpClient) { }

    getUofUserInfo(data: any): Observable<UserInfo> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<UserInfo>(`${this.baseApiUrl}/api/UofJobManage/GetUofUserInfo`, data, { headers });
    }

    getUofUserJobList(data: any): Observable<UserJobList[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<UserJobList[]>(`${this.baseApiUrl}/api/UofJobManage/GetUofUserJobList`, data, { headers });
    }

    copyUofJobToUser(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${this.baseApiUrl}/api/UofJobManage/CopyUofJobToUser`, data, { headers });
    }
}
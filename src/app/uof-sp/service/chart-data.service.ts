import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChartDataService {

    // baseApiUrl: string = "http://127.0.0.1:8394";
    baseApiUrl: string = "http://10.0.99.68:8000";

    constructor(private http: HttpClient) { }

    // getPeopleListForWeek(data: any): Observable<uofPerson> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     });

    //     return this.http.post<uofPerson>(`${this.baseApiUrl}/api/UofPeople/GetPeopleListForWeek`, data, { headers });
    // }

    getWeeklyHeadcountList(data: any): Observable<uofPerson> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<uofPerson>(`${this.baseApiUrl}/api/UofPeople/GetWeeklyHeadcountList`, data, { headers });
    }

    getHourlyStat(): Observable<uofPerson> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<uofPerson>(`${this.baseApiUrl}/api/UofPeople/GetHourlyStat`, { headers });
    }
}

interface uofPerson {
    time: string;
    people: string;
}

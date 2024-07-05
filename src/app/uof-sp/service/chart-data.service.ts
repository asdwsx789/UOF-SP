import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChartDataService {

    baseApiUrl: string = "http://10.0.99.68:8000";

    constructor(private http: HttpClient) { }

    // getAllEmployes(): Observable<testAPI> {
    //     return this.http.get<testAPI>(this.baseApiUrl + 'WeatherForecast/GetString');
    // }

    getPeopleListForWeek(data: any): Observable<uofPerson> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<uofPerson>(`${this.baseApiUrl}/api/UofPeople/GetPeopleListForWeek`, data, { headers });
    }
}

interface testAPI {
    _year: string;
    _weekDays: string;
}

interface uofPerson {
    time: string;
    people: string;
}

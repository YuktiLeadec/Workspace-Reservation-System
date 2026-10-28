import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../models/dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly apiUrl = 'http://localhost:8080/api/dashboard';

    constructor(private http: HttpClient) { }

    getDashboard(date: string): Observable<DashboardData> {
        return this.http.get<DashboardData>(
            `${this.apiUrl}?date=${date}`
        );
    }
}
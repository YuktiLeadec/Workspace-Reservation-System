import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    TeamPlannerResponse
} from '../models/team-planner.model';

@Injectable({
    providedIn: 'root'
})
export class TeamPlannerService {

    private readonly apiUrl =
        'http://localhost:8080/api/team-planner';

    constructor(
        private http: HttpClient
    ) { }

    getWeek(
        startDate: string
    ): Observable<TeamPlannerResponse> {

        return this.http.get<TeamPlannerResponse>(
            this.apiUrl,
            {
                params: {
                    startDate
                }
            }
        );
    }
}
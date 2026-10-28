import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Desk } from '../models/desk.model';
import { DeskBooking } from '../models/desk-booking.model';

@Injectable({
  providedIn: 'root'
})
export class DeskService {

  private deskApiUrl = 'http://localhost:8080/api/desks';
  private bookingApiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  // Get desks from PostgreSQL through Spring Boot
  getDesks(): Observable<Desk[]> {
    return this.http.get<Desk[]>(this.deskApiUrl);
  }

  createBooking(booking: {
    deskId: number;
    employeeId: number;
    bookingDate: string;
  }): Observable<DeskBooking> {
    return this.http.post<DeskBooking>(
      'http://localhost:8080/api/bookings',
      booking
    );
  }

  getBookingsByDate(date: string): Observable<DeskBooking[]> {
    return this.http.get<DeskBooking[]>(
      `http://localhost:8080/api/bookings?date=${date}`
    );
  }

  // Get bookings for selected date
  getBookings(date: string): Observable<DeskBooking[]> {
    return this.http.get<DeskBooking[]>(
      `${this.bookingApiUrl}?date=${date}`
    );
  }

  // Reserve a desk
  bookDesk(booking: DeskBooking): Observable<DeskBooking> {
    return this.http.post<DeskBooking>(
      this.bookingApiUrl,
      booking
    );
  }


  cancelBooking(deskId: number) {
    return this.http.delete(
      `${this.bookingApiUrl}/${deskId}`
    );
  }
}

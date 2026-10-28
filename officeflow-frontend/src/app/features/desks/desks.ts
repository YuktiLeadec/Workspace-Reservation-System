import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Desk } from '../../core/models/desk.model';
import { DeskService } from '../../core/services/desk.service';
import { DeskBooking } from '../../core/models/desk-booking.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-desks',

  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    CardModule,
    TagModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    TranslatePipe,
  ],

  providers: [
    MessageService
  ],

  templateUrl: './desks.html',
  styleUrl: './desks.scss'
})
export class Desks {

  desks: Desk[] = [];
  bookedDeskIds: number[] = [];
  bookings: DeskBooking[] = [];

  selectedDate: Date = new Date();

  selectedFloor = 1;

  selectedDesk: Desk | null = null;

  showDeskDialog = false;

  floors = [
    {
      label: 'Floor 1',
      value: 1
    },
    {
      label: 'Floor 2',
      value: 2
    }
  ];

  constructor(
    private deskService: DeskService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadDesks();
    this.loadBookings();
  }


  get filteredDesks(): Desk[] {
    return this.desks.filter(
      desk => desk.floor === this.selectedFloor
    );
  }

  loadBookings(): void {
    const date = this.formatDate(this.selectedDate);

    this.deskService.getBookingsByDate(date).subscribe({
      next: (bookings: DeskBooking[]) => {

        this.bookings = bookings;
        this.bookedDeskIds = bookings.map(booking => booking.deskId);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading bookings:', error);

        this.bookedDeskIds = [];
        this.cdr.detectChanges();
      }
    });
  }




  onDateChange(): void {
    this.bookedDeskIds = [];
    this.loadBookings();
  }


  isAvailable(deskId: number): boolean {
    return !this.bookedDeskIds.includes(deskId);
  }

  openDesk(desk: Desk): void {
    this.selectedDesk = desk;
    this.showDeskDialog = true;
  }

  reserveDesk(): void {
    if (!this.selectedDesk) {
      return;
    }

    const desk = this.selectedDesk;

    const booking = {
      deskId: desk.id,
      employeeId: Number(
        localStorage.getItem('employeeId')
      ),
      bookingDate: this.formatDate(this.selectedDate)
    };

    this.deskService.createBooking(booking).subscribe({
      next: (createdBooking) => {

        console.log('Booking created:', createdBooking);
        this.loadBookings();
        this.messageService.add({
          severity: 'success',
          summary: 'Desk Reserved',
          detail: `${desk.code} reserved successfully`
        });

        this.showDeskDialog = false;
        this.selectedDesk = null;
      },

      error: (error) => {
        console.error('Booking failed:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Booking Failed',
          detail: 'Could not reserve this desk'
        });
      }
    });
  }

  getBookingForDesk(deskId: number) {

    const booking = this.bookings.find(
      booking => booking.deskId === deskId
    );

    console.log(
      'Desk:',
      deskId,
      'Booking:',
      booking
    );

    return booking;
  }



  cancelReservation(): void {
    if (!this.selectedDesk) {
      return;
    }

    const desk = this.selectedDesk;

    this.deskService.cancelBooking(this.selectedDesk.id).subscribe({
      next: () => {

        this.loadBookings();

        this.messageService.add({
          severity: 'success',
          summary: 'Reservation Cancelled',
          detail: `${desk.code} reservation cancelled successfully`
        });

        this.showDeskDialog = false;

      },

      error: (error) => {

        console.error('Cancellation failed:', error);

      }
    });
  }



  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  loadDesks(): void {
    this.deskService.getDesks().subscribe({
      next: (data: Desk[]) => {
        this.desks = data;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading desks:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load desks'
        });
      }
    });
  }
}
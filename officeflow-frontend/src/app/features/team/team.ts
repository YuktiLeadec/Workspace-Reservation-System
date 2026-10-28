import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamPlannerService } from '../../core/services/team-planner.service';
import {
  TeamPlannerBooking
} from '../../core/models/team-planner.model';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
interface TeamDay {
  date: string;
  day: string;
  shortDate: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
}

@Component({
  selector: 'app-team',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe
  ],

  templateUrl: './team.html',
  styleUrl: './team.scss'
})

export class Team implements OnInit {

  weekDays: TeamDay[] = [];
  apiBookings: TeamPlannerBooking[] = [];

  totalDesks = 0;

  loading = false;

  private get locale(): string {
    return localStorage.getItem('language') === 'de'
      ? 'de-DE'
      : 'en-US';
  }

  teamMembers: TeamMember[] = [
    {
      id: 8,
      name: 'Yukti Adya',
      role: 'Developer',
      initials: 'YA'
    },
    {
      id: 2,
      name: 'Frank Schwabe',
      role: 'Developer',
      initials: 'FS'
    },
    {
      id: 3,
      name: 'Robin Anger',
      role: 'Developer',
      initials: 'RA'
    },
    {
      id: 4,
      name: 'Erik Menzel',
      role: 'Developer',
      initials: 'EM'
    },
    {
      id: 5,
      name: 'Moritz Günther',
      role: 'Developer',
      initials: 'MG'
    },
    {
      id: 6,
      name: 'Albrecht Falk',
      role: 'Manager',
      initials: 'AF'
    }
  ]

  constructor(
    private teamPlannerService: TeamPlannerService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) { }

  /*
  ngOnInit(): void {

    this.createWeek(
      new Date(2026, 8, 28)
    );
    this.loadTeamPlanner();


    this.translate.onLangChange.subscribe(() => {
      this.createWeek(new Date(2026, 8, 28));
      this.cdr.detectChanges();
    });
  }
    */

  ngOnInit(): void {
    this.createWeek(new Date(2026, 9, 26));
    this.loadTeamPlanner();

    this.translate.onLangChange.subscribe(() => {

      this.createWeek(new Date(2026, 9, 26));

      this.cdr.detectChanges();
    });
  }


  createWeek(start: Date): void {

    this.weekDays = [];

    const locale = this.locale;

    console.log(localStorage.getItem('language'));

    for (let i = 0; i < 5; i++) {

      const date = new Date(start);

      date.setDate(start.getDate() + i);

      this.weekDays.push({

        date: this.toLocalDate(date),

        day: date.toLocaleDateString(locale, {
          weekday: 'short'
        }),

        shortDate: date.toLocaleDateString(locale, {
          day: '2-digit',
          month: 'short'
        })
      });
    }
  }

  toLocalDate(date: Date): string {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }

  loadTeamPlanner(): void {

    if (this.weekDays.length === 0) {
      return;
    }

    this.loading = true;

    const startDate =
      this.weekDays[0].date;

    this.teamPlannerService
      .getWeek(startDate)
      .subscribe({

        next: (data) => {

          console.log('FULL RESPONSE:', data);
          console.log('BOOKINGS PROPERTY:', data.bookings);

          this.apiBookings =
            data.bookings ?? [];

          console.log('ALL BOOKINGS:', this.apiBookings);
          this.apiBookings.forEach(booking =>

            console.log(

              'EmployeeId:', booking.employeeId,

              'DeskId:', booking.deskId,

              'Date:', booking.bookingDate
            )
          );


          this.totalDesks =
            Number(data.totalDesks ?? 0);

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Team Planner API Error:',
            error
          );
          this.apiBookings = [];
          this.loading = false;
        }
      });
  }

  getBooking(
    member: TeamMember,
    date: string
  ): TeamPlannerBooking | undefined {

    console.log('apiBookings:', this.apiBookings);

    console.log('----------------------------------');
    console.log('Searching booking for:');
    console.log('Member ID:', member.id);
    console.log('Date:', date);

    const result = this.apiBookings.find((booking) => {

      console.log('Checking booking:');
      console.log('booking.employeeId =', booking.employeeId);
      console.log('member.id =', member.id);

      console.log('booking.bookingDate =', booking.bookingDate);
      console.log('date =', date);

      console.log(
        'Employee Match:',
        Number(booking.employeeId) === Number(member.id)
      );

      console.log(
        'Date Match:',
        booking.bookingDate === date
      );

      if (booking.bookingDate) {
        console.log(
          'Formatted booking date:',
          booking.bookingDate.toString().substring(0, 10)
        );
      }

      return (
        Number(booking.employeeId) === Number(member.id) &&
        booking.bookingDate === date
      );
    });

    console.log('Result:', result);
    console.log('----------------------------------');

    return result;
  }

  isOffice(
    member: TeamMember,
    date: string
  ): boolean {

    return !!this.getBooking(
      member,
      date
    );

  }

  peopleInOffice(date: string): number {

    const people = this.teamMembers.filter(
      member => this.isOffice(member, date)
    );



    return people.length;
  }

  availableDesks(date: string): number {
    return this.totalDesks;
  }

  get peakAttendance(): number {

    if (
      this.weekDays.length === 0
    ) {

      return 0;

    }


    return Math.max(

      ...this.weekDays.map(

        day =>
          this.peopleInOffice(
            day.date
          )

      ),

      0

    );
  }

  get bestCollaborationDay(): string {
    if (this.weekDays.length === 0) {
      return '-';
    }

    const maxAttendance = Math.max(
      ...this.weekDays.map(day =>
        this.peopleInOffice(day.date)
      )
    );

    const bestDays = this.weekDays
      .filter(day =>
        this.peopleInOffice(day.date) === maxAttendance
      )
      .map(day => day.day);

    return bestDays.join(', ');
  }

}

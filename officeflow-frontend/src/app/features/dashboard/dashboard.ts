import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

import { DashboardService }
  from '../../core/services/dashboard.service';

import { DashboardData }
  from '../../core/models/dashboard.model';
import { Employee } from '../../core/models/employee.model';
import { EmployeeService } from '../../core/services/employee.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DatePickerModule,
    ProgressBarModule,
    SkeletonModule,
    TagModule,
    ButtonModule,
    MessageModule,
    TooltipModule,
    TranslatePipe
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  dashboard: DashboardData | null = null;

  selectedDate: Date = new Date();

  loading = true;

  errorMessage = '';

  employees: Employee[] = [];

  selectedEmployee!: Employee;

  constructor(
    private dashboardService: DashboardService,
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    console.log('Dashboard initialized');

    this.loadEmployees();

    this.loadDashboard();
  }

  loadEmployees(): void {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (data) => {

          this.employees = data;

          if (data.length > 0) {
            this.selectedEmployee = data[0];
          }

        },

        error: (error) => {
          console.error('Failed to load employees', error);
        }
      });
  }

  loadDashboard(): void {

    if (!this.selectedDate) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const date = this.formatDate(this.selectedDate);

    console.log('Loading dashboard:', date);

    this.dashboardService
      .getDashboard(date)
      .subscribe({

        next: (data: DashboardData) => {
          this.dashboard = data;
          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Dashboard loading failed:',
            error
          );

          this.dashboard = null;

          this.loading = false;

          this.errorMessage =
            'Dashboard data could not be loaded.';

          this.cdr.detectChanges();
        }

      });
  }

  onDateChange(date: Date): void {

    if (!date) {
      return;
    }

    this.selectedDate = date;

    console.log(
      'Dashboard date changed:',
      this.selectedDate
    );

    this.loadDashboard();
  }

  refreshDashboard(): void {
    this.loadDashboard();
  }

  goToDeskBooking(): void {
    this.router.navigate(['/desks']);
  }


  goToTeamPlanner(): void {
    this.router.navigate(['/team-planner']);
  }


  goToMyBookings(): void {
    this.router.navigate(['/my-bookings']);
  }

  getOccupancySeverity():
    'success' | 'warn' | 'danger' | 'info' {

    if (!this.dashboard) {
      return 'info';
    }

    if (this.dashboard.occupancy >= 80) {
      return 'danger';
    }

    if (this.dashboard.occupancy >= 50) {
      return 'warn';
    }

    return 'success';
  }

  getOccupancyText(): string {

    if (!this.dashboard) {
      return '';
    }

    const occupancy = this.dashboard.occupancy;

    if (occupancy >= 90) {
      return 'Office almost full';
    }

    if (occupancy >= 70) {
      return 'High utilization';
    }

    if (occupancy >= 40) {
      return 'Moderate utilization';
    }

    return 'Low utilization';
  }

  getAvailabilitySeverity():
    'success' | 'warn' | 'danger' {

    if (!this.dashboard) {
      return 'success';
    }

    if (this.dashboard.availableDesks === 0) {
      return 'danger';
    }

    if (this.dashboard.availableDesks <= 2) {
      return 'warn';
    }

    return 'success';
  }

  private formatDate(date: Date): string {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      date.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}

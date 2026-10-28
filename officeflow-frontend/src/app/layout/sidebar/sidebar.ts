import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi-pi-home',
        command: () => this.router.navigate(['/dashboard'])
      },
      {
        label: 'Team Planner',
        icon: 'pi-pi-users',
        command: () => this.router.navigate(['/team'])
      },
      {
        label: 'Desk Booking ',
        icon: 'pi-pi-building',
        command: () => this.router.navigate(['/desks'])
      }
    ];
  }
}

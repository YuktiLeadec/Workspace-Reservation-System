import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Team } from './features/team/team';
import { Desks } from './features/desks/desks';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'team',
        component: Team
    },
    {
        path: 'desks',
        component: Desks
    }
];

import { Desk } from "../models/desk.model";
export const DESKS: Desk[] = [
    {
        id: 1,
        code: 'A01',
        floor: 1,
        zone: 'Frontend',
        features: ['dual-monitor', 'window']
    },
    {
        id: 2,
        code: 'A02',
        floor: 1,
        zone: 'Frontend',
        features: ['standing-desk']
    },
    {
        id: 3,
        code: 'A03',
        floor: 1,
        zone: 'Frontend',
        features: ['dual-monitor']
    },
    {
        id: 4,
        code: 'B01',
        floor: 1,
        zone: 'Backend',
        features: ['window']
    },

    {
        id: 5,
        code: 'A01',
        floor: 2,
        zone: 'Backend',
        features: ['window']
    }
];
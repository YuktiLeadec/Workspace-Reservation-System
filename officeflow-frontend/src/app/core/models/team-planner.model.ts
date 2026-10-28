export interface TeamPlannerBooking {
    id: number;
    employeeId: number;
    deskId: number;
    bookingDate: string;
}

export interface TeamPlannerResponse {
    weekStart: string;
    weekEnd: string;
    totalDesks: number;
    bookings: TeamPlannerBooking[];
}
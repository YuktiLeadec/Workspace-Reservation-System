package com.officeflow.backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
name = "bookings",
uniqueConstraints = {
@UniqueConstraint(columnNames = {"desk_id", "booking_date"})
}
)
public class DeskBooking {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(name = "desk_id", nullable = false)
private Long deskId;

@Column(name = "employee_id", nullable = false)
private Long employeeId;

@Column(name = "booking_date", nullable = false)
private LocalDate bookingDate;

public DeskBooking() {
}

public Long getId() {
return id;
}

public void setId(Long id) {
this.id = id;
}

public Long getDeskId() {
return deskId;
}

public void setDeskId(Long deskId) {
this.deskId = deskId;
}

public Long getEmployeeId() {
return employeeId;
}

public void setEmployeeId(Long employeeId) {
this.employeeId = employeeId;
}

public LocalDate getBookingDate() {
return bookingDate;
}

public void setBookingDate(LocalDate bookingDate) {
this.bookingDate = bookingDate;
}
}
package com.officeflow.backend. Service;
import com.officeflow.backend.DTO.DeskBookingResponse;
import com.officeflow.backend.Entity.Employee;
import com.officeflow.backend.Repository.EmployeeRepository;

import com.officeflow.backend.Entity. DeskBooking;
import com.officeflow.backend. Repository. DeskBookingRepository;
import org.springframework. stereotype. Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class DeskBookingService {

private final DeskBookingRepository bookingRepository;
private final EmployeeRepository employeeRepository;

public DeskBookingService(DeskBookingRepository bookingRepository, EmployeeRepository employeeRepository ) {
this.bookingRepository = bookingRepository;
this.employeeRepository = employeeRepository;
}

public DeskBooking createBooking(DeskBooking booking) {

boolean alreadyBooked =
bookingRepository.existsByDeskIdAndBookingDate(
booking.getDeskId(),
booking.getBookingDate()
);

if (alreadyBooked) {
throw new RuntimeException("Desk is already reserved for this date");
}

return bookingRepository.save(booking);
}

public List<DeskBookingResponse> getBookingsByDate(
        LocalDate date) {

    List<DeskBooking> bookings =
            bookingRepository.findByBookingDate(date);

    return bookings.stream()
            .map(booking -> {

                Employee employee =
                        employeeRepository
                                .findById(
                                        booking.getEmployeeId()
                                )
                                .orElse(null);

                DeskBookingResponse response =
                        new DeskBookingResponse();

                response.setDeskId(
                        booking.getDeskId()
                );

                response.setEmployeeId(
                        booking.getEmployeeId()
                );

                response.setBookingDate(
                        booking.getBookingDate()
                );

                response.setEmployeeName(
                        employee != null
                                ? employee.getName()
                                : "Unknown User"
                );

                return response;

            })
            .toList();
}

@Transactional
public void cancelBooking(Long deskId) {
    bookingRepository.deleteByDeskId(deskId);
}
}

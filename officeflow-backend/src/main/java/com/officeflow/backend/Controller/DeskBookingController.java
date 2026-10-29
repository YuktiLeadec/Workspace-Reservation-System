package com.officeflow.backend. Controller;
import com.officeflow.backend.DTO.DeskBookingResponse;
import com.officeflow.backend.Entity. DeskBooking;
import com.officeflow.backend. Service.DeskBookingService;

import org.springframework.web.bind. annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class DeskBookingController {

private final DeskBookingService bookingService;

public DeskBookingController(DeskBookingService bookingService) {
this.bookingService = bookingService;
}

// Create a new desk reservation
@PostMapping
public DeskBooking createBooking(
@RequestBody DeskBooking booking) {

return bookingService.createBooking(booking);
}

@GetMapping
public List<DeskBookingResponse> getBookingsByDate(
        @RequestParam LocalDate date) {

    return bookingService.getBookingsByDate(date);
}

// Cancel a reservation
@DeleteMapping("/{deskId}")
public void cancelBooking(@PathVariable Long deskId) {
    bookingService.cancelBooking(deskId);
}
}


package com.officeflow.backend.Controller;

import com.officeflow.backend.Repository. DeskBookingRepository;
import com.officeflow.backend.Repository. DeskRepository;
import org.springframework.web.bind. annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

private final DeskBookingRepository bookingRepository;
private final DeskRepository deskRepository;

public DashboardController(
DeskBookingRepository bookingRepository,
DeskRepository deskRepository) {

this.bookingRepository = bookingRepository;
this.deskRepository = deskRepository;
}

@GetMapping
public Map<String, Object> getDashboard(@RequestParam String date) {

LocalDate selectedDate = LocalDate.parse(date);

long totalDesks = deskRepository.count();

long bookedDesks =
bookingRepository. countByBookingDate(selectedDate);

long availableDesks = totalDesks - bookedDesks;

long peopleInOffice = bookingRepository.countDistinctEmployeesByBookingDate(selectedDate);

double occupancy = totalDesks == 0 ? 0 : ((double) bookedDesks / totalDesks) * 100;

Map<String, Object> dashboard = new HashMap<>();

dashboard.put("totalDesks", totalDesks);
dashboard.put("bookedDesks", bookedDesks);
dashboard.put("availableDesks", availableDesks);

System.out.println("People in Office = " + peopleInOffice);

dashboard.put("peopleInOffice", peopleInOffice);

dashboard.put("occupancy", Math.round(occupancy));

return dashboard;
}
}
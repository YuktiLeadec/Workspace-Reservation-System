package com.officeflow.backend.Controller;

import com.officeflow.backend.Entity.DeskBooking;
import com.officeflow.backend.Repository.DeskBookingRepository;
import com.officeflow.backend.Repository.DeskRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/team-planner")
@CrossOrigin(origins = "http://localhost:4200")
public class TeamPlannerController {

private final DeskBookingRepository bookingRepository;
private final DeskRepository deskRepository;

public TeamPlannerController(
DeskBookingRepository bookingRepository,
DeskRepository deskRepository) {

this.bookingRepository = bookingRepository;
this.deskRepository = deskRepository;
}

@GetMapping
public Map<String, Object> getTeamPlanner(
@RequestParam String startDate) {

LocalDate start = LocalDate.parse(startDate);

LocalDate end = start.plusDays(4);

List<DeskBooking> bookings =
bookingRepository
.findByBookingDateBetween(start, end);

Map<String, Object> response = new HashMap<>();

response.put("weekStart", start);
response.put("weekEnd", end);
response.put("totalDesks", deskRepository.count());
response.put("bookings", bookings);

return response;
}
}
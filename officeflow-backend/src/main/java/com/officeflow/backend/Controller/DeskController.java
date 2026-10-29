package com.officeflow.backend.Controller;

import com.officeflow.backend.Entity.Desk;
import com.officeflow.backend.Service.DeskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/desks")
@CrossOrigin(origins = "http://localhost:4200")
public class DeskController {

    private final DeskService service;

    public DeskController(DeskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Desk> getAllDesks() {
        return service.getAllDesks();
    }

    @GetMapping("/floor/{floor}")
    public List<Desk> getByFloor(
            @PathVariable Integer floor) {
        return service.getByFloor(floor);
    }
}
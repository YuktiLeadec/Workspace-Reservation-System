package com.officeflow.backend.Service;

import com.officeflow.backend.Entity.Desk;
import com.officeflow.backend.Repository.DeskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeskService {

    private final DeskRepository repository;

    public DeskService(DeskRepository repository) {
        this.repository = repository;
    }

    public List<Desk> getAllDesks() {
        return repository.findAll();
    }

    public List<Desk> getByFloor(Integer floor) {
        return repository.findByFloor(floor);
    }
}
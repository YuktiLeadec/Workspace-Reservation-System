package com.officeflow.backend. Repository;

import com.officeflow.backend.Entity.Desk;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeskRepository
        extends JpaRepository<Desk, Long> {

    List<Desk> findByFloor(Integer floor);
}
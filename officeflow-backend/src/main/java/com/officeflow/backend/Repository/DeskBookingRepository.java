package com.officeflow.backend. Repository;

import com.officeflow.backend.Entity. DeskBooking;
import org.springframework.data.jpa. repository. JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface DeskBookingRepository
extends JpaRepository<DeskBooking, Long> {

boolean existsByDeskIdAndBookingDate(
Long deskId,
LocalDate bookingDate
);

List<DeskBooking> findByBookingDate(
LocalDate bookingDate
);

long countByBookingDate(LocalDate bookingDate);

@Query("SELECT COUNT(DISTINCT b.employeeId) " + "FROM DeskBooking b " + 
"WHERE b.bookingDate = :bookingDate")
long countDistinctEmployeesByBookingDate(
@Param("bookingDate") LocalDate bookingDate
);


List<DeskBooking> findByBookingDateBetween(
    LocalDate startDate,
    LocalDate endDate
);

@Transactional
@Modifying

void deleteByDeskId(Long deskId);
}

package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Appointment;
import com.pathak.clinic.entity.Appointment.PaymentStatus;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByAppointmentDateBetween(LocalDate startDate, LocalDate endDate);
    List<Appointment> findByAppointmentDateBetweenAndPaymentStatus(LocalDate startDate, LocalDate endDate, PaymentStatus status);
    long countByAppointmentDateBetween(LocalDate startDate, LocalDate endDate);
}

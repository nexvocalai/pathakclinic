package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Payment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    List<Payment> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end);
}

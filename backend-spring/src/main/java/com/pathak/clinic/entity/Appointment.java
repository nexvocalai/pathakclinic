package com.pathak.clinic.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments", indexes = {
        @Index(name = "idx_appointments_date", columnList = "appointment_date"),
        @Index(name = "idx_appointments_status", columnList = "status")
})
public class Appointment {
    public enum AppointmentStatus { SCHEDULED, COMPLETED, CANCELLED, NO_SHOW }
    public enum PaymentStatus { PENDING, PAID, REFUNDED }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(optional = false)
    private Patient patient;
    @ManyToOne(optional = false)
    private Doctor doctor;
    @Column(nullable = false)
    private LocalDate appointmentDate;
    private String timeSlot;
    private String reason;
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    private BigDecimal amount = BigDecimal.ZERO;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    @Column(columnDefinition = "TEXT")
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate
    void preUpdate() { updatedAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }
    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

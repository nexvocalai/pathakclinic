package com.pathak.clinic.dto;

import com.pathak.clinic.entity.Appointment;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record AppointmentDto(
        UUID id,
        String patientName,
        String patientEmail,
        String patientPhone,
        LocalDate appointmentDate,
        String timeSlot,
        String reason,
        Appointment.AppointmentStatus status,
        BigDecimal amount,
        Appointment.PaymentStatus paymentStatus,
        String notes
) {
    public static AppointmentDto from(Appointment appointment) {
        var patient = appointment.getPatient();
        return new AppointmentDto(
                appointment.getId(),
                patient.getName(),
                patient.getEmail(),
                patient.getPhone(),
                appointment.getAppointmentDate(),
                appointment.getTimeSlot(),
                appointment.getReason(),
                appointment.getStatus(),
                appointment.getAmount(),
                appointment.getPaymentStatus(),
                appointment.getNotes()
        );
    }
}

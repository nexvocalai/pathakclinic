package com.pathak.clinic.dto;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateAppointmentRequest(
        @NotBlank String name,
        String email,
        @NotBlank String phone,
        Integer age,
        String gender,
        String address,
        LocalDate preferredDate,
        String preferredTime,
        String condition,
        String message,
        String bookingMethod,
        BigDecimal amount
) {
}

package com.pathak.clinic.dto;

import com.pathak.clinic.entity.Patient;
import java.math.BigDecimal;
import java.util.UUID;

public record PatientDto(
        UUID id,
        String name,
        String email,
        String phone,
        Integer age,
        Patient.Gender gender,
        String address,
        String medicalHistory,
        Integer totalAppointments,
        BigDecimal totalSpent
) {
    public static PatientDto from(Patient patient) {
        return new PatientDto(
                patient.getId(),
                patient.getName(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getAge(),
                patient.getGender(),
                patient.getAddress(),
                patient.getMedicalHistory(),
                patient.getTotalAppointments(),
                patient.getTotalSpent()
        );
    }
}

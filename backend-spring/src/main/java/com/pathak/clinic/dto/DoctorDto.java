package com.pathak.clinic.dto;

import java.util.UUID;

public record DoctorDto(UUID id, String name, String email, String registrationNumber, String token) {
}

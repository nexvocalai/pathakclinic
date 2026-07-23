package com.pathak.clinic.dto;

public record LoginResponse(String token, DoctorDto doctor) {
}

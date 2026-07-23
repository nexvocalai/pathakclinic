package com.pathak.clinic.controller;

import com.pathak.clinic.entity.Doctor;
import com.pathak.clinic.repository.DoctorRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PublicInfoController {
    private final DoctorRepository doctorRepository;

    public PublicInfoController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/doctor")
    public Map<String, Object> doctor() {
        Doctor doctor = doctorRepository.findAll().stream().findFirst().orElseThrow(() -> new EntityNotFoundException("Doctor profile not configured"));
        return Map.of(
                "id", doctor.getId(),
                "name", doctor.getName(),
                "email", doctor.getEmail(),
                "registrationNumber", doctor.getRegistrationNumber(),
                "qualification", doctor.getQualification(),
                "experienceYears", doctor.getExperienceYears(),
                "about", doctor.getAbout()
        );
    }

    @GetMapping("/doctor/achievements")
    public List<Map<String, Object>> achievements() {
        return List.of(
                Map.of("title", "Clinical Excellence", "achievementType", "recognition", "year", 2024),
                Map.of("title", "BHMS Certification", "achievementType", "certification", "year", 2010)
        );
    }

    @GetMapping("/clinic")
    public Map<String, Object> clinic() {
        return Map.of(
                "clinicName", "Pathak Homoeopathic Clinic",
                "address", "Configure clinic address",
                "phoneNumber", "+91-XXXXXXXXXX",
                "whatsappNumber", "+91-XXXXXXXXXX",
                "email", "doctor@pathak.com",
                "description", "Professional homoeopathic consultation and treatment"
        );
    }

    @GetMapping("/clinic/hours")
    public List<Map<String, Object>> hours() {
        return List.of(
                Map.of("dayOfWeek", "monday-saturday", "openingTime", LocalTime.of(10, 0), "closingTime", LocalTime.of(18, 0), "closed", false),
                Map.of("dayOfWeek", "sunday", "openingTime", LocalTime.of(10, 0), "closingTime", LocalTime.of(14, 0), "closed", false)
        );
    }

    @GetMapping("/clinic/statistics")
    public Map<String, Object> statistics() {
        return Map.of("patientsTreated", 1000, "treatmentSuccessRate", 85, "yearsOfPractice", 15, "conditionsTreated", 50);
    }
}

package com.pathak.clinic.controller;

import com.pathak.clinic.dto.PatientDto;
import com.pathak.clinic.dto.PatientUpdateRequest;
import com.pathak.clinic.service.PatientService;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public Page<PatientDto> all(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return patientService.getAll(PageRequest.of(page, size, Sort.by("name")));
    }

    @GetMapping("/{id}")
    public PatientDto get(@PathVariable UUID id) {
        return patientService.get(id);
    }

    @PutMapping("/{id}")
    public PatientDto update(@PathVariable UUID id, @RequestBody PatientUpdateRequest request) {
        return patientService.update(id, request.medicalHistory(), request.address());
    }
}

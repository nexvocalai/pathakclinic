package com.pathak.clinic.service;

import com.pathak.clinic.dto.PatientDto;
import com.pathak.clinic.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Page<PatientDto> getAll(Pageable pageable) {
        return patientRepository.findAll(pageable).map(PatientDto::from);
    }

    public PatientDto get(UUID id) {
        return PatientDto.from(patientRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Patient not found")));
    }

    @Transactional
    public PatientDto update(UUID id, String medicalHistory, String address) {
        var patient = patientRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        patient.setMedicalHistory(medicalHistory);
        patient.setAddress(address);
        return PatientDto.from(patientRepository.save(patient));
    }
}

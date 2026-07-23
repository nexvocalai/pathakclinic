package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Patient;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, UUID> {
}

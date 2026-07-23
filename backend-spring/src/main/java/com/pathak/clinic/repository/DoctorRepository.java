package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Doctor;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    Optional<Doctor> findByEmail(String email);
}

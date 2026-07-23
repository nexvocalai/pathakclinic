package com.pathak.clinic.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "patients")
public class Patient {
    public enum Gender { MALE, FEMALE, OTHER }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    private String email;
    @Column(nullable = false)
    private String phone;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.OTHER;
    @Column(columnDefinition = "TEXT")
    private String address;
    @Column(columnDefinition = "TEXT")
    private String medicalHistory;
    private Integer totalAppointments = 0;
    private BigDecimal totalSpent = BigDecimal.ZERO;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate
    void preUpdate() { updatedAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }
    public Integer getTotalAppointments() { return totalAppointments; }
    public void setTotalAppointments(Integer totalAppointments) { this.totalAppointments = totalAppointments; }
    public BigDecimal getTotalSpent() { return totalSpent; }
    public void setTotalSpent(BigDecimal totalSpent) { this.totalSpent = totalSpent; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

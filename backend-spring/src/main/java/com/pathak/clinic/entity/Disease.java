package com.pathak.clinic.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "diseases", indexes = @Index(name = "idx_diseases_category", columnList = "category"))
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String name;
    private String slug;
    private String category;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    @Column(name = "image_url")
    private String image;
    @Column(columnDefinition = "TEXT")
    private String homoeopathicApproach;
    private String duration;
    @Column(columnDefinition = "TEXT")
    private String detailedInfo;
    private String successRate;
    private Boolean active = true;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "disease_symptoms", joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "symptom")
    private List<String> symptoms = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "disease_causes", joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "cause")
    private List<String> causes = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "disease_remedies", joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "remedy")
    private List<String> remedies = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "disease_precautions", joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "precaution")
    private List<String> precautions = new ArrayList<>();
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
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getHomoeopathicApproach() { return homoeopathicApproach; }
    public void setHomoeopathicApproach(String homoeopathicApproach) { this.homoeopathicApproach = homoeopathicApproach; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getDetailedInfo() { return detailedInfo; }
    public void setDetailedInfo(String detailedInfo) { this.detailedInfo = detailedInfo; }
    public String getSuccessRate() { return successRate; }
    public void setSuccessRate(String successRate) { this.successRate = successRate; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public List<String> getSymptoms() { return symptoms; }
    public void setSymptoms(List<String> symptoms) { this.symptoms = symptoms; }
    public List<String> getCauses() { return causes; }
    public void setCauses(List<String> causes) { this.causes = causes; }
    public List<String> getRemedies() { return remedies; }
    public void setRemedies(List<String> remedies) { this.remedies = remedies; }
    public List<String> getPrecautions() { return precautions; }
    public void setPrecautions(List<String> precautions) { this.precautions = precautions; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

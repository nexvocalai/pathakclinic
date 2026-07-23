package com.pathak.clinic.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "testimonials")
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String conditionTreated;
    @Column(columnDefinition = "TEXT")
    private String testimonialText;
    private Integer rating;
    private String imageUrl;
    private Boolean approved = false;
    private Boolean published = true;
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
    public String getConditionTreated() { return conditionTreated; }
    public void setConditionTreated(String conditionTreated) { this.conditionTreated = conditionTreated; }
    public String getTestimonialText() { return testimonialText; }
    public void setTestimonialText(String testimonialText) { this.testimonialText = testimonialText; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Boolean getApproved() { return approved; }
    public void setApproved(Boolean approved) { this.approved = approved; }
    public Boolean getPublished() { return published; }
    public void setPublished(Boolean published) { this.published = published; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
